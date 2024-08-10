const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const nodemailer = require('nodemailer');
const authRoutes = require('./routes/auth');
const doctorsRouter = require('./routes/doctors');
const appointmentRoutes = require('./routes/appointments');
const Appointment = require('./models/Appointment'); // Import the model if needed
const patientsRouter = require('./routes/patient');
const sessionMiddleware = require('./middleware/session');
const availabilityRoutes = require('./routes/availability');
const adminAuthRoute = require('./routes/adminAuth');
const adminRoutes = require('./routes/adminRoutes');
// Add this line to import and use the tickets route
const ticketRoutes = require('./routes/tickets');

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
app.use('/api/appointments', appointmentRoutes);
app.use('/api/patients', patientsRouter);
app.use('/api/login', authRoutes);
app.use('/api/availability', availabilityRoutes);
app.use('/', adminRoutes);
app.use('/api/admin-auth', adminAuthRoute);
app.use('/api/tickets', ticketRoutes);


// Email endpoint (example for testing)
app.post('/api/send-test-email', async (req, res) => {
  const { to, subject, text } = req.body;

  const mailOptions = {
    from: 'medisyncproject@gmail.com',
    to,
    subject,
    text
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).send('Email sent successfully');
  } catch (error) {
    res.status(500).send('Error sending email');
  }
});

// 404 handler for undefined routes
app.use((req, res, next) => {
  res.status(404).send("Route not found");
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
