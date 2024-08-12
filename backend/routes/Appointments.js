const express = require('express');
const router = express.Router();
const { getAppointments, setAppointment } = require('../controllers/appointmentController');
const Appointment = require('../models/Appointment'); // Update with your actual path

// Endpoint to get appointments by patient name
router.get('/appointments', async (req, res) => {
  try {
    const { patientName } = req.query;

    // Fetch appointments based on patientName
    const query = patientName ? { patientName } : {};
    const appointments = await Appointment.find(query);
    
    res.status(200).json(appointments);
  } catch (error) {
    console.error('Error fetching appointments:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Route to get all appointments
router.get('/', getAppointments);

// Route to create a new appointment
router.post('/', setAppointment);

module.exports = router;