const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the Symptom schema
const symptomSchema = new Schema({
  symptom: {
    type: String,
    required: true,
    unique: true // Ensure that each symptom is unique
  },
  speciality: {
    type: String,
    required: true
  }
}, {
  timestamps: true // Automatically add createdAt and updatedAt fields
});

// Create the Symptom model
const Symptom = mongoose.model('Symptom', symptomSchema);

module.exports = Symptom;
