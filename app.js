// const express = require('express');
// const { google } = require('googleapis');

// const app = express();
// const port = 3002;

// // Set up the YouTube API client
// const youtube = google.youtube({
//   version: 'v3',
//   auth: 'AIzaSyAr09NhJrBq9Um7tkg2GfJojrttUgzSyx8', // Replace with your API key
// });

// // Serve the HTML file with YouTube player code
// app.get('/', (req, res) => {
//   res.sendFile(__dirname + '/index.html');
// });

// // Endpoint to search for music videos and retrieve video ID
// app.get('/search', async (req, res) => {
//   try {
//     const response = await youtube.search.list({
//       part: 'snippet',
//       q: req.query.q + ' music',
//       type: 'video',
//       maxResults: 5,
//     });

//     const videoId = response.data.items[0].id.videoId;
//     res.send(videoId);
//   } catch (error) {
//     console.error(`Error: ${error.message}`);
//     res.status(500).send('Internal Server Error');
//   }
// });

// // Start the server
// app.listen(port, () => {
//   console.log(`Server listening on port ${port}`);
// });


// app.js (server code)
const express = require('express');
const { google } = require('googleapis');
const app = express();
const port = 3002;

const youtube = google.youtube({
    version: 'v3',
    auth: 'AIzaSyAr09NhJrBq9Um7tkg2GfJojrttUgzSyx8', // Replace with your YouTube API key
  });
  

// Enable CORS to allow requests from the frontend
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// Endpoint to search for music videos and retrieve video ID
app.get('/search', async (req, res) => {
  try {
    const query = req.query.q;

    // Your logic to search for music videos and retrieve video ID
    const videoId = await searchMusicVideos(query);

    res.send(videoId);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    res.status(500).send('Internal Server Error');
  }
});

// Function to search for music videos (example implementation)
const searchMusicVideos = (query) => {
    return new Promise((resolve, reject) => {
      youtube.search.list({
        part: 'snippet',
        q: query + ' music',
        type: 'video',
        maxResults: 1,
      }, (error, response) => {
        if (error) {
          reject(error);
        } else {
          const videoId = response.data.items[0].id.videoId;
          resolve(videoId);
        }
      });
    });
  };

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});