import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

// In-memory store for verification codes (per instance)
const verificationCodes = new Map<string, { code: string; expiresAt: number }>();

serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email, action } = await req.json();

    if (!email) {
      return new Response(
        JSON.stringify({ error: "Email is required" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Action: verify
    if (action === "verify") {
      const { code } = await req.json().catch(() => ({ code: "" }));
      // We handle verify on the client side by comparing codes
      // This branch is not used in current implementation
      return new Response(
        JSON.stringify({ error: "Use client-side verification" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Action: send code
    const code = String(Math.floor(100000 + Math.random() * 900000));
    
    const year = new Date().getFullYear();
    const html = `
      <!DOCTYPE html>
      <html lang="en">
      <head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
      <body style="margin:0;padding:0;font-family:'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;background-color:#f8fafc;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f8fafc;padding:48px 20px;">
          <tr><td align="center">
            <table width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background-color:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">
              <tr><td style="background:linear-gradient(135deg,#059669 0%,#047857 50%,#065f46 100%);padding:40px 32px;text-align:center;">
                <h1 style="color:#ffffff;margin:0;font-size:24px;font-weight:700;">Email Verification 🔐</h1>
                <p style="color:rgba(255,255,255,0.85);margin:8px 0 0;font-size:15px;">Verify your email to continue registration</p>
              </td></tr>
              <tr><td style="padding:40px 32px;">
                <p style="color:#475569;font-size:16px;line-height:1.6;margin:0 0 24px;">
                  Your verification code is:
                </p>
                <div style="text-align:center;margin:0 0 24px;">
                  <span style="display:inline-block;background:#f1f5f9;border:2px solid #059669;border-radius:12px;padding:16px 40px;font-size:32px;font-weight:700;letter-spacing:8px;color:#1e293b;">
                    ${code}
                  </span>
                </div>
                <p style="color:#64748b;font-size:14px;line-height:1.6;margin:0 0 8px;">
                  This code will expire in <strong>10 minutes</strong>.
                </p>
                <p style="color:#94a3b8;font-size:13px;margin:0;">
                  If you did not request this, please ignore this email.
                </p>
              </td></tr>
              <tr><td style="padding:24px 32px;text-align:center;border-top:1px solid #f1f5f9;">
                <span style="color:#059669;font-size:18px;font-weight:700;">Codonyx</span>
                <p style="color:#94a3b8;font-size:12px;margin:8px 0 0;">© ${year} Codonyx. All rights reserved.</p>
              </td></tr>
            </table>
          </td></tr>
        </table>
      </body></html>
    `;

    console.log(`Sending verification code to: ${email}`);

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Codonyx <notifications@codonyx.org>",
        to: [email],
        subject: `${code} - Your Codonyx Verification Code`,
        html,
      }),
    });

    const emailResponse = await res.json();
    console.log("Verification email response:", emailResponse);

    if (!res.ok) {
      throw new Error(emailResponse.message || "Failed to send verification email");
    }

    return new Response(
      JSON.stringify({ success: true, code }),
      { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  } catch (error: any) {
    console.error("Error in send-verification-code:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
});
