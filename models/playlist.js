const { DataTypes, Model } = require('sequelize');
const db = require('./db');
const User = require('./users');
const Song = require('./songs');

class Playlist extends Model {
  static async findByUserId(userId) {
    try {
      const playlists = await Playlist.findAll({ where: { userId } });
      return playlists;
    } catch (error) {
      throw new Error('Error finding playlists by userId');
    }
  }

  static async addSong(playlistId, songId) {
    try {
      const playlist = await Playlist.findByPk(playlistId);
      const song = await Song.findByPk(songId);

      if (!playlist) {
        throw new Error('Playlist not found');
      }

      if (!song) {
        throw new Error('Song not found');
      }

      await playlist.addSong(song);
    } catch (error) {
      throw new Error('Error adding song to playlist');
    }
  }
}

Playlist.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: 'Playlist name must be unique',
      },
      validate: {
        async isUniqueName(value) {
          try {
            const playlist = await Playlist.findOne({
              where: { name: value, userId: this.userId },
            });

            if (playlist) {
              throw new Error('Playlist with the same name already exists');
            }
          } catch (error) {
            throw new Error('Playlist with the same name already exists');
          }
        },
      },
    },
   
  },
  {
    sequelize: db,
    modelName: 'Playlist',
  }
);

Playlist.belongsTo(User); // A playlist belongs to a user
Playlist.hasMany(Song); // A playlist can have many songs

Playlist.sync()
  .then(() => {
    console.log('Playlist table created successfully.');
  })
  .catch((error) => {
    console.error('Error creating Playlist table:', error);
  });


module.exports = Playlist;