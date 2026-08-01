// ── RESEND EMAIL DELIVERY SERVICE ──
// Transactional email notifications via Resend API (https://resend.com)

const RESEND_API_KEY = process.env.RESEND_API_KEY || '';
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'leads@goodlifesutra.com';
const FROM_EMAIL = process.env.SMTP_FROM || 'Good Life Sutra <no-reply@goodlifesutra.com>';
const BOOKING_URL = process.env.NEXT_PUBLIC_CALENDAR_BOOKING_URL || 'https://calendly.com/goodlifesutra/commerce-diagnostic';

/**
 * Send email via Resend HTTP API
 */
async function sendResendEmail({ to, subject, html }) {
  if (!RESEND_API_KEY) {
    console.log(`[RESEND MOCK MODE] API key not provided. Email logged to console:`);
    console.log(`To: ${to} | Subject: ${subject}`);
    return { success: true, mock: true };
  }

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${RESEND_API_KEY}`
      },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: Array.isArray(to) ? to : [to],
        subject: subject,
        html: html
      })
    });

    const data = await response.json();
    if (!response.ok) {
      console.error('[RESEND ERROR]', data);
      return { success: false, error: data };
    }

    console.log(`[RESEND SUCCESS] Email dispatched to ${to} (ID: ${data.id})`);
    return { success: true, id: data.id };
  } catch (error) {
    console.error('[RESEND EXCEPTION]', error);
    return { success: false, error: error.message };
  }
}

/**
 * Trigger both Internal Team Notification & Visitor Thank-You Email
 */
async function sendDiagnosticLeadEmails(lead) {
  // 1. Internal Team Notification HTML
  const internalHtml = `
    <div style="font-family: sans-serif; max-width: 600px; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px;">
      <h2 style="color: #2563EB; margin-top: 0;">📥 New Diagnostic Submission — ${lead.id}</h2>
      <p style="font-size: 14px; color: #555;">A new high-intent commerce enquiry has been submitted on Good Life Sutra.</p>
      
      <table style="width: 100%; border-collapse: collapse; margin: 20px 0; font-size: 14px;">
        <tr style="background: #f8fafc;"><td style="padding: 8px; font-weight: bold;">Company:</td><td style="padding: 8px;">${lead.company}</td></tr>
        <tr><td style="padding: 8px; font-weight: bold;">Contact Name:</td><td style="padding: 8px;">${lead.contactName} (${lead.designation})</td></tr>
        <tr style="background: #f8fafc;"><td style="padding: 8px; font-weight: bold;">Business Email:</td><td style="padding: 8px;"><a href="mailto:${lead.email}">${lead.email}</a></td></tr>
        <tr><td style="padding: 8px; font-weight: bold;">Mobile:</td><td style="padding: 8px;">${lead.mobile}</td></tr>
        <tr style="background: #f8fafc;"><td style="padding: 8px; font-weight: bold;">Category:</td><td style="padding: 8px;">${lead.category}</td></tr>
        <tr><td style="padding: 8px; font-weight: bold;">Annual GMV Band:</td><td style="padding: 8px;">${lead.gmvBand}</td></tr>
        <tr style="background: #f8fafc;"><td style="padding: 8px; font-weight: bold;">Operating Intent:</td><td style="padding: 8px;"><strong>${lead.intent}</strong></td></tr>
        <tr><td style="padding: 8px; font-weight: bold;">Decision Timeline:</td><td style="padding: 8px;">${lead.timeline}</td></tr>
        <tr style="background: #eff6ff;"><td style="padding: 8px; font-weight: bold; color: #2563EB;">Calculated Fit Score:</td><td style="padding: 8px; font-weight: bold; color: #2563EB;">${lead.fitScore}/100 (${lead.fitLabel})</td></tr>
      </table>

      <div style="margin-top: 15px;">
        <strong>Opportunity Tags:</strong><br/>
        ${lead.tags.map(t => `<span style="display:inline-block; background:#e0f2fe; color:#0369a1; padding:4px 8px; border-radius:4px; font-size:12px; margin-right:5px; margin-top:5px;">${t}</span>`).join('')}
      </div>
    </div>
  `;

  // 2. Visitor Thank-You Email HTML
  const visitorHtml = `
    <div style="font-family: sans-serif; max-width: 600px; padding: 25px; border: 1px solid #e2e8f0; border-radius: 12px; background: #ffffff;">
      <div style="margin-bottom: 20px;">
        <span style="font-size: 20px; font-weight: 800; color: #0f172a;">GOOD LIFE SUTRA</span><br/>
        <span style="font-size: 11px; color: #2563EB; font-weight: 700; letter-spacing: 1px;">COMMERCE OPERATING PARTNER</span>
      </div>

      <h2 style="color: #0f172a; margin-top: 0;">Thank You for Requesting a Commerce Diagnostic</h2>
      <p style="color: #475569; line-height: 1.6;">
        Dear ${lead.contactName},<br/><br/>
        We have received your Commerce Diagnostic submission for <strong>${lead.company}</strong>. Our operating team is reviewing your profile based on your primary intent (<em>${lead.intent}</em>) and channel requirements.
      </p>

      <div style="background: #f8fafc; border-left: 4px solid #2563EB; padding: 15px; margin: 20px 0; border-radius: 0 8px 8px 0;">
        <strong style="color: #1e293b;">Next Steps:</strong>
        <p style="color: #475569; margin: 5px 0 0 0; font-size: 14px;">
          You can book a direct 30-minute solution architecture call with our lead partner using the calendar link below.
        </p>
      </div>

      <div style="text-align: center; margin: 30px 0;">
        <a href="${BOOKING_URL}" style="background: #2563EB; color: #ffffff; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: bold; display: inline-block;">
          Book Solution Architecture Meeting →
        </a>
      </div>

      <p style="color: #94a3b8; font-size: 12px; border-top: 1px solid #e2e8f0; padding-top: 15px; margin-top: 30px;">
        Good Life Sutra Pvt. Ltd. · India's Premier Commerce Operating Partner<br/>
        Need immediate assistance? Email us at <a href="mailto:contact@goodlifesutra.com" style="color: #2563EB;">contact@goodlifesutra.com</a>
      </p>
    </div>
  `;

  // Dispatch both emails asynchronously
  const [adminRes, visitorRes] = await Promise.all([
    sendResendEmail({ to: ADMIN_EMAIL, subject: `📥 New Diagnostic Lead: ${lead.company} (${lead.intent})`, html: internalHtml }),
    sendResendEmail({ to: lead.email, subject: `Commerce Diagnostic Confirmation — Good Life Sutra`, html: visitorHtml })
  ]);

  return { adminRes, visitorRes };
}

module.exports = {
  sendResendEmail,
  sendDiagnosticLeadEmails
};
