const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const doctorSchema = new Schema({
  name: { type: String, required: true },
  speciality: { type: String, required: true },
  contact: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  status: { type: String, default: 'active' }

});

const Doctor = mongoose.model('Doctor', doctorSchema);

module.exports = Doctor;