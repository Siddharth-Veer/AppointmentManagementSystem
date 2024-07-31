const mongoose = require('mongoose');
const Doctor = require('./models/Doctor'); // Adjust path as per your project structure
const connectDB = require('./config/db'); // Import your MongoDB connection function

// Connect to MongoDB
connectDB();

// Sample doctor data
const doctors = [
    {
      name: 'Dr. Nishant Clinician',
      speciality: 'Pediatrics',
      contact: '123-456-7890',
      profilePicture: 'doctor1.jpg',
      location: { lat: 37.7749, lng: -122.4194 },
    },
    {
      name: 'Dr. John Doe',
      speciality: 'Cardiology',
      contact: '234-567-8901',
      profilePicture: 'doctor2.jpg',
      location: { lat: 34.0522, lng: -118.2437 },
    },
    {
      name: 'Dr. Jane Smith',
      speciality: 'Dermatology',
      contact: '345-678-9012',
      profilePicture: 'doctor3.jpg',
      location: { lat: 40.7128, lng: -74.006 },
    },
    {
      name: 'Dr. Alex Johnson',
      speciality: 'Neurology',
      contact: '456-789-0123',
      profilePicture: 'doctor4.jpg',
      location: { lat: 51.5074, lng: -0.1278 },
    },
    {
      name: 'Dr. Emily Brown',
      speciality: 'Orthopedics',
      contact: '567-890-1234',
      profilePicture: 'doctor5.jpg',
      location: { lat: 48.8566, lng: 2.3522 },
    },
    {
      name: 'Dr. Michael White',
      speciality: 'Psychiatry',
      contact: '678-901-2345',
      profilePicture: 'doctor6.jpg',
      location: { lat: 35.6895, lng: 139.6917 },
    },
  ];

const insertDoctors = async () => {
  try {
    // Insert doctors into MongoDB
    const insertedDoctors = await Doctor.insertMany(doctors);
    console.log('Doctors inserted:', insertedDoctors);
  } catch (error) {
    console.error('Error inserting doctors:', error);
  } finally {
    // Close the connection after inserting
    mongoose.connection.close();
  }
};

// Call function to insert doctors
insertDoctors();
