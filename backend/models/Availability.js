const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const availabilitySchema = new Schema({
  doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor', required: true },
  day: { type: String, required: true }, // e.g., '2024-07-31'
  slots: [
    {
      startTime: { type: String, required: true }, // e.g., '09:00'
      endTime: { type: String, required: true }, // e.g., '10:00'
      isAvailable: { type: Boolean, default: true }
    }
  ]
});

const Availability = mongoose.model('Availability', availabilitySchema);

module.exports = Availability;
