const express = require('express');
const router = express.Router();
const { processUrl, processFile, upload } = require('../services/documentProcessor');
const db = require('../database');

router.get('/', (req, res) => {
  db.all('SELECT * FROM documents', (err, documents) => {
    if (err) {
      console.error(err);
      documents = [];
    }
    res.render('upload', { documents });
  });
});

router.post('/url', async (req, res) => {
  try {
    const { url } = req.body;
    const tokens = await processUrl(url);
    res.json({ tokens });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/file', upload.single('file'), async (req, res) => {
  try {
    const tokens = processFile(req.file);
    res.json({ tokens });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;