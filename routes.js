const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('Welcome to the Simple Node.js App!');
});

router.get('/about', (req, res) => {
  res.json({ message: 'This is a simple Express app.' });
});

router.post('/echo', (req, res) => {
  res.json({ you_sent: req.body });
});

module.exports = router;
