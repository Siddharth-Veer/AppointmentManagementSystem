const express = require('express');
const router = express.Router();
const { getAppointments, setAppointment } = require('../controllers/appointmentController');

// Route to get all appointments
router.get('/', getAppointments);

// Route to create a new appointment
router.post('/', setAppointment);

module.exports = router;