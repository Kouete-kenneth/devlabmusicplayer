const { DataTypes, Model } = require('sequelize');
const db = require('./db');
class Song extends Model {}
Song.init(
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    artist: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    album: DataTypes.STRING,
    genre: DataTypes.STRING,
    duration: {
      type: DataTypes.TIME,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    releaseYear: DataTypes.DATEONLY,
    trackNumber: DataTypes.STRING,
    composer: DataTypes.STRING,
    albumArtwork: DataTypes.STRING,
    musicLink: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    PlaylistId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    sequelize: db,
    modelName: 'Song',
  }
);
Song.sync()
  .then(() => {
    console.log('Songs table created successfully.');
  })
  .catch((error) => {
    console.error('Error creating Songs table:', error);
  });

module.exports = Song;