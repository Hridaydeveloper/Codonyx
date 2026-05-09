import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

serve(async (_req: Request) => {
  try {
    const supabaseAdmin = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();

    const { error, count } = await supabaseAdmin
      .from("password_reset_otps")
      .delete({ count: "exact" })
      .lt("expires_at", oneDayAgo);

    if (error) {
      console.error("[cleanup-expired-otps] Delete error:", error);
      return new Response(
        JSON.stringify({ error: "Failed to clean up expired OTPs" }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    console.log(`[cleanup-expired-otps] Deleted ${count ?? 0} expired OTP(s) older than 1 day.`);

    return new Response(
      JSON.stringify({ success: true, deleted: count ?? 0 }),
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
