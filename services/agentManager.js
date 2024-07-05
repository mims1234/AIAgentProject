const Agent = require('../models/agent');

async function addAgent(name, prompt) {
  return Agent.addAgent(name, prompt);
}

async function getAgents() {
  return Agent.getAllAgents();
}

module.exports = {
  addAgent,
  getAgents
};