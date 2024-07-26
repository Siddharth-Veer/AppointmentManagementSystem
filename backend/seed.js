// seed.js
const mongoose = require('mongoose');
const Doctor = require('./models/Doctor');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', (error) => console.error('MongoDB connection error:', error));
db.once('open', async () => {
  console.log('MongoDB connected');

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
      location: { lat: 40.7128, lng: -74.0060 },
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

  try {
    await Doctor.insertMany(doctors);
    console.log('Doctors data inserted successfully');
  } catch (error) {
    console.error('Error inserting doctors data:', error);
  } finally {
    mongoose.connection.close();
  }
});
