const db = require('../database');

class Tool {
  static async getAllTools() {
    return new Promise((resolve, reject) => {
      db.all('SELECT * FROM tools', (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      });
    });
  }

  static async addTool(name, apiUrl) {
    return new Promise((resolve, reject) => {
      db.run('INSERT INTO tools (name, api_url) VALUES (?, ?)', [name, apiUrl], function(err) {
        if (err) reject(err);
        else resolve(this.lastID);
      });
    });
  }

  static async getToolById(id) {
    return new Promise((resolve, reject) => {
      db.get('SELECT * FROM tools WHERE id = ?', [id], (err, row) => {
        if (err) reject(err);
        else resolve(row);
      });
    });
  }

  static async updateTool(id, name, apiUrl) {
    return new Promise((resolve, reject) => {
      db.run('UPDATE tools SET name = ?, api_url = ? WHERE id = ?', [name, apiUrl, id], function(err) {
        if (err) reject(err);
        else resolve(this.changes);
      });
    });
  }
}

module.exports = Tool;