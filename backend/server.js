const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const nodemailer = require('nodemailer');
const sessionMiddleware = require('./middleware/session'); // Import session middleware
const authRoutes = require('./routes/auth');
const doctorsRouter = require('./routes/doctors');
const appointmentRoutes = require('./routes/Appointments');
const patientsRouter = require('./routes/patient');
const availabilityRoutes = require('./routes/availability');
const adminAuthRoute = require('./routes/adminAuth');
const adminRoutes = require('./routes/adminRoutes');
const ticketRoutes = require('./routes/tickets');
const symptomsRoute = require('./routes/symptoms');
const adminRouter = require('./routes/adminRoutes'); 

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

const allowedOrigins = ['http://localhost:3000', 'https://medi-sync.netlify.app', 'https://medisync-w9rq.onrender.com'];

const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: 'GET,POST,PUT,DELETE',
  credentials: true,
};

// Middleware
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(sessionMiddleware); // Use session middleware here

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRouter);
app.use('/api/doctors', doctorsRouter);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/patients', patientsRouter);
app.use('/api/availability', availabilityRoutes);
app.use('/api/admin-auth', adminAuthRoute);
app.use('/api/tickets', ticketRoutes);
app.use('/', adminRoutes);
app.use('/api/symptoms', symptomsRoute);

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
app.use((req, res) => {
  res.status(404).send("Route not found");
});

// Error handling middleware
app.use((err, req, res) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
