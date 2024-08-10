const express = require('express');
const router = express.Router();
const session = require('express-session');

router.use(session({
  secret: 'kraken', // Replace with a secure key
  resave: false,
  saveUninitialized: true,
}));

router.post('/admin-login', (req, res) => {
  const { username, password } = req.body;
  
  // Check for admin credentials
  if (username === 'admin' && password === 'admin@123') {
    req.session.isAdmin = true;
    res.status(200).json({ message: 'Login successful' });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

const checkAdminAuth = (req, res, next) => {
  if (req.session.isAdmin) {
    next();
  } else {
    res.status(403).json({ message: 'Access denied' });
  }
};

router.use('/admin/*', checkAdminAuth);

module.exports = router;
