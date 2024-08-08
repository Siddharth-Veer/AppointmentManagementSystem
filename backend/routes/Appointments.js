// backend/routes/appointments.js
const express = require('express');
const router = express.Router();
const Appointment = require('../models/Appointment');
const auth = require('../middleware/auth');
const { getAppointments, setAppointment } = require('../controllers/appointmentController');

router.get('/', async (req, res) => {
    try {
      const appointments = await Appointment.find();
      res.json(appointments);
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  });

// Route to get all appointments - accessible to admin and doctors
router.get('/', auth('admin'), getAppointments);

// Route to create a new appointment - accessible to patients
router.post('/', auth('patient'), setAppointment);

module.exports = router;
