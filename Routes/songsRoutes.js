const express = require('express');
const songsRoutes = express.Router();
const songController = require('../controllers/songController');

songsRoutes.get('/', songController.getAllSongs);
songsRoutes.get('/:songId', songController.playSong);
songsRoutes.post('/', songController.createSong);
songsRoutes.delete('/', songController.deleteAllMusic);
module.exports = songsRoutes;