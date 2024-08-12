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

const updateAppointment = async (req, res) => {
  const { id } = req.params;
  const { patientName, doctorName, speciality, contact, date, time } = req.body;

  if (!patientName || !doctorName || !speciality || !contact || !date || !time) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const updatedAppointment = await Appointment.findByIdAndUpdate(id, {
      patientName,
      doctorName,
      speciality,
      contact,
      date,
      time
    }, { new: true });

    res.status(200).json(updatedAppointment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteAppointment = async (req, res) => {
  const { id } = req.params;

  try {
    await Appointment.findByIdAndDelete(id);
    res.status(200).json({ message: 'Appointment deleted successfully' });
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