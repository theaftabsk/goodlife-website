// Diagnostic Leads Controller (API v1)

const submitDiagnostic = (req, res) => {
  const { company, contactName, email, mobile, category, gmvBand, intent, timeline, challenges } = req.body;
  
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

  const lead = {
    id: `GL-${Math.floor(1000 + Math.random() * 9000)}`,
    company: company || "Enterprise Prospect",
    contactName: contactName || "Representative",
    email: email || "contact@prospect.com",
    mobile: mobile || "+91 98000 00000",
    category: category || "Commerce Growth",
    gmvBand: gmvBand || "₹2 Cr - ₹10 Cr",
    intent: intent || "Scale Pan-India",
    timeline: timeline || "Immediate",
    fitScore: score,
    fitLabel: score >= 85 ? "High-Fit Enterprise Prospect" : "Standard Growth Candidate",
    tags,
    createdAt: new Date().toISOString()
  };

  return res.status(200).json({
    success: true,
    message: "Diagnostic submitted and lead fit scored successfully.",
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
