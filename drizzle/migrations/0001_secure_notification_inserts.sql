DROP POLICY IF EXISTS "Authenticated users can insert notifications" ON public.notifications;
CREATE POLICY "Authenticated users can insert notifications"
ON public.notifications
FOR INSERT
TO authenticated
WITH CHECK (
  EXISTS (
    SELECT 1
    FROM public.profiles actor
    WHERE actor.user_id = auth.uid()
      AND (
        (
          notifications.type = 'connection_request'
          AND notifications.related_profile_id = actor.id
          AND EXISTS (
            SELECT 1 FROM public.connections c
            WHERE c.sender_id = actor.id
              AND c.receiver_id = notifications.profile_id
              AND c.status = 'pending'::public.connection_status
              AND c.withdrawn_at IS NULL
          )
        )
        OR (
          notifications.type = 'connection_accepted'
          AND notifications.related_profile_id = actor.id
          AND EXISTS (
            SELECT 1 FROM public.connections c
            WHERE c.receiver_id = actor.id
              AND c.sender_id = notifications.profile_id
              AND c.status = 'accepted'::public.connection_status
          )
        )
        OR (
          public.has_role(auth.uid(), 'admin'::public.app_role)
          AND notifications.type IN ('new_bid', 'new_deal', 'deal_closed')
        )
      )
  )
);

CREATE OR REPLACE FUNCTION public.notify_admins_of_registration()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $function$
DECLARE
  actor_profile public.profiles%ROWTYPE;
  role_label text;
BEGIN
  SELECT *
  INTO actor_profile
  FROM public.profiles
  WHERE user_id = auth.uid()
    AND approval_status = 'pending'::public.approval_status
  LIMIT 1;

  IF NOT FOUND THEN
    RETURN;
  END IF;

  role_label := CASE actor_profile.user_type
    WHEN 'advisor'::public.user_type THEN 'Advisor'
    WHEN 'laboratory'::public.user_type THEN 'Laboratory'
    WHEN 'distributor'::public.user_type THEN 'Distribution Partner'
    ELSE 'Member'
  END;

  INSERT INTO public.notifications (
    profile_id, type, title, message, link, related_profile_id, is_read
  )
  SELECT
    admins.profile_id,
    'new_registration',
    'New ' || role_label || ' registration',
    actor_profile.full_name || ' has registered as a ' || role_label || ' and is awaiting review.',
    '/admin',
    actor_profile.id,
    false
  FROM public.get_admin_profile_ids() AS admins;
END;
$function$;

REVOKE ALL ON FUNCTION public.notify_admins_of_registration() FROM PUBLIC;
REVOKE ALL ON FUNCTION public.notify_admins_of_registration() FROM anon;
GRANT EXECUTE ON FUNCTION public.notify_admins_of_registration() TO authenticated;