import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

serve(async (_req: Request) => {
  try {
    const supabaseAdmin = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();

    const { error: pwdError, count: pwdCount } = await supabaseAdmin
      .from("password_reset_otps")
      .delete({ count: "exact" })
      .lt("expires_at", oneDayAgo);

    if (pwdError) {
      console.error("[cleanup-expired-otps] password_reset_otps delete error:", pwdError);
      return new Response(
        JSON.stringify({ error: "Failed to clean up expired password reset OTPs" }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    const { error: regError, count: regCount } = await supabaseAdmin
      .from("registration_otps")
      .delete({ count: "exact" })
      .lt("expires_at", oneDayAgo);

    if (regError) {
      console.error("[cleanup-expired-otps] registration_otps delete error:", regError);
      return new Response(
        JSON.stringify({ error: "Failed to clean up expired registration OTPs" }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    const totalDeleted = (pwdCount ?? 0) + (regCount ?? 0);
    console.log(`[cleanup-expired-otps] Deleted ${pwdCount ?? 0} password_reset + ${regCount ?? 0} registration OTP(s) older than 1 day.`);

    return new Response(
      JSON.stringify({ success: true, deleted: totalDeleted }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error: any) {
    console.error("[cleanup-expired-otps] Unexpected error:", error);
    return new Response(
      JSON.stringify({ error: "An unexpected error occurred." }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
});
