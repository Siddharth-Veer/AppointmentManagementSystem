// const express = require("express");
// const router = express.Router();
// const User = require("../models/User");

// // POST /api/auth/register - Register a new user
// router.post("/register", async (req, res) => {
//   const { idNo, name, email, dateOfBirth } = req.body;

//   // Basic validation
//   if (!idNo || !name || !email || !dateOfBirth) {
//     return res.status(400).json({ message: "Please provide all required fields" });
//   }

//   try {
//     // Check if a user with the same ID or email already exists
//     const existingUser = await User.findOne({ $or: [{ idNo }, { email }] });
//     if (existingUser) {
//       return res.status(400).json({ message: "User with this ID or email already exists" });
//     }

//     // Create a new user
//     const newUser = new User({ idNo, name, email, dateOfBirth });
//     await newUser.save();
//     res.status(201).json(newUser);
//   } catch (error) {
//     res.status(500).json({ message: "Server error" });
//   }
// });

// // GET /api/auth/user - Get user details by email
// router.get("/user", async (req, res) => {
//   const { email } = req.query;

//   try {
//     const user = await User.findOne({ email });
//     if (user) {
//       res.status(200).json({ name: user.name });
//     } else {
//       res.status(404).json({ message: "User not found" });
//     }
//   } catch (error) {
//     res.status(500).json({ message: "Server error" });
//   }
// });

// module.exports = router;

const express = require("express");
const router = express.Router();
const User = require("../models/User");

// POST /api/auth/register - Register a new user
router.post("/register", async (req, res) => {
  const { idNo, name, email, dateOfBirth } = req.body;

  // Basic validation
  if (!idNo || !name || !email || !dateOfBirth) {
    return res
      .status(400)
      .json({ message: "Please provide all required fields" });
  }

  try {
    // Check if a user with the same ID or email already exists
    const existingUser = await User.findOne({ $or: [{ idNo }, { email }] });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User with this ID or email already exists" });
    }

    // Create a new user
    const newUser = new User({ idNo, name, email, dateOfBirth });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// GET /api/auth/user - Get user details by email
router.get("/user", async (req, res) => {
  const { email } = req.query;

  try {
    const user = await User.findOne({ email });
    if (user) {
      res.status(200).json({ name: user.name });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
