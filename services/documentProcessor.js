const axios = require('axios');
const cheerio = require('cheerio');
const multer = require('multer');
const Document = require('../models/document');

const upload = multer({ dest: 'uploads/' });

async function processUrl(url) {
  const response = await axios.get(url);
  const $ = cheerio.load(response.data);
  const text = $('body').text();
  const tokens = text.split(/\s+/).length; // Simple word count as token estimate
  
  await Document.addDocument(url, text, tokens);
  
  return tokens;
}

async function processFile(file) {
  // For simplicity, we're just counting words in the file name
  // In a real application, you'd parse the file contents based on type
  const tokens = file.originalname.split(/\s+/).length;
  
  await Document.addDocument(file.originalname, file.path, tokens);
  
  return tokens;
}

module.exports = {
  processUrl,
  processFile,
  upload
};