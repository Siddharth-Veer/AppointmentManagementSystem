const express = require('express');
const router = express.Router();
const session = require('express-session');

// Configure session management
router.use(
  session({
    secret: 'your_secret_key', // Replace with a secure key
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false, maxAge: 60000 } // Adjust 'secure' as needed
  })
);

// Hardcoded admin credentials (for demo purposes)
const adminUsername = 'admin';
const adminPassword = 'admin@123';

// Admin login route
router.post('/admin/login', (req, res) => {
  const { username, password } = req.body;
  
  if (username === adminUsername && password === adminPassword) {
    req.session.isAdmin = true;
    res.status(200).json({ message: 'Login successful' });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

// Admin logout route
router.post('/admin/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: 'Failed to log out' });
    }
    res.status(200).json({ message: 'Logout successful' });
  });
});

// Middleware to protect admin routes
const checkAdminAuth = (req, res, next) => {
  if (req.session.isAdmin) {
    next();
  } else {
    res.status(403).json({ message: 'Access denied' });
  }
};

// Protected admin routes
router.get('/admin/dashboard', checkAdminAuth, (req, res) => {
  res.status(200).json({ message: 'Welcome to the Admin Dashboard' });
});

router.get('/admin/doctorslist', checkAdminAuth, (req, res) => {
  res.status(200).json({ message: 'Doctors List' });
});

// Add other protected routes as needed
router.get('/admin/add-doctor', checkAdminAuth, (req, res) => {
  res.status(200).json({ message: 'Add Doctor Page' });
});

router.get('/admin/manage-doctors', checkAdminAuth, (req, res) => {
  res.status(200).json({ message: 'Manage Doctors Page' });
});

router.get('/admin/manage-availability', checkAdminAuth, (req, res) => {
  res.status(200).json({ message: 'Manage Availability Page' });
});

module.exports = router;
