const Tool = require('../models/tool');

async function addTool(name, apiUrl) {
  return Tool.addTool(name, apiUrl);
}

async function getTools() {
  return Tool.getAllTools();
}

module.exports = {
  addTool,
  getTools
};