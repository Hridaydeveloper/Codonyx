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
          notifications.type = 'new_registration'
          AND actor.approval_status = 'pending'::public.approval_status
          AND notifications.profile_id IN (SELECT profile_id FROM public.get_admin_profile_ids())
        )
        OR (
          notifications.type = 'connection_request'
          AND notifications.related_profile_id = actor.id
          AND EXISTS (
            SELECT 1
            FROM public.connections c
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
            SELECT 1
            FROM public.connections c
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

DROP POLICY IF EXISTS "Anyone can read keyword suggestions" ON public.keyword_suggestions;
CREATE POLICY "Anyone can read keyword suggestions"
ON public.keyword_suggestions
FOR SELECT
TO public
USING (
  field_name IN ('expertise', 'experience', 'research_areas', 'services', 'distribution_capacity', 'bio_distributor')
  OR public.is_user_approved(auth.uid())
  OR public.has_role(auth.uid(), 'admin'::public.app_role)
);

DROP POLICY IF EXISTS "Anyone authenticated can view custom fields" ON public.custom_profile_fields;
CREATE POLICY "Anyone authenticated can view custom fields"
ON public.custom_profile_fields
FOR SELECT
TO authenticated
USING (
  public.is_user_approved(auth.uid())
  OR public.has_role(auth.uid(), 'admin'::public.app_role)
);

DROP POLICY IF EXISTS "Anyone authenticated can view dashboard settings" ON public.dashboard_settings;
CREATE POLICY "Anyone authenticated can view dashboard settings"
ON public.dashboard_settings
FOR SELECT
TO authenticated
USING (
  public.is_user_approved(auth.uid())
  OR public.has_role(auth.uid(), 'admin'::public.app_role)
);

DROP POLICY IF EXISTS "Users can upload verification documents" ON storage.objects;
CREATE POLICY "Users can upload verification documents"
ON storage.objects
FOR INSERT
TO public
WITH CHECK (
  bucket_id = 'verification-documents'
  AND (storage.foldername(name))[1] = (auth.uid())::text
);

DROP POLICY IF EXISTS "Authenticated users can upload verification documents" ON storage.objects;
CREATE POLICY "Authenticated users can upload verification documents"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'verification-documents'
  AND (storage.foldername(name))[1] = (auth.uid())::text
);

DROP POLICY IF EXISTS "Authenticated users can upload publication files" ON storage.objects;
CREATE POLICY "Authenticated users can upload publication files"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'publications'
  AND (storage.foldername(name))[1] = (auth.uid())::text
);