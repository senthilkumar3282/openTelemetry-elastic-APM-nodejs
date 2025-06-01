const fs = require('fs');
const winston = require('winston');
// const path = require('path');

// const logDir = path.join(__dirname, 'logs');
// if (!fs.existsSync(logDir)) fs.mkdirSync(logDir);

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ filename: '/var/log/applogs/app.log' }),
    new winston.transports.Console(),
  ],
});

module.exports = logger;
