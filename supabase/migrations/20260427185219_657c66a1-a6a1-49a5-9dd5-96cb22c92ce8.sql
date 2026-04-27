CREATE OR REPLACE FUNCTION public.get_deal_active_bid_counts()
RETURNS TABLE(deal_id uuid, active_bids bigint)
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path TO 'public'
AS $$
  SELECT deal_id, COUNT(*)::bigint AS active_bids
  FROM deal_bids
  WHERE bid_status <> 'withdrawn'
  GROUP BY deal_id;
$$;

GRANT EXECUTE ON FUNCTION public.get_deal_active_bid_counts() TO authenticated;