const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const songRoutes = require('./Routes/songsRoutes');
const authRoutes = require('./Routes/AuthenticationRoute');
const playlistRoute=require('./Routes/playListRoute')
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());
// song Routes
app.use('/devlabmusic/api/songs', songRoutes);

// Mounting the authentication routes
app.use('/devlabmusic/api/auth', authRoutes);

app.use('/devlabmusic/api/playlist', playlistRoute);


// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err); // Log the error for debugging purposes
  res.status(500).json({ error: 'Internal Server Error' });
});

// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});