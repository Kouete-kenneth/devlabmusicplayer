const Playlist = require('../models/playlist');

// Controller function to get a user's specific playlist
const getUserPlaylist = async (req, res, next) => {
  try {
    const { userId } = req.params;

    // Assuming you have a method to retrieve a user's playlist based on their ID
    const playlist = await Playlist.findByUserId(userId);

    if (!playlist) {
      return res.status(404).json({ message: 'Playlist not found' });
    }

    res.json(playlist);
  } catch (error) {
    next(error);
  }
};

const createPlaylistController = async (req, res,next) => {
    try {
      const { name, userId } = req.body;
  
      // Call the createPlaylist function to create a playlist
      const playlist = await Playlist.create({ name, userId });
  
      res.json({ playlist });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  module.exports = {
    createPlaylistController,
    getUserPlaylist,
  };

// Add more controller functions as per your requirements