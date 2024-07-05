const db = require('../database');

class Document {
  static async getAllDocuments() {
    return new Promise((resolve, reject) => {
      db.all('SELECT * FROM documents', (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      });
    });
  }

  static async addDocument(name, content, tokens) {
    return new Promise((resolve, reject) => {
      db.run('INSERT INTO documents (name, content, tokens) VALUES (?, ?, ?)', [name, content, tokens], function(err) {
        if (err) reject(err);
        else resolve(this.lastID);
      });
    });
  }

  static async getDocumentById(id) {
    return new Promise((resolve, reject) => {
      db.get('SELECT * FROM documents WHERE id = ?', [id], (err, row) => {
        if (err) reject(err);
        else resolve(row);
      });
    });
  }
}

module.exports = Document;