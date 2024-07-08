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

module.exports = router;
