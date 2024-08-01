const express = require('express');
const router = express.Router();
const Availability = require('../models/Availability');

router.post('/', async (req, res) => {
  const { doctorId, day, slots } = req.body;

  try {
    let availability = await Availability.findOne({ doctorId, day });
    if (availability) {
      // Update existing availability
      availability.slots = slots;
      await availability.save();
    } else {
      // Create new availability
      availability = new Availability({ doctorId, day, slots });
      await availability.save();
    }
    res.status(200).json(availability);
  } catch (error) {
    console.error('Error saving availability:', error);
    res.status(500).json({ message: 'Server error' });
  }
});
  

// GET /api/availability - Get availability for a specific doctor on a specific date
router.get('/', async (req, res) => {
  const { doctorId, date } = req.query; // Use query parameters for doctorId and date

  try {
    const availability = await Availability.findOne({ doctorId, day: date });
    if (availability) {
      res.status(200).json(availability);
    } else {
      res.status(404).json({ message: 'Availability not found' });
    }
  } catch (error) {
    console.error('Error fetching availability:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
