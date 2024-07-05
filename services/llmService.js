const OpenAI = require('openai');
const Groq = require('groq-sdk');

let openai;
try {
  openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
} catch (error) {
  console.log(`Cannot connect OPEN_AI KEY in .env file`);
}

let groq;
try {
  groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
} catch (error) {
  console.log(`Cannot connect GROQ KEY in .env file`)
}

async function generateResponse(model, prompt, temperature, topP) {
  if (model.startsWith('gpt')) {
    const response = await openai.chat.completions.create({
      model: model,
      messages: [{ role: "user", content: prompt }],
      temperature: temperature,
      top_p: topP
    });
    return response.choices[0].message.content;
  } else if (groqModels.includes(model)) {
    const response = await groq.chat.completions.create({
      model: model,
      messages: [{ role: "user", content: prompt }],
      temperature: temperature,
      top_p: topP
    });
    return response.choices[0].message.content;
  } else {
    throw new Error('Invalid model selected');
  }
}

async function getAvailableModels() {
  let models = [];
  
  // Fetch OpenAI models
  try {
    const openAIModels = await openai.models.list();
    models = models.concat(openAIModels.data
      .filter(model => model.id.startsWith('gpt') && !model.id.includes('instruct'))
      .map(model => ({ name: model.id, provider: 'openai' })));
  } catch (error) {
    console.error('Error fetching OpenAI models:', error);
  }
  
  // Add Groq models
  try {
    const groqModels = await groq.models.list();
    models = models.concat(groqModels.data
      .filter(model => !model.id.includes('whisper'))
      .map(model => ({ name: model.id, provider: 'groq' })));
  } catch (error) {
    console.error('Error fetching OpenAI models:', error);
  }

  return models;
}

module.exports = {
  generateResponse,
  getAvailableModels
};