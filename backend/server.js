const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const doctorsRouter = require('./routes/doctors');
const appointmentRoutes = require('./routes/appointments'); // Import the appointment routes
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', (error) => console.error('MongoDB connection error:', error));
db.once('open', () => console.log('MongoDB connected'));

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/doctors', doctorsRouter);
app.use('/api/appointments', appointmentRoutes); // Use the appointment routes

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
