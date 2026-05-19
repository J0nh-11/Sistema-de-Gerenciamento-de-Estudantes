const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../view/menu/telaMenu.html'));
});

router.post('/login', (req, res) => {
  res.sendFile(path.join(__dirname, '../view/menu/telaMenu.html'));
});

module.exports = router;