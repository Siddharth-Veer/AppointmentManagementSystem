const express = require('express');
const router = express.Router();
const {
  getAppointments,
  setAppointment,
  updateAppointment,
  deleteAppointment,
} = require('../controllers/appointmentController');

// Route to get appointments by patient name or all appointments
router.get('/', async (req, res) => {
  try {
    const { patientName } = req.query;

    // Validate query parameter
    if (patientName && typeof patientName !== 'string') {
      return res.status(400).json({ message: 'Invalid patient name' });
    }

    // Construct query object
    const query = patientName ? { patientName } : {};

    // Fetch appointments
    const appointments = await getAppointments(query);

    // Check if appointments were found
    if (!appointments || appointments.length === 0) {
      return res.status(404).json({ message: 'No appointments found' });
    }

    // Send response
    res.status(200).json(appointments);
  } catch (error) {
    // Log and respond with error details
    console.error('Error fetching appointments:', error.message); // Log error message
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
});

router.get('/appointments/by-doctor-name', async (req, res) => {
  try {
    const { doctorName } = req.query;
    if (!doctorName) {
      return res.status(400).json({ message: 'Doctor name is required' });
    }

    const appointments = await Appointment.find({ doctorName });
    res.status(200).json(appointments);
  } catch (error) {
    console.error('Error fetching appointments:', error);
    res.status(500).json({ message: 'Server error' });
  }
});
// Route to update an existing appointment
router.put('/:id', updateAppointment);




module.exports = router;
