import { supabase } from "@/integrations/supabase/client";

/**
 * Insert an in-app notification for every admin profile letting them know
 * a new user has just registered and is awaiting review.
 * The authenticated registration is verified server-side before notifications
 * are created for administrator profiles.
 */
export async function notifyAdminsOfNewRegistration() {
  try {
    const { error } = await supabase.rpc("notify_admins_of_registration");
    if (error) throw error;
  } catch (e) {
    console.error("Failed to notify admins of new registration:", e);
  }
}
