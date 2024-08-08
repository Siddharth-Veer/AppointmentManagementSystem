// backend/routes/patients.js
const express = require('express');
const router = express.Router();
const Patient = require('../models/Patient');

// GET /api/patients/profile - Get patient profile details by email
router.get('/profile', async (req, res) => {
  const { email } = req.query;
  
  try {
    const patient = await Patient.findOne({ email });
    if (patient) {
      res.status(200).json({ name: patient.name });
    } else {
      res.status(404).json({ message: 'Patient not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
