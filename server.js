// server.js
const express = require('express');
const app = express();
const authRoutes = require('./Routes/AuthRoute');

// Middleware to parse incoming JSON data
app.use(express.json());

// Route for home page
app.get('/', (req, res) => {
  res.send('Welcome to the MusicDb API');
});

// Mounting the authentication routes
app.use('/auth', authRoutes);

// Starting the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


