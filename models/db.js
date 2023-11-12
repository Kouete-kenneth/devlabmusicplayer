const Sequelize = require('sequelize');
const sequelize = new Sequelize('musicdatabase', '', '', {
  host: 'localhost',
  dialect: 'sqlite',
  storage: '../MusicDatabase/database.sqlite',
  logging: console.log,
});

sequelize.authenticate()
  .then(() => {
    console.log('Database connection has been established successfully.');
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });

module.exports = sequelize;