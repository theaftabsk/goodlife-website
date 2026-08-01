const express = require('express');
const router = express.Router();
const leadsController = require('../../controllers/leadsController');

// ── API V1 ROUTES ──

// Health Check
router.get('/health', (req, res) => {
  return res.status(200).json({ status: 'OK', version: 'v1', timestamp: new Date().toISOString() });
});

// Diagnostic Leads API
router.post('/leads/diagnostic', leadsController.submitDiagnostic);
router.get('/leads', leadsController.getLeads);

// CMS Articles API placeholder
router.get('/articles', (req, res) => {
  return res.status(200).json({ success: true, data: [] });
});

// 301 Redirects API placeholder
router.get('/redirects', (req, res) => {
  return res.status(200).json({
    success: true,
    data: [
      { from: "/services/b2b", to: "/b2b-institutional-commerce", code: 301 },
      { from: "/services/oem-launch", to: "/brand-launch-incubation", code: 301 }
    ]
  });
});

module.exports = router;
