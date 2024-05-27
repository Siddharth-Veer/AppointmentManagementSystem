const asyncHandler = require('express-async-handler');
const Appointment = require('../models/appointmentModel');

const getAppointments = asyncHandler(async (req, res) => {
  const appointments = await Appointment.find({});
  res.json(appointments);
});

const createAppointment = asyncHandler(async (req, res) => {
  const { date, clientName, service } = req.body;
  const appointment = new Appointment({ date, clientName, service });
  const createdAppointment = await appointment.save();
  res.status(201).json(createdAppointment);
});

module.exports = { getAppointments, createAppointment };
