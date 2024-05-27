const mongoose = require('mongoose');

const appointmentSchema = mongoose.Schema({
  date: {
    type: Date,
    required: true
  },
  clientName: {
    type: String,
    required: true
  },
  service: {
    type: String,
    required: true
  },
}, {
  timestamps: true
});

const Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = Appointment;
