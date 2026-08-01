const express = require('express');
const cors = require('cors');
const apiV1Router = require('./src/routes/v1');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Mount API v1 Routes
app.use('/api/v1', apiV1Router);

// Fallback legacy endpoints
app.use('/api', apiV1Router);

app.listen(PORT, () => {
  console.log(`🚀 Good Life Enterprise API Server running on http://localhost:${PORT}`);
  console.log(`📌 API v1 Endpoint: http://localhost:${PORT}/api/v1/health`);
});
