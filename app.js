require('dotenv').config();

// Initialize Elastic APM before anything else
const apm = require('elastic-apm-node').start({
  serviceName: process.env.ELASTIC_APM_SERVICE_NAME,
  serverUrl: process.env.ELASTIC_APM_SERVER_URL,
  secretToken: process.env.ELASTIC_APM_SECRET_TOKEN,
  environment: process.env.ELASTIC_APM_ENVIRONMENT || 'development'
});

const express = require('express');
const app = express();
const routes = require('./routes');
const logger = require('./logger');

app.use(express.json());

app.use((req, res, next) => {
  req.apm = apm;
  next();
});
// Log middleware
app.use((req, res, next) => {
  const start = Date.now();

  // Save original send method
  const originalSend = res.send;

  // Wrap res.send to capture response body
  res.send = function (body) {
    const responseTime = Date.now() - start;
    
    logger.info(JSON.stringify({
      trace_id: req.apm.currentTraceIds['trace.id'],
      span_id: req.apm.currentTraceIds['span.id'],
      message: 'HTTP Request-Response',
      method: req.method,
      url: req.originalUrl,
      statusCode: res.statusCode,
      duration: `${responseTime}ms`,
      requestBody: req.body,
      responseBody: body
    }));

    // Call original send
    return originalSend.call(this, body);
  };

  next();
});

app.use('/', routes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  logger.info(`Server running at http://localhost:${PORT}`);
});
