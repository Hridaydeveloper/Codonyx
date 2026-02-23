import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

type NotificationType = "connection_accepted" | "registration_approved" | "registration_rejected";

interface NotificationRequest {
  type: NotificationType;
  recipientEmail: string;
  recipientName: string;
  senderName?: string;
  senderHeadline?: string;
  senderOrganisation?: string;
  senderUserType?: string;
  userType?: string;
  loginUrl?: string;
}

function getEmailContent(data: NotificationRequest): { subject: string; html: string } {
  const year = new Date().getFullYear();
  const baseUrl = data.loginUrl || "https://codonyx.lovable.app/auth";

  const wrapper = (header: string, subtitle: string, body: string) => `
    <!DOCTYPE html>
    <html lang="en">
    <head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
    <body style="margin:0;padding:0;font-family:'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;background-color:#f8fafc;">
      <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f8fafc;padding:48px 20px;">
        <tr><td align="center">
          <table width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background-color:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">
            <tr><td style="background:linear-gradient(135deg,#059669 0%,#047857 50%,#065f46 100%);padding:40px 32px;text-align:center;">
              <h1 style="color:#ffffff;margin:0;font-size:24px;font-weight:700;">${header}</h1>
              <p style="color:rgba(255,255,255,0.85);margin:8px 0 0;font-size:15px;">${subtitle}</p>
            </td></tr>
            <tr><td style="padding:40px 32px;">${body}</td></tr>
            <tr><td style="padding:24px 32px;text-align:center;border-top:1px solid #f1f5f9;">
              <span style="color:#059669;font-size:18px;font-weight:700;">Codonyx</span>
              <p style="color:#94a3b8;font-size:12px;margin:8px 0 0;">© ${year} Codonyx. All rights reserved.</p>
            </td></tr>
          </table>
        </td></tr>
      </table>
    </body></html>
  `;

  switch (data.type) {
    case "connection_accepted":
      return {
        subject: `${data.senderName} accepted your connection request | Codonyx`,
        html: wrapper(
          "Connection Accepted! 🎉",
          "Great news from the Codonyx network",
          `<p style="color:#475569;font-size:16px;line-height:1.6;margin:0 0 24px;">
            Hello <strong style="color:#1e293b;">${data.recipientName}</strong>,
          </p>
          <p style="color:#475569;font-size:16px;line-height:1.7;margin:0 0 16px;">
            <strong style="color:#059669;">${data.senderName}</strong> has accepted your connection request on Codonyx. You are now connected and can collaborate directly.
          </p>
          ${data.senderHeadline || data.senderOrganisation || data.senderUserType ? `
          <div style="background:#f1f5f9;border-radius:10px;padding:16px 20px;margin:0 0 24px;">
            <p style="margin:0;color:#1e293b;font-weight:600;font-size:15px;">${data.senderName}</p>
            ${data.senderUserType ? `<p style="margin:4px 0 0;color:#059669;font-size:13px;text-transform:capitalize;">${data.senderUserType}</p>` : ""}
            ${data.senderHeadline ? `<p style="margin:4px 0 0;color:#475569;font-size:14px;">${data.senderHeadline}</p>` : ""}
            ${data.senderOrganisation ? `<p style="margin:4px 0 0;color:#64748b;font-size:13px;">${data.senderOrganisation}</p>` : ""}
          </div>` : ""}
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr><td align="center">
              <a href="${baseUrl.replace('/auth', '/connections')}" style="display:inline-block;background:linear-gradient(135deg,#059669 0%,#047857 100%);color:#ffffff;text-decoration:none;padding:16px 40px;border-radius:10px;font-size:16px;font-weight:600;">
                View Your Connections
              </a>
            </td></tr>
          </table>`
        ),
      };

    case "registration_approved":
      return {
        subject: `Your Codonyx registration has been approved! 🎉`,
        html: wrapper(
          "Registration Approved! ✅",
          `Welcome to the Codonyx network`,
          `<p style="color:#475569;font-size:16px;line-height:1.6;margin:0 0 24px;">
            Hello <strong style="color:#1e293b;">${data.recipientName}</strong>,
          </p>
          <p style="color:#475569;font-size:16px;line-height:1.7;margin:0 0 16px;">
            We are pleased to inform you that your registration as a <strong style="color:#059669;">${data.userType === "advisor" ? "Advisor" : "Laboratory"}</strong> on Codonyx has been approved.
          </p>
          <p style="color:#475569;font-size:16px;line-height:1.7;margin:0 0 32px;">
            You can now sign in using your login credentials and start connecting with professionals across the network.
          </p>
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr><td align="center">
              <a href="${baseUrl}" style="display:inline-block;background:linear-gradient(135deg,#059669 0%,#047857 100%);color:#ffffff;text-decoration:none;padding:16px 40px;border-radius:10px;font-size:16px;font-weight:600;">
                Sign In to Codonyx
              </a>
            </td></tr>
          </table>`
        ),
      };

    case "registration_rejected":
      return {
        subject: `Update on your Codonyx registration`,
        html: wrapper(
          "Registration Update",
          "An update on your Codonyx account",
          `<p style="color:#475569;font-size:16px;line-height:1.6;margin:0 0 24px;">
            Hello <strong style="color:#1e293b;">${data.recipientName}</strong>,
          </p>
          <p style="color:#475569;font-size:16px;line-height:1.7;margin:0 0 16px;">
            We regret to inform you that your registration as a <strong>${data.userType === "advisor" ? "Advisor" : "Laboratory"}</strong> on Codonyx has not been approved at this time.
          </p>
          <p style="color:#475569;font-size:16px;line-height:1.7;margin:0 0 32px;">
            If you believe this is an error or would like further information, please contact us at <a href="mailto:info@codonyx.org" style="color:#059669;text-decoration:none;font-weight:500;">info@codonyx.org</a>.
          </p>`
        ),
      };
  }
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const data: NotificationRequest = await req.json();

    if (!data.recipientEmail || !data.recipientName || !data.type) {
      return new Response(
        JSON.stringify({ error: "recipientEmail, recipientName, and type are required." }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    const { subject, html } = getEmailContent(data);

    console.log(`Sending ${data.type} notification to:`, data.recipientEmail);

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Codonyx Notifications <notifications@codonyx.org>",
        to: [data.recipientEmail],
        subject,
        html,
      }),
    });

    const emailResponse = await res.json();
    console.log("Notification email response:", emailResponse);

    if (!res.ok) {
      throw new Error(emailResponse.message || "Failed to send email");
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (error: any) {
    console.error("Error in send-notification-email:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
};

serve(handler);
