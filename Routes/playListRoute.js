const express = require('express');
const playlistRoutes = express.Router();
const playlistController = require('../controllers/playlistController');
const Playlist = require('../models/playlist');
// const { authenticateUser } = require('../middleware/authentication');

playlistRoutes.get('/:userId',playlistController.getUserPlaylist);
// playlistRoutes.post('/', playlistController.createPlaylist);
// playlistRoutes.post('/:playlistId/songs/:songId',playlistController.addSongToPlaylist);
playlistRoutes.post('/createplaylist', playlistController.createPlaylistController);

module.exports = playlistRoutes;