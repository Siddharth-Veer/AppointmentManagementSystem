// backend/models/Ticket.js
const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
  ticketNumber: { type: Number, required: true },
  issuedAt: { type: Date, default: Date.now },
  validUntil: { type: Date, required: true },
});

module.exports = mongoose.model('Ticket', ticketSchema);
