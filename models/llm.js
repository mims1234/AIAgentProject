const db = require('../database');

class LLM {
  static async getAllModels() {
    return new Promise((resolve, reject) => {
      db.all('SELECT * FROM llm_models', (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      });
    });
  }

  static async addModel(name, provider) {
    return new Promise((resolve, reject) => {
      db.run('INSERT INTO llm_models (name, provider) VALUES (?, ?)', [name, provider], function(err) {
        if (err) reject(err);
        else resolve(this.lastID);
      });
    });
  }

  static async getModelsByProvider(provider) {
    return new Promise((resolve, reject) => {
      db.all('SELECT * FROM llm_models WHERE provider = ?', [provider], (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      });
    });
  }
}

module.exports = LLM;