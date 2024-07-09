// auth.js

const express = require('express');
const router = express.Router();
const User = require('../models/User');

// POST /api/auth/register - Register a new user
router.post('/register', async (req, res) => {
  const { idNo, name, email, dateOfBirth } = req.body;

  try {
    const newUser = new User({
      idNo,
      name,
      email,
      dateOfBirth,
    });

    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    console.error('Error saving user:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/auth/user/name - Get latest registered user's name
router.get('/user/name', async (req, res) => {
  try {
    const latestUser = await User.findOne({}, 'name').sort({ createdAt: -1 }); // Sort by creation date descending
    if (!latestUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(latestUser.name);
  } catch (error) {
    console.error('Error fetching user name:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
