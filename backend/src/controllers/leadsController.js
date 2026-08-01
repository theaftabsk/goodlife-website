// Diagnostic Leads Controller (API v1)
const resendService = require('../services/resendService');

const submitDiagnostic = async (req, res) => {
  const { company, contactName, designation, email, mobile, category, revenueBand, gmvBand, intent, timeline, challenges } = req.body;
  
  let score = 70;
  const tags = [];

  if (intent === 'OEM Brand Launch' || (category && category.includes('Appliances'))) {
    score += 20;
    tags.push('OEM-to-Brand Opportunity');
  }
  if (gmvBand && (gmvBand.includes('50 Cr') || gmvBand.includes('10 Cr'))) {
    score += 10;
    tags.push('High-Volume Scale Candidate');
  }
  if (challenges && (challenges.includes('returns') || challenges.includes('reconciliation'))) {
    tags.push('Revenue Assurance Candidate');
  }

  const lead = {
    id: `GL-${Math.floor(1000 + Math.random() * 9000)}`,
    company: company || "Enterprise Prospect",
    contactName: contactName || "Representative",
    designation: designation || "Executive",
    email: email || "contact@prospect.com",
    mobile: mobile || "+91 98000 00000",
    category: category || "Commerce Growth",
    revenueBand: revenueBand || "₹10 Cr - ₹50 Cr",
    gmvBand: gmvBand || "₹2 Cr - ₹10 Cr",
    intent: intent || "Scale Pan-India",
    timeline: timeline || "Immediate",
    fitScore: score,
    fitLabel: score >= 85 ? "High-Fit Enterprise Prospect" : "Standard Growth Candidate",
    tags,
    createdAt: new Date().toISOString()
  };

  // Trigger Resend email delivery asynchronously
  resendService.sendDiagnosticLeadEmails(lead).catch(err => {
    console.error('[EMAIL TRIGGER ERROR]', err);
  });

  return res.status(200).json({
    success: true,
    message: "Diagnostic submitted, fit score calculated, and email notifications triggered via Resend.",
    data: lead
  });
};

const getLeads = (req, res) => {
  return res.status(200).json({
    success: true,
    count: 3,
    data: [
      { id: "GL-1092", company: "Apex Appliances Pvt Ltd", score: 92, intent: "OEM Brand Launch" },
      { id: "GL-1091", company: "NutriLife D2C", score: 84, intent: "Fix & Grow Operations" },
      { id: "GL-1090", company: "Vanguard Tools & Industrial", score: 96, intent: "B2B & Institutional Scale" }
    ]
  });
};

module.exports = {
  submitDiagnostic,
  getLeads
};
