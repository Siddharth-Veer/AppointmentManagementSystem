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
    const query = patientName ? { patientName } : {};
    const appointments = await getAppointments(query);
    res.status(200).json(appointments);
  } catch (error) {
    console.error('Error fetching appointments:', error.message); // Log error message
    res.status(500).json({ message: 'Server error' });
  }
});

router.route('/:id')
  .put(updateAppointment)
  .delete(deleteAppointment);

module.exports = router;
