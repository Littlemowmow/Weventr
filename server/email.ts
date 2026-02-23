import { Resend } from "resend";

function buildWaitlistEmailHtml(params: {
  name: string;
  destination?: string | null;
  referralCode: string;
}): string {
  const { name, destination, referralCode } = params;
  const baseUrl = process.env.SITE_URL || "https://sidequest.app";
  const referralUrl = `${baseUrl}?ref=${referralCode}`;

  const destinationLine = destination
    ? `<p style="margin:0 0 24px;color:#a1a1aa;font-size:15px;line-height:1.6;">We'll make sure <strong style="color:#f9f9f9;">${destination}</strong> is loaded with hidden gems before you get there.</p>`
    : "";

  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to SideQuest</title>
</head>
<body style="margin:0;padding:0;background-color:#0f0f0f;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color:#0f0f0f;">
    <tr>
      <td align="center" style="padding:40px 16px;">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:520px;">
          
          <!-- Logo -->
          <tr>
            <td style="padding:0 0 32px;">
              <table role="presentation" cellspacing="0" cellpadding="0">
                <tr>
                  <td style="width:36px;height:36px;background:linear-gradient(135deg,#f97316,#d97706);border-radius:10px;text-align:center;vertical-align:middle;color:#fff;font-weight:800;font-size:18px;">S</td>
                  <td style="padding-left:10px;font-size:20px;font-weight:700;color:#f9f9f9;letter-spacing:-0.02em;">SideQuest</td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Main Card -->
          <tr>
            <td style="background-color:#1a1a1a;border-radius:20px;padding:40px 32px;border:1px solid #2a2a2a;">
              
              <h1 style="margin:0 0 8px;font-size:28px;font-weight:700;color:#f9f9f9;letter-spacing:-0.02em;">
                You're in, ${name}!
              </h1>
              
              <p style="margin:0 0 24px;color:#a1a1aa;font-size:15px;line-height:1.6;">
                You've secured your spot for early access to SideQuest. We're building something special for friend groups who are tired of trip plans dying in the group chat — and you'll be first to try it.
              </p>

              ${destinationLine}

              <!-- Divider -->
              <div style="height:1px;background:#2a2a2a;margin:0 0 24px;"></div>

              <!-- Referral Section -->
              <p style="margin:0 0 8px;font-size:11px;font-weight:700;color:#f97316;text-transform:uppercase;letter-spacing:0.1em;">
                Your Referral Link
              </p>
              <div style="background:#111;border:1px solid #2a2a2a;border-radius:12px;padding:14px 16px;margin:0 0 16px;">
                <a href="${referralUrl}" style="color:#fbbf24;font-size:14px;font-family:monospace;text-decoration:none;word-break:break-all;">${referralUrl}</a>
              </div>
              
              <p style="margin:0 0 24px;color:#71717a;font-size:13px;line-height:1.5;">
                Share this with your travel crew. The more friends who join, the higher you move on the waitlist.
              </p>

              <!-- CTA Button -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  <td align="center">
                    <a href="${referralUrl}" style="display:inline-block;background:linear-gradient(135deg,#f97316,#d97706);color:#fff;font-size:15px;font-weight:700;padding:14px 32px;border-radius:50px;text-decoration:none;">
                      Share with your travel crew
                    </a>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:28px 0 0;text-align:center;">
              <p style="margin:0 0 4px;color:#52525b;font-size:12px;">
                Questions? Just reply to this email.
              </p>
              <p style="margin:0;color:#3f3f46;font-size:11px;">
                SideQuest Inc. &middot; The travel app for friend groups.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

export async function sendWaitlistConfirmationEmail(params: {
  email: string;
  destination?: string | null;
  referralCode: string;
}): Promise<{ success: boolean; error?: string }> {
  try {
    const apiKey = process.env.RESEND_API_KEY;
    const fromEmail = process.env.RESEND_FROM_EMAIL || "SideQuest <noreply@sidequest.app>";

    if (!apiKey) {
      console.warn("RESEND_API_KEY not set, skipping email");
      return { success: false, error: "Email not configured" };
    }

    const client = new Resend(apiKey);
    const name = params.email.split("@")[0];

    const html = buildWaitlistEmailHtml({
      name,
      destination: params.destination,
      referralCode: params.referralCode,
    });

    await client.emails.send({
      from: fromEmail as string,
      to: params.email,
      subject: "You're on the list \u{1F680} — SideQuest",
      html,
    });

    return { success: true };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown email error";
    console.error("Failed to send waitlist confirmation email:", message);
    return { success: false, error: message };
  }
}
