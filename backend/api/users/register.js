const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Assuming you have a User model defined

router.post('/register', async (req, res) => {
    const { idNo, date, managingDirector, branch, name, placeOfBirth, dateOfBirth, address, state, city, zipCode, country, maritalStatus, nationality, nationalIdNo, gender, status, region, idNoAlt, phone, email } = req.body;

    try {
        const newUser = new User({
            idNo,
            date,
            managingDirector,
            branch,
            name,
            placeOfBirth,
            dateOfBirth,
            address,
            state,
            city,
            zipCode,
            country,
            maritalStatus,
            nationality,
            nationalIdNo,
            gender,
            status,
            region,
            idNoAlt,
            phone,
            email
        });

        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        console.error('Error saving user:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
