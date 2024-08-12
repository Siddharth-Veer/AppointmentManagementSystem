const mongoose = require('mongoose');
const Symptom = require('./models/Symptom'); // Ensure the path is correct
require('dotenv').config(); // Adjust the path if needed

// Use the environment variable for the MongoDB connection string
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Database connected'))
  .catch(err => console.log('Database connection error: ', err));

const seedSymptoms = async () => {
  try {
    // Array of symptoms with their associated specialities
    const symptoms = [
      // Cardiology
      { symptom: 'Chest Pain', speciality: 'Cardiology' },
      { symptom: 'Shortness of Breath', speciality: 'Cardiology' },
      { symptom: 'Palpitations', speciality: 'Cardiology' },
      { symptom: 'Swelling in Legs', speciality: 'Cardiology' },

      // Dermatology
      { symptom: 'Skin Rash', speciality: 'Dermatology' },
      { symptom: 'Itchy Skin', speciality: 'Dermatology' },
      { symptom: 'Acne', speciality: 'Dermatology' },
      { symptom: 'Dry Skin', speciality: 'Dermatology' },

      // Pediatrics
      { symptom: 'Fever', speciality: 'Pediatrics' },
      { symptom: 'Cough', speciality: 'Pediatrics' },
      { symptom: 'Vomiting', speciality: 'Pediatrics' },
      { symptom: 'Diarrhea', speciality: 'Pediatrics' },

      // Neurology
      { symptom: 'Headache', speciality: 'Neurology' },
      { symptom: 'Seizures', speciality: 'Neurology' },
      { symptom: 'Dizziness', speciality: 'Neurology' },
      { symptom: 'Numbness', speciality: 'Neurology' },

      // Orthopedics
      { symptom: 'Joint Pain', speciality: 'Orthopedics' },
      { symptom: 'Back Pain', speciality: 'Orthopedics' },
      { symptom: 'Fracture', speciality: 'Orthopedics' },
      { symptom: 'Stiffness', speciality: 'Orthopedics' },

      // Gastroenterology
      { symptom: 'Abdominal Pain', speciality: 'Gastroenterology' },
      { symptom: 'Nausea', speciality: 'Gastroenterology' },
      { symptom: 'Heartburn', speciality: 'Gastroenterology' },
      { symptom: 'Diarrhea', speciality: 'Gastroenterology' },

      // Oncology
      { symptom: 'Unexplained Weight Loss', speciality: 'Oncology' },
      { symptom: 'Persistent Cough', speciality: 'Oncology' },
      { symptom: 'Blood in Urine', speciality: 'Oncology' },
      { symptom: 'Fatigue', speciality: 'Oncology' }
    ];

    // Clear existing symptoms and insert new ones
    await Symptom.deleteMany({});
    await Symptom.insertMany(symptoms);

    console.log('Symptoms collection has been populated!');
    mongoose.connection.close();
  } catch (error) {
    console.error('Error seeding symptoms:', error);
    mongoose.connection.close();
  }
};

seedSymptoms();
