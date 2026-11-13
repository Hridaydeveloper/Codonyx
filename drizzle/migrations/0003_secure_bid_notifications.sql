CREATE OR REPLACE FUNCTION public.notify_admins_of_bid(_bid_id uuid)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $function$
DECLARE
  actor_profile public.profiles%ROWTYPE;
  bid_row public.deal_bids%ROWTYPE;
  deal_title text;
  deal_currency text;
  amount_label text;
  notification_message text;
BEGIN
  SELECT *
  INTO actor_profile
  FROM public.profiles
  WHERE user_id = auth.uid()
    AND user_type = 'distributor'::public.user_type
    AND approval_status = 'approved'::public.approval_status
  LIMIT 1;

  IF NOT FOUND THEN
    RETURN;
  END IF;

  SELECT *
  INTO bid_row
  FROM public.deal_bids
  WHERE id = _bid_id
    AND distributor_profile_id = actor_profile.id
    AND bid_status <> 'withdrawn';

  IF NOT FOUND THEN
    RETURN;
  END IF;

  SELECT title, currency
  INTO deal_title, deal_currency
  FROM public.deals
  WHERE id = bid_row.deal_id;

  IF NOT FOUND THEN
    RETURN;
  END IF;

  amount_label := CASE WHEN COALESCE(deal_currency, 'INR') = 'USD' THEN '$' ELSE '₹' END
    || to_char(bid_row.bid_amount, 'FM999,999,999,999,990.00');
  notification_message := actor_profile.full_name || ' (Distributor) bid on "'
    || deal_title || '" deal. Bidding amount: ' || amount_label || '.';

  INSERT INTO public.notifications (
    profile_id, type, title, message, link, related_profile_id, is_read
  )
  SELECT admins.profile_id, 'new_bid', 'New Bid Placed', notification_message,
    '/admin', actor_profile.id, false
  FROM public.get_admin_profile_ids() AS admins;
END;
$function$;

REVOKE ALL ON FUNCTION public.notify_admins_of_bid(uuid) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.notify_admins_of_bid(uuid) FROM anon;
GRANT EXECUTE ON FUNCTION public.notify_admins_of_bid(uuid) TO authenticated;