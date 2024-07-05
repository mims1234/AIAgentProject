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
  } else {
    const response = await groq.chat.completions.create({
      model: model,
      messages: [{ role: "user", content: prompt }],
      temperature: temperature,
      top_p: topP
    });
    return response.choices[0].message.content;
  } 
}

async function getAvailableModels() {
  const openAIModels = [
    { name: 'gpt-3.5-turbo', provider: 'openai' },
    { name: 'gpt-4', provider: 'openai' },
    { name: 'gpt-4-32k', provider: 'openai' },
    { name: 'gpt-4o', provider: 'openai' }
  ];
  
  let groqModels = [];
  try {
    const groqModelList = await groq.models.list();
    groqModels = groqModelList.data
      .filter(model => !model.id.includes('whisper'))
      .map(model => ({ name: model.id, provider: 'groq' }));
  } catch (error) {
    console.error('Error fetching Groq models:', error);
  }

  return [...groqModels, ...openAIModels];
}

module.exports = {
  generateResponse,
  getAvailableModels
};