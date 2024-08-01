const express = require('express');
const router = express.Router(); // Ensure router is defined here
const Doctor = require('../models/Doctor');
const bcrypt = require('bcrypt');

// POST /api/doctors/signin - Sign in a doctor
router.post('/signin', async (req, res) => {
    try {
        const { email, password } = req.body;
        const doctor = await Doctor.findOne({ email });

        if (!doctor) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const isMatch = await bcrypt.compare(password, doctor.password);

        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Here you can generate and return a session token or similar
        res.status(200).json({ message: 'Sign in successful' });

    } catch (error) {
        console.error('Error signing in doctor:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
