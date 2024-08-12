const mongoose = require('mongoose');
const Doctor = require('./models/Doctor');
require('dotenv').config();
const bcrypt = require('bcrypt');

// Use the environment variable for the MongoDB connection string
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Database connected'))
  .catch(err => console.log('Database connection error: ', err));

const seedDoctors = async () => {
  try {
    // Array of doctors with various specialities
    const doctors = [
      // Cardiology
      { name: 'Dr. John Doe', speciality: 'Cardiology', contact: '123-456-7890', email: 'john.doe@example.com', password: 'password123' },
      { name: 'Dr. Alice Carter', speciality: 'Cardiology', contact: '234-567-8901', email: 'alice.carter@example.com', password: 'password123' },
      { name: 'Dr. Robert Hall', speciality: 'Cardiology', contact: '345-678-9012', email: 'robert.hall@example.com', password: 'password123' },
      { name: 'Dr. Emily Green', speciality: 'Cardiology', contact: '456-789-0123', email: 'emily.green@example.com', password: 'password123' },
      { name: 'Dr. David Lee', speciality: 'Cardiology', contact: '567-890-1234', email: 'david.lee@example.com', password: 'password123' },

      // Dermatology
      { name: 'Dr. Jane Smith', speciality: 'Dermatology', contact: '678-901-2345', email: 'jane.smith@example.com', password: 'password123' },
      { name: 'Dr. Michael Brown', speciality: 'Dermatology', contact: '789-012-3456', email: 'michael.brown@example.com', password: 'password123' },
      { name: 'Dr. Sarah Davis', speciality: 'Dermatology', contact: '890-123-4567', email: 'sarah.davis@example.com', password: 'password123' },
      { name: 'Dr. Karen Wilson', speciality: 'Dermatology', contact: '901-234-5678', email: 'karen.wilson@example.com', password: 'password123' },
      { name: 'Dr. Laura White', speciality: 'Dermatology', contact: '012-345-6789', email: 'laura.white@example.com', password: 'password123' },

      // Pediatrics
      { name: 'Dr. Emily White', speciality: 'Pediatrics', contact: '123-456-7899', email: 'emily.white@example.com', password: 'password123' },
      { name: 'Dr. Linda Lewis', speciality: 'Pediatrics', contact: '234-567-8909', email: 'linda.lewis@example.com', password: 'password123' },
      { name: 'Dr. Daniel Walker', speciality: 'Pediatrics', contact: '345-678-9019', email: 'daniel.walker@example.com', password: 'password123' },
      { name: 'Dr. Jennifer Hernandez', speciality: 'Pediatrics', contact: '456-789-0129', email: 'jennifer.hernandez@example.com', password: 'password123' },
      { name: 'Dr. William Roberts', speciality: 'Pediatrics', contact: '567-890-1239', email: 'william.roberts@example.com', password: 'password123' },

      // Neurology
      { name: 'Dr. Michael Johnson', speciality: 'Neurology', contact: '678-901-2349', email: 'michael.johnson@example.com', password: 'password123' },
      { name: 'Dr. Sarah Thompson', speciality: 'Neurology', contact: '789-012-3459', email: 'sarah.thompson@example.com', password: 'password123' },
      { name: 'Dr. Kevin Martinez', speciality: 'Neurology', contact: '890-123-4569', email: 'kevin.martinez@example.com', password: 'password123' },
      { name: 'Dr. Richard Baker', speciality: 'Neurology', contact: '901-234-5679', email: 'richard.baker@example.com', password: 'password123' },
      { name: 'Dr. Nancy King', speciality: 'Neurology', contact: '012-345-6789', email: 'nancy.king@example.com', password: 'password123' },

      // Orthopedics
      { name: 'Dr. Alex Brown', speciality: 'Orthopedics', contact: '123-456-7891', email: 'alex.brown@example.com', password: 'password123' },
      { name: 'Dr. Susan Wright', speciality: 'Orthopedics', contact: '234-567-8902', email: 'susan.wright@example.com', password: 'password123' },
      { name: 'Dr. Paul Scott', speciality: 'Orthopedics', contact: '345-678-9013', email: 'paul.scott@example.com', password: 'password123' },
      { name: 'Dr. Maria Green', speciality: 'Orthopedics', contact: '456-789-0124', email: 'maria.green@example.com', password: 'password123' },
      { name: 'Dr. Steven Allen', speciality: 'Orthopedics', contact: '567-890-1235', email: 'steven.allen@example.com', password: 'password123' },

      // Gastroenterology
      { name: 'Dr. David Martinez', speciality: 'Gastroenterology', contact: '678-901-2346', email: 'david.martinez@example.com', password: 'password123' },
      { name: 'Dr. Laura Wilson', speciality: 'Gastroenterology', contact: '789-012-3457', email: 'laura.wilson@example.com', password: 'password123' },
      { name: 'Dr. James Clark', speciality: 'Gastroenterology', contact: '890-123-4568', email: 'james.clark@example.com', password: 'password123' },
      { name: 'Dr. Lisa Adams', speciality: 'Gastroenterology', contact: '901-234-5678', email: 'lisa.adams@example.com', password: 'password123' },
      { name: 'Dr. Robert Young', speciality: 'Gastroenterology', contact: '012-345-6788', email: 'robert.young@example.com', password: 'password123' },

      // Oncology
      { name: 'Dr. Charles Perez', speciality: 'Oncology', contact: '123-456-7892', email: 'charles.perez@example.com', password: 'password123' },
      { name: 'Dr. Barbara Jackson', speciality: 'Oncology', contact: '234-567-8903', email: 'barbara.jackson@example.com', password: 'password123' },
      { name: 'Dr. Kevin Martinez', speciality: 'Oncology', contact: '345-678-9014', email: 'kevin.martinez@example.com', password: 'password123' },
      { name: 'Dr. Jennifer White', speciality: 'Oncology', contact: '456-789-0125', email: 'jennifer.white@example.com', password: 'password123' },
      { name: 'Dr. William Johnson', speciality: 'Oncology', contact: '567-890-1236', email: 'william.johnson@example.com', password: 'password123' },
    ];

     // Clear existing doctors and insert new ones
     await Doctor.deleteMany({});
    
     // Insert doctors into the database
     await Doctor.insertMany(doctors);
 
     console.log('Doctors collection has been populated!');
     mongoose.connection.close();
   } catch (error) {
     console.error('Error seeding doctors:', error);
     mongoose.connection.close();
   }
 };

seedDoctors();
