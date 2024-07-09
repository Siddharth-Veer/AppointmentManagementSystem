const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  idNo: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  dateOfBirth: { type: Date, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', UserSchema);
