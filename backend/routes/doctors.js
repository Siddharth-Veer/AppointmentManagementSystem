const express = require('express');
const router = express.Router();
const Doctor = require('../models/Doctor');

// GET /api/doctors - Get all doctors
router.get('/', async (req, res) => {
  try {
    const doctors = await Doctor.find();
    res.json(doctors);
  } catch (error) {
    console.error('Error fetching doctors:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// POST /api/doctors - Add a new doctor
router.post('/', async (req, res) => {
  try {
    const { name, speciality, contact } = req.body;
    const newDoctor = new Doctor({
      name,
      speciality,
      contact
    });
    const savedDoctor = await newDoctor.save();
    res.status(201).json(savedDoctor);
  } catch (error) {
    console.error('Error adding doctor:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
