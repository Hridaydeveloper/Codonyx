CREATE OR REPLACE FUNCTION public.get_deal_aggregate_stats()
 RETURNS json
 LANGUAGE plpgsql
 STABLE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  result json;
BEGIN
  SELECT json_build_object(
    'unique_bidders', (
      SELECT COUNT(DISTINCT distributor_profile_id)
      FROM deal_bids
      WHERE bid_status <> 'withdrawn'
    ),
    'approved_distributors', (SELECT COUNT(*) FROM profiles WHERE user_type = 'distributor' AND approval_status = 'approved'),
    'total_subscription_inr', (
      SELECT COALESCE(SUM(db.bid_amount), 0)
      FROM deal_bids db
      LEFT JOIN deals d ON d.id = db.deal_id
      WHERE COALESCE(d.currency, 'INR') = 'INR'
        AND db.bid_status <> 'withdrawn'
    ),
    'total_subscription_usd', (
      SELECT COALESCE(SUM(db.bid_amount), 0)
      FROM deal_bids db
      LEFT JOIN deals d ON d.id = db.deal_id
      WHERE COALESCE(d.currency, 'INR') = 'USD'
        AND db.bid_status <> 'withdrawn'
    ),
    'total_target_inr', (
      SELECT COALESCE(SUM(target_amount), 0) FROM deals WHERE COALESCE(currency, 'INR') = 'INR'
    ),
    'total_target_usd', (
      SELECT COALESCE(SUM(target_amount), 0) FROM deals WHERE COALESCE(currency, 'INR') = 'USD'
    )
  ) INTO result;
  RETURN result;
END;
$function$;