// backend/routes/tickets.js
const express = require('express');
const router = express.Router();
const Ticket = require('../models/Ticket');

// Generate a new ticket
router.post('/buy', async (req, res) => {
  try {
    // Get the last ticket number
    const lastTicket = await Ticket.findOne().sort({ ticketNumber: -1 });
    const ticketNumber = lastTicket ? lastTicket.ticketNumber + 1 : 1;
    const validUntil = new Date(Date.now() + 30 * 60 * 1000); // 30 minutes from now

    const newTicket = new Ticket({
      ticketNumber,
      validUntil,
    });

    await newTicket.save();
    res.status(201).json(newTicket);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.get('/current', async (req, res) => {
    try {
      const currentTicket = await Ticket.findOne().sort({ ticketNumber: -1 });
      res.status(200).json(currentTicket || { ticketNumber: 0 });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

module.exports = router;
