// models/Doctor.js
const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  speciality: { type: String, required: true },
  contact: { type: String, required: true },
  profilePicture: { type: String, required: true },
  location: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
  },
});

const Doctor = mongoose.model('Doctor', doctorSchema);
module.exports = Doctor;
