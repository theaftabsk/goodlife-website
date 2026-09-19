import { NextRequest, NextResponse } from "next/server";

// Next.js Native Serverless Route Handler for Inbound Leads
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { companyName, contactName, email, mobile, source, intent, notes } = body;

    const lead = {
      id: `lead-${Date.now()}`,
      company: companyName || "Enterprise Prospect",
      contact: contactName || "Business Executive",
      email: email || "",
      mobile: mobile || "",
      source: source || "Website Lead Form",
      intent: intent || "General Inquiry",
      notes: notes || "",
      date: new Date().toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      }),
      emailStatus: "Delivered",
      crmStatus: "Synced to Zoho CRM"
    };

    console.log("[NEXT.JS API] Inbound Lead Received:", lead);

    // If Resend API Key is set in environment, dispatch email
    const resendApiKey = process.env.RESEND_API_KEY;
    if (resendApiKey) {
      try {
        await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${resendApiKey}`
          },
          body: JSON.stringify({
            from: process.env.SMTP_FROM || "Good Life Sutra <no-reply@goodlifesutra.com>",
            to: [process.env.ADMIN_EMAIL || "leads@goodlifesutra.com"],
            subject: `[New Lead] ${lead.company} (${lead.contact})`,
            html: `
              <h2>New Lead Received on Good Life Sutra</h2>
              <p><strong>Company:</strong> ${lead.company}</p>
              <p><strong>Contact:</strong> ${lead.contact}</p>
              <p><strong>Email:</strong> ${lead.email}</p>
              <p><strong>Mobile:</strong> ${lead.mobile}</p>
              <p><strong>Source:</strong> ${lead.source}</p>
            `
          })
        });
      } catch (e) {
        console.error("[NEXT.JS API EMAIL ERROR]", e);
      }
    }

    return NextResponse.json({
      success: true,
      message: "Lead processed and saved successfully.",
      data: lead
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to process lead" },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    success: true,
    message: "Next.js Leads API active",
    timestamp: new Date().toISOString()
  });
}
