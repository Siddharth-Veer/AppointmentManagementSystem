const express = require('express');
const router = express.Router();
const Doctor = require('../models/Doctor'); // Assuming you have a Doctor model set up

// POST /api/doctors - Add a new doctor
router.post('/', async (req, res) => {
  try {
    const { name, speciality, contact, email, password, status } = req.body;

    // Validate required fields
    if (!name || !speciality || !contact || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Create a new doctor instance
    const newDoctor = new Doctor({
      name,
      speciality,
      contact,
      email,
      password,
      status
    });

    // Save to the database
    const savedDoctor = await newDoctor.save();
    res.status(201).json(savedDoctor);

  } catch (error) {
    console.error('Error adding doctor:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/', async (req, res) => {
  try {
    const doctors = await Doctor.find(); // Fetch all doctors from the database
    res.status(200).json(doctors);
  } catch (error) {
    console.error('Error fetching doctors:', error);
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