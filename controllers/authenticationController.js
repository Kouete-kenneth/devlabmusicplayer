const User = require('../models/users');

// Controller function to handle user signup
exports.signup = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    console.log("name is: ", name);
    // Check if the user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(409).json({ message: 'User already exists' });
    }

    // Create a new user
    const newUser = await User.create({ name, email, password });

    res.json({ user: newUser });
  } catch (error) {
    next(error);
  }
};

// Controller function to handle user login
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Check if the user exists
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Check if the password is correct
    const isValidPassword = await user.validatePassword(password);
    if (!isValidPassword) {
      return res.status(401).json({ message: 'Invalid email or password check password' });
    }

    res.json({ user });
  } catch (error) {
    next(error);
  }
};