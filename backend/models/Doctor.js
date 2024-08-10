const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const doctorSchema = new Schema({
  name: { type: String, required: true },
  speciality: { type: String, required: true },
  contact: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  status: { type: String, default: 'active' }
});

// Pre-save hook to hash the password before saving
doctorSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

const Doctor = mongoose.model('Doctor', doctorSchema);

module.exports = Doctor;
