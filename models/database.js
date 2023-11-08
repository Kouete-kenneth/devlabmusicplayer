// models/database.js
const sqlite3 = require('sqlite3').verbose();

// Create a new database connection
const db = new sqlite3.Database('MusicDb.db');

// Create the "users" table if it doesn't exist
db.run(
  `CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL
  )`,
  (err) => {
    if (err) {
      console.error('Error creating table:', err);
    } else {
      console.log('Table "users" created successfully');
    }
  }
);

// Function to save a user to the database
exports.saveUser = (email, password, callback) => {
  const query = 'INSERT INTO users (email, password) VALUES (?, ?)';
  db.run(query, [email, password], (err) => {
    if (err) {
      console.error('Error saving user:', err);
      callback(err);
    } else {
      callback(null);
    }
  });
};

// Function to authenticate a user from the database
exports.authenticateUser = (email, password, callback) => {
  const query = 'SELECT * FROM users WHERE email = ? AND password = ?';
  db.get(query, [email, password], (err, row) => {
    if (err) {
      console.error('Error authenticating user:', err);
      callback(err, null);
    } else {
      callback(null, row);
    }
  });
};