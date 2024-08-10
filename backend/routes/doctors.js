// backend/routes/doctor.js
const express = require('express');
const router = express.Router();
const Doctor = require('../models/Doctor');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// POST /api/doctors/signin - Sign in a doctor
router.post('/signin', async (req, res) => {
    try {
        const { email, password } = req.body;
        const doctor = await Doctor.findOne({ email });

        if (!doctor) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const isMatch = await bcrypt.compare(password, doctor.password);

        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Generate JWT and store in session
        const token = jwt.sign({ _id: doctor._id, role: 'doctor', name: doctor.name }, process.env.JWT_PRIVATE_KEY);
        req.session.token = token;

        res.status(200).json({ message: 'Sign in successful', token, name: doctor.name });

    } catch (error) {
        console.error('Error signing in doctor:', error.message);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});



// GET /api/doctors - Fetch all doctors
router.get('/', async (req, res) => {
    try {
      const doctors = await Doctor.find();
      res.status(200).json(doctors);
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  });


// PUT /api/doctors/:id - Update doctor details
router.put('/:id', async (req, res) => {
  try {
    const { name, speciality, contact, email, password, status } = req.body;
    const updatedDoctor = await Doctor.findByIdAndUpdate(
      req.params.id,
      { name, speciality, contact, email, password, status },
      { new: true }
    );

    if (!updatedDoctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }

    res.status(200).json(updatedDoctor);
  } catch (error) {
    console.error('Error updating doctor:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const updateFields = { ...req.body };
    
    // Remove password field if not provided
    if (!updateFields.password) {
      delete updateFields.password;
    }

    const updatedDoctor = await Doctor.findByIdAndUpdate(
      req.params.id,
      updateFields,
      { new: true }
    );

    if (!updatedDoctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }

    res.status(200).json(updatedDoctor);
  } catch (error) {
    console.error('Error updating doctor:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// DELETE /api/doctors/:id - Delete a doctor
router.delete('/:id', async (req, res) => {
  try {
    await Doctor.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Doctor deleted' });
  } catch (error) {
    console.error('Error deleting doctor:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
