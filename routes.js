const express = require('express');
const logger = require('./logger');
const router = express.Router();

router.get('/', (req, res) => {
  const span = req.apm.startSpan('home');
  span?.end();
  logger.info('GET route /');
  res.send('Welcome to the Simple Node.js App!');
});

router.get('/about', (req, res) => {
  const span = req.apm.startSpan('about');
  span?.end();
  logger.info('GET route /about');
  res.json({ message: 'This is a simple Express app.' });
});

router.post('/echo', (req, res) => {
  const span = req.apm.startSpan('echo');
  span?.end();
  logger.info('POST route /echo');
  res.json({ you_sent: req.body });
});

module.exports = router;
