const Appointment = require('../models/Appointment');

// Get all appointments
const getAppointments = async (req, res) => {
  const { patientName, doctorName } = req.query;

  // Build the query object dynamically based on provided query parameters
  const query = {};
  if (patientName) query.patientName = patientName;
  if (doctorName) query.doctorName = doctorName;

  try {
    const appointments = await Appointment.find(query);
    res.json(appointments);
  } catch (error) {
    console.error('Error fetching appointments:', error);
    res.status(500).send('Server error');
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
  const { date, time, status } = req.body;

  try {
    const updateData = {};
    if (date) updateData.date = date;
    if (time) updateData.time = time;
    if (status) updateData.status = status;

    const updatedAppointment = await Appointment.findByIdAndUpdate(
      id,
      updateData,
      { new: true }
    );

    if (!updatedAppointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    res.status(200).json(updatedAppointment);
  } catch (error) {
    console.error('Error updating appointment:', error);
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
