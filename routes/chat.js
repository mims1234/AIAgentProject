const express = require('express');
const router = express.Router();
const { generateResponse } = require('../services/llmService');

router.post('/', async (req, res) => {
  try {
    const { model, message, temperature, topP } = req.body;
    const response = await generateResponse(model, message, parseFloat(temperature), parseFloat(topP));
    res.json({ response });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;