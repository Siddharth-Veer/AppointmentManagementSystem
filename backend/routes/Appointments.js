const express = require('express');
const router = express.Router();
const { getAppointments, setAppointment } = require('../controllers/appointmentController');
const Appointment = require('../models/Appointment'); // Update with your actual path

// Endpoint to get appointments by patient name or doctor name
router.get('/appointments', async (req, res) => {
  try {
    const { patientName, doctorName } = req.query;

    // Build query based on provided parameters
    const query = {};
    if (patientName) query.patientName = patientName;
    if (doctorName) query.doctorName = doctorName;

    // Fetch appointments based on query
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
