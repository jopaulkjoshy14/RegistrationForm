const validator = require('validator');

const validateRegistration = (req, res, next) => {
    const { fullName, email, phone, password, country, terms } = req.body;

    const errors = [];

    // Validate fullName
    if (!fullName || fullName.trim().length < 2) {
        errors.push('Full name must be at least 2 characters long');
    }

    if (fullName && fullName.trim().length > 100) {
        errors.push('Full name cannot exceed 100 characters');
    }

    // Validate email
    if (!email || !validator.isEmail(email)) {
        errors.push('Please provide a valid email address');
    }

    // Validate phone
    if (!phone || !/^\+?[\d\s\-()]{10,}$/.test(phone)) {
        errors.push('Please provide a valid phone number');
    }

    // Validate password
    if (!password || password.length < 6) {
        errors.push('Password must be at least 6 characters long');
    }

    // Validate country
    const validCountries = ['USA', 'UK', 'Canada', 'Australia', 'Germany', 'France', 'Japan', 'Other'];
    if (!country || !validCountries.includes(country)) {
        errors.push('Please select a valid country');
    }

    // Validate terms
    if (!terms) {
        errors.push('You must accept the terms and conditions');
    }

    if (errors.length > 0) {
        return res.status(400).json({
            message: 'Validation failed',
            errors: errors
        });
    }

    next();
};

module.exports = {
    validateRegistration
};