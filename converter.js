const { google } = require('googleapis');

// Set up the YouTube API client
const youtube = google.youtube({
  version: 'v3',
  auth: 'AIzaSyAr09NhJrBq9Um7tkg2GfJojrttUgzSyx8', // Replace with your API key
});

// Function to search for music videos
const searchMusicVideos = async (query) => {
  try {
    const response = await youtube.search.list({
      part: 'snippet',
      q: query + ' music',
      type: 'video',
      maxResults: 5, // Set the number of results you want to retrieve
    });

    const videos = response.data.items;
    // Process and use the video details as needed
    console.log(videos);
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
};

// Example usage
searchMusicVideos('Coldplay');