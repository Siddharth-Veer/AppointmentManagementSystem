const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { validateRegistration, validateLogin } = require('../utils/auth');

// Register user
router.post('/register', async (req, res) => {
  // Validation
  const { error } = validateRegistration(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // Check if user already exists
  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send('User already registered.');

  // Create new user
  user = new User({
    email: req.body.email,
    password: req.body.password
  });

  // Hash password
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  // Save user to database
  await user.save();

  res.send('User registered successfully.');
});

// Login user
router.post('/login', async (req, res) => {
  // Validation
  const { error } = validateLogin(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // Check if user exists
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send('Invalid email or password.');

  // Validate password
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send('Invalid email or password.');

  // Generate JWT
  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
  res.header('x-auth-token', token).send('Logged in successfully.');
});

module.exports = router;
