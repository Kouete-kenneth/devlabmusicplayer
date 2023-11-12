// controllers/authController.js
const database = require('../models/database');

// Function to handle user registration
exports.signup = (req, res) => {
  // Retrieve user data from request body
  const { email, password } = req.body;
  console.log("this is the request body: ",req.body);
  // Save user data to the database
  database.saveUser(email, password, (err) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to register user' });
    }
    return res.status(200).json({ message: 'User registered successfully' });
  });
};

// Function to handle user login
exports.login = (req, res) => {
  // Retrieve user data from request body
  const { email, password } = req.body;

  // Authenticate user credentials
  database.authenticateUser(email, password, (err, user) => {
    if (err || !user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    return res.status(200).json({ message: 'Login successful', user });
  });
};