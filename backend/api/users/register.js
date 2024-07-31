const express = require("express");
const router = express.Router();
const User = require("../models/User"); // Ensure this model includes all fields you're using

// Register new user
router.post("/register", async (req, res) => {
  const {
    idNo,
    date,
    managingDirector,
    branch,
    name,
    placeOfBirth,
    dateOfBirth,
    address,
    state,
    city,
    zipCode,
    country,
    maritalStatus,
    nationality,
    nationalIdNo,
    gender,
    status,
    region,
    idNoAlt,
    phone,
    email,
  } = req.body;

  // Check for missing fields
  if (!name || !email || !phone) {
    return res
      .status(400)
      .json({ message: "Name, email, and phone are required fields." });
  }

  try {
    // Create a new user instance
    const newUser = new User({
      idNo,
      date,
      managingDirector,
      branch,
      name,
      placeOfBirth,
      dateOfBirth,
      address,
      state,
      city,
      zipCode,
      country,
      maritalStatus,
      nationality,
      nationalIdNo,
      gender,
      status,
      region,
      idNoAlt,
      phone,
      email,
    });

    // Save the user to the database
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    console.error("Error saving user:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

module.exports = router;
