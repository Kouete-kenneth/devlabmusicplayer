const { DataTypes, Model } = require('sequelize');
const db = require('./db');
const bcrypt = require('bcrypt');

class User extends Model {
  async validatePassword(password) {
    try {
      // Compare the provided password with the stored hashed password
      const isPasswordValid = await bcrypt.compare(password, this.password);
      return isPasswordValid;
    } catch (error) {
      throw new Error('Error validating password');
    }
  }
}

User.init(
  {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
  },
  {
    sequelize: db,
    modelName: 'Users',
  }
);

User.beforeCreate(async (user) => {
  try {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    user.password = hashedPassword;
  } catch (error) {
    throw new Error('Error hashing password');
  }
});

User.sync()
  .then(() => {
    console.log('Users table created successfully.');
  })
  .catch((error) => {
    console.error('Error creating Users table:', error);
  });


module.exports = User;