const { Song, Playlist } = require('./models');

Song.belongsTo(Playlist); // A song belongs to a playlist
Playlist.belongsTo(User); // A playlist belongs to a user

module.exports = { Song, Playlist };