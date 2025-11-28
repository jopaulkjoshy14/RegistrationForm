const express = require('express');
const User = require('../models/User');
const { validateRegistration } = require('../middleware/validation');

const router = express.Router();

// Register new user
router.post('/register', validateRegistration, async (req, res) => {
    try {
        const { fullName, email, phone, password, country, terms } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                message: 'User with this email already exists'
            });
        }

        // Create new user
        const newUser = await User.create({
            fullName,
            email,
            phone,
            password,
            country,
            termsAccepted: terms
        });

        res.status(201).json({
            message: 'User registered successfully',
            user: {
                id: newUser._id,
                fullName: newUser.fullName,
                email: newUser.email,
                country: newUser.country
            }
        });

    } catch (error) {
        console.error('Registration error:', error);
        
        if (error.name === 'ValidationError') {
            const errors = Object.values(error.errors).map(err => err.message);
            return res.status(400).json({
                message: 'Validation failed',
                errors: errors
            });
        }

        res.status(500).json({
            message: 'Error creating user',
            error: process.env.NODE_ENV === 'production' ? {} : error.message
        });
    }
});

// Get all users (for admin purposes - remove in production)
router.get('/users', async (req, res) => {
    try {
        const users = await User.find().select('-password');
        res.json({
            count: users.length,
            users
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error fetching users',
            error: process.env.NODE_ENV === 'production' ? {} : error.message
        });
    }
});

module.exports = router;