const express = require('express');
const router = express.Router();
const Symptom = require('../models/symptom'); // Adjust the path as needed

// GET /api/symptoms
router.get('/', async (req, res) => {
    try {
        const symptoms = await Symptom.find();
        res.json(symptoms);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching symptoms' });
    }
});

module.exports = router;
