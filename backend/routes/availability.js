const express = require('express');
const router = express.Router();
const Availability = require('../models/Availability');

// Define your working hours and slot duration
const WORKING_HOURS = { start: 9, end: 18 }; // 9 AM to 6 PM
const SLOT_DURATION = 60; // 30 minutes

// Function to generate time slots for a given day
const generateAllSlots = () => {
  const slots = [];
  for (let hour = WORKING_HOURS.start; hour < WORKING_HOURS.end; hour++) {
    for (let minute = 0; minute < 60; minute += SLOT_DURATION) {
      const startTime = `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;
      slots.push({ startTime });
    }
  }
  return slots;
};

// POST /api/availability - Create or update availability
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
      // If no availability is found, return all possible slots
      const slots = generateAllSlots();
      res.status(200).json({ doctorId, day: date, slots });
    }
  } catch (error) {
    console.error('Error fetching availability:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
