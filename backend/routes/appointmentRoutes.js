const express = require('express');
const router = express.Router();
const {
  getAppointments,
  setAppointment,
  updateAppointment,
  deleteAppointment,
} = require('../controllers/appointmentController');

// Route to get appointments by patient name or all appointments
router.route('/').get(async (req, res) => {
  try {
    const { patientName } = req.query;

    // Fetch appointments based on patientName
    const query = patientName ? { patientName } : {};
    const appointments = await getAppointments(query); // Assuming getAppointments can accept a query parameter
    
    res.status(200).json(appointments);
  } catch (error) {
    console.error('Error fetching appointments:', error);
    res.status(500).json({ message: 'Server error' });
  }
})
.post(setAppointment);

router.route('/:id')
  .put(updateAppointment)
  .delete(deleteAppointment);

module.exports = router;
