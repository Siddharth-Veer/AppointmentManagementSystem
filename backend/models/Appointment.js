const mongoose = require('mongoose');

const appointmentSchema = mongoose.Schema({
  patientName: {
    type: String,
    required: true
  },
  doctorName: {
    type: String,
    required: true
  },
  speciality: {
    type: String,
    required: true
  },
  contact: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  // add a status which is active by default when created.
  status: {
    type: String,
    default: 'Active'
  }
}, {
  timestamps: true
});

const Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = Appointment;