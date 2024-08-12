const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const session = require('express-session');
const User = require('../models/User'); // Import the User model
const bcrypt = require('bcryptjs');

// Middleware to protect admin routes
const auth = (req, res, next) => {
  if (!req.session || !req.session.isAdmin) {
    return res.status(401).json({ message: 'Unauthorized access. Please log in.' });
  }
  next();
};

// Configure session management
router.use(
  session({
    secret: process.env.SESSION_SECRET || 'your-secret-key', // Replace with a secure secret key
    resave: false,
    saveUninitialized: true,
    cookie: { secure: 'true', maxAge: 60000 } // Secure cookie in production
  })
);

// Admin login route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    req.session.isAdmin = true; // Set session flag for admin
    const token = jwt.sign({ email }, process.env.JWT_PRIVATE_KEY);
    return res.status(200).json({ message: 'Login successful', token });
  } catch (err) {
    return res.status(500).json({ message: 'Server error' });
  }
});

// Admin logout route
router.post('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: 'Failed to log out' });
    }
    return res.status(200).json({ message: 'Logout successful' });
  });
});

// Protected admin routes
router.get('/dashboard', auth, (req, res) => {
  res.status(200).json({ message: 'Welcome to the Admin Dashboard' });
});

router.get('/doctorslist', auth, (req, res) => {
  // Handle logic to get the list of doctors
  res.status(200).json({ message: 'Doctors List' });
});

router.get('/add-doctor', auth, (req, res) => {
  // Handle logic to add a new doctor
  res.status(200).json({ message: 'Add Doctor Page' });
});

router.get('/manage-doctors', auth, (req, res) => {
  // Handle logic to manage doctors
  res.status(200).json({ message: 'Manage Doctors Page' });
});

router.get('/manage-availability', auth, (req, res) => {
  // Handle logic to manage availability
  res.status(200).json({ message: 'Manage Availability Page' });
});

module.exports = router;
