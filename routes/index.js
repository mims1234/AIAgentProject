const express = require('express');
const router = express.Router();
const { getAvailableModels } = require('../services/llmService');

router.get('/', async (req, res) => {
  const models = await getAvailableModels();
  res.render('index', { models });
});

module.exports = router;