const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// POST /api/auth/register - Register a new user
router.post("/register", async (req, res) => {
  const { idNo, name, email, dateOfBirth, password } = req.body;

  console.log("Request received:", { idNo, name, email, dateOfBirth, password });

  if (!idNo || !name || !email || !dateOfBirth || !password) {
    return res.status(400).json({ message: "Please provide all required fields" });
  }

  try {
    const existingUser = await User.findOne({ $or: [{ idNo }, { email }] });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User with this ID or email already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({ idNo, name, email, dateOfBirth, password: hashedPassword });
    await newUser.save();

    const token = jwt.sign({ _id: newUser._id, role: newUser.role }, process.env.JWT_PRIVATE_KEY);

    req.session.token = token;

    res.status(201).json({ token });
  } catch (error) {
    console.error("Error in /register route:", error); // More detailed logging
    res.status(500).json({ message: "Server error" });
  }
});


// POST /api/auth/login - Log in an existing user
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  // Basic validation
  if (!email || !password) {
    return res.status(400).json({ message: "Please provide both email and password" });
  }

  try {
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate JWT
    const token = jwt.sign({ _id: user._id, role: user.role }, process.env.JWT_PRIVATE_KEY);

    // Store JWT in session
    req.session.token = token;

    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// GET /api/auth/user - Get user details by email
router.get("/user", async (req, res) => {
  const { email } = req.query;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ name: user.name });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
