const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const session = require("express-session");

// Middleware to protect admin routes
const auth = (req, res, next) => {
  if (!req.session || !req.session.isAuthenticated) {
    return res.status(401).json({ message: "Unauthorized access. Please log in." });
  }
  next();
};

// Configure session management
router.use(
  session({
    secret: process.env.SESSION_SECRET || "your-secret-key", // Replace with a secure secret key
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false, maxAge: 60000 } // Set secure to true in production
  })
);

// Admin login route
router.post("/login", (req, res) => {
  const { username, password } = req.body;

  // Hardcoded admin credentials
  const adminUsername = "admin";
  const adminPassword = "admin@123";

  if (username === adminUsername && password === adminPassword) {
    // Create a session
    req.session.isAuthenticated = true;
    req.session.user = { username };

    // Generate a token if needed (optional)
    const token = jwt.sign({ username }, process.env.JWT_PRIVATE_KEY || "your-private-key");

    return res.status(200).json({ message: "Login successful", token });
  } else {
    return res.status(401).json({ message: "Invalid username or password" });
  }
});

// Admin logout route
router.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: "Failed to log out" });
    } else {
      return res.status(200).json({ message: "Logout successful" });
    }
  });
});

// Protected admin routes
router.get("/dashboard", auth, (req, res) => {
  // Render or send the admin dashboard
  res.status(200).json({ message: "Welcome to the Admin Dashboard" });
});

router.get("/doctorslist", auth, (req, res) => {
  // Handle logic to get the list of doctors
  res.status(200).json({ message: "Doctors List" });
});

router.get("/add-doctor", auth, (req, res) => {
  // Handle logic to add a new doctor
  res.status(200).json({ message: "Add Doctor Page" });
});

router.get("/manage-doctors", auth, (req, res) => {
  // Handle logic to manage doctors
  res.status(200).json({ message: "Manage Doctors Page" });
});

router.get("/manage-availability", auth, (req, res) => {
  // Handle logic to manage availability
  res.status(200).json({ message: "Manage Availability Page" });
});

module.exports = router;
