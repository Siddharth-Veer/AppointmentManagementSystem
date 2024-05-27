const asyncHandler = require('express-async-handler');

// @desc    Get all appointments
// @route   GET /api/appointments
// @access  Public
const getAppointments = asyncHandler(async (req, res) => {
  res.status(200).json({ message: 'Get all appointments' });
});

// @desc    Set an appointment
// @route   POST /api/appointments
// @access  Public
const setAppointment = asyncHandler(async (req, res) => {
  res.status(200).json({ message: 'Set an appointment' });
});

// @desc    Update an appointment
// @route   PUT /api/appointments/:id
// @access  Public
const updateAppointment = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `Update appointment ${req.params.id}` });
});

// @desc    Delete an appointment
// @route   DELETE /api/appointments/:id
// @access  Public
const deleteAppointment = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `Delete appointment ${req.params.id}` });
});

module.exports = {
  getAppointments,
  setAppointment,
  updateAppointment,
  deleteAppointment,
};
