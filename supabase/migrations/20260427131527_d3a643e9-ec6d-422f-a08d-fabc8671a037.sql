-- Dashboard configurable limits (admin-managed) for indicator progress
CREATE TABLE IF NOT EXISTS public.dashboard_settings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  setting_key TEXT NOT NULL UNIQUE,
  setting_value NUMERIC NOT NULL DEFAULT 0,
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_by UUID
);

ALTER TABLE public.dashboard_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone authenticated can view dashboard settings"
ON public.dashboard_settings FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Admins can insert dashboard settings"
ON public.dashboard_settings FOR INSERT
TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update dashboard settings"
ON public.dashboard_settings FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete dashboard settings"
ON public.dashboard_settings FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'::app_role));

CREATE TRIGGER update_dashboard_settings_updated_at
BEFORE UPDATE ON public.dashboard_settings
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Seed default rows for the 4 indicator limits (zero = falls back to target sum)
INSERT INTO public.dashboard_settings (setting_key, setting_value) VALUES
  ('limit_subscription_inr', 0),
  ('limit_subscription_usd', 0),
  ('limit_over_committed_inr', 0),
  ('limit_over_committed_usd', 0)
ON CONFLICT (setting_key) DO NOTHING;

-- Enable realtime
ALTER TABLE public.dashboard_settings REPLICA IDENTITY FULL;
ALTER PUBLICATION supabase_realtime ADD TABLE public.dashboard_settings;