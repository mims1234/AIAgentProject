const db = require('../database');

class Agent {
  static async getAllAgents() {
    return new Promise((resolve, reject) => {
      db.all('SELECT * FROM agents', (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      });
    });
  }

  static async addAgent(name, prompt) {
    return new Promise((resolve, reject) => {
      db.run('INSERT INTO agents (name, prompt) VALUES (?, ?)', [name, prompt], function(err) {
        if (err) reject(err);
        else resolve(this.lastID);
      });
    });
  }

  static async getAgentById(id) {
    return new Promise((resolve, reject) => {
      db.get('SELECT * FROM agents WHERE id = ?', [id], (err, row) => {
        if (err) reject(err);
        else resolve(row);
      });
    });
  }

  static async updateAgent(id, name, prompt) {
    return new Promise((resolve, reject) => {
      db.run('UPDATE agents SET name = ?, prompt = ? WHERE id = ?', [name, prompt, id], function(err) {
        if (err) reject(err);
        else resolve(this.changes);
      });
    });
  }
}

module.exports = Agent;