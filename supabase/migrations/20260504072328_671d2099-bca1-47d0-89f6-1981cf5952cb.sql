-- RPC returning per-deal subscription totals (sum of active bid amounts)
-- Uses SECURITY DEFINER so distributors can see aggregated totals without exposing other distributors' individual bids.
CREATE OR REPLACE FUNCTION public.get_deal_subscription_totals()
RETURNS TABLE(deal_id uuid, total_subscription numeric)
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path TO 'public'
AS $function$
  SELECT deal_id, COALESCE(SUM(bid_amount), 0)::numeric AS total_subscription
  FROM public.deal_bids
  WHERE bid_status <> 'withdrawn'
  GROUP BY deal_id;
$function$;

GRANT EXECUTE ON FUNCTION public.get_deal_subscription_totals() TO authenticated;