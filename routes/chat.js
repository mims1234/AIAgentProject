const express = require('express');
const router = express.Router();
const { generateResponse } = require('../services/llmService');

router.post('/', async (req, res) => {
  try {
    const { model, message, temperature, topP } = req.body;
    const response = await generateResponse(model, message, parseFloat(temperature), parseFloat(topP));
    
    // Get the current timestamp
    const timestamp = new Date().toISOString();

    // For this example, we're using a placeholder for tokens
    // In a real application, you'd get this from the LLM service response
    const tokens = response.length; // This is just a placeholder

    res.json({
      response: response,
      model: model,
      temperature: temperature,
      topP: topP,
      tokens: tokens,
      timestamp: timestamp
    });
  } catch (error) {
    console.error('Error in chat route:', error);
    res.status(500).json({ error: 'An error occurred while processing your request' });
  }
});

module.exports = router;