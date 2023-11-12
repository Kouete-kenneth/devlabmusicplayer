const Playlist = require('../models/playlist');
const Song = require('../models/songs');
const sequelize=require('../models/db')
const User = require('../models/users');

// Controller function to retrieve all songs
const getAllSongs = async (req, res, next) => {
  try {
    const songs = await Song.findAll({
      attributes: [
        'id',
        'title',
        'artist',
        'album',
        'genre',
        'duration',
        'releaseYear',
        'trackNumber',
        'composer',
        'albumArtwork',
        'musicLink',
        'createdAt',
        'updatedAt',
      ]
    });

    res.json(songs);
  } catch (error) {
    next(error);
  }
};

// Controller function to play a specific song
const playSong = async (req, res, next) => {
  try {
    const { songId } = req.params;
    // const song = await Song.findByPk(songId); // Assuming you have a `findByPk` method in the Song model
    const song = await Song.findByPk(songId, {
      attributes: [
        'id',
        'title',
        'artist',
        'album',
        'genre',
        'duration',
        'releaseYear',
        'trackNumber',
        'composer',
        'albumArtwork',
        'musicLink',
        'createdAt',
        'updatedAt',
      ],
    });
    if (!song) {
      return res.status(404).json({ message: 'Song not found' });
    }

    // Perform any additional logic for playing the song here

    res.json(song);
  } catch (error) {
    next(error);
  }
};

// Controller function to add a song to a playlist
const addSongToPlaylist = async (req, res, next) => {
  try {
    const { id, songId } = req.params;

    const playlist = await Playlist.findByPk(id); // Assuming you have a `findByPk` method in the Playlist model
    const song = await Song.findByPk(songId); // Assuming you have a `findByPk` method in the Song model

    if (!playlist || !song) {
      return res.status(404).json({ message: 'Playlist or song not found' });
    }

    // Add the song to the playlist
    playlist.songs.push(song);
    await playlist.save();

    res.json({ message: 'Song added to playlist successfully' });
  } catch (error) {
    next(error);
  }
};

const createSong = async (req, res) => {
  try {
    // Get the required data from the request body
    const {
      title,
      artist,
      album,
      genre,
      duration,
      releaseYear,
      trackNumber,
      composer,
      albumArtwork,
      musicLink,
    } = req.body;

    // Create the song in the database
    const song = await Song.create({
      title,
      artist,
      album,
      genre,
      duration,
      releaseYear,
      trackNumber,
      composer,
      albumArtwork,
      musicLink,
    });

    // Return a success response with the created song
    return res.status(201).json({
      success: true,
      message: 'Song created successfully',
      song,
    });
  } catch (error) {
    // Handle any errors that occur during the creation process
    console.error('Error creating song:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to create song',
    });
  }
};
const deleteAllMusic = async (req, res) => {
  try {
    // Delete all music records from the Songs table
    await Song.destroy({ where: {} });

    // Reinitialize the song ID in the Songs table
    await sequelize.query('DELETE FROM sqlite_sequence WHERE name="Songs"');
    await sequelize.sync({ force: true });

    return res.status(200).json({
      success: true,
      message: 'All music records deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting music records:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to delete music records',
    });
  }
};

module.exports = {
  createSong,
  addSongToPlaylist,
  playSong,
  getAllSongs,
  deleteAllMusic,
};

// Add more controller functions as per your requirements