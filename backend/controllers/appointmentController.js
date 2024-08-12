const Appointment = require('../models/Appointment');

// Get all appointments
const getAppointments = async (query = {}) => {
  try {
    return await Appointment.find(query);
  } catch (error) {
    throw new Error('Error fetching appointments');
  }
};

// Create a new appointment
const setAppointment = async (req, res) => {
  const { patientName, doctorName, speciality, contact, date, time } = req.body;

  if (!patientName || !doctorName || !speciality || !contact || !date || !time) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const newAppointment = new Appointment({
      patientName,
      doctorName,
      speciality,
      contact,
      date,
      time
    });

    const savedAppointment = await newAppointment.save();
    res.status(201).json(savedAppointment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAppointments,
  setAppointment,
  updateAppointment,
  deleteAppointment,
};