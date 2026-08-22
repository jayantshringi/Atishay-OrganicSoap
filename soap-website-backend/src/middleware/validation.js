// src/middleware/validation.js

const { body, validationResult } = require('express-validator');

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      error: errors.array()[0].msg,
      details: errors.array()
    });
  }
  next();
};

const validateRegister = [
  body('email').isEmail().withMessage('Please enter a valid email address').normalizeEmail(),
  body('phone').trim().isLength({ min: 10 }).withMessage('Please enter a valid 10-digit phone number'),
  body('name').trim().notEmpty().withMessage('Full name is required'),
  body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long'),
  handleValidationErrors
];

const validateLogin = [
  body('email').isEmail().withMessage('Please enter a valid email address').normalizeEmail(),
  body('password').notEmpty().withMessage('Password is required'),
  handleValidationErrors
];

const validateQuestionnaire = [
  body('skinType').isIn(['oily', 'dry', 'combination', 'sensitive']).withMessage('Invalid skin type selected'),
  body('deliveryAddress').trim().notEmpty().withMessage('Street address is required'),
  body('deliveryCity').trim().notEmpty().withMessage('City is required'),
  body('deliveryPostalCode').trim().notEmpty().withMessage('PIN code is required'),
  handleValidationErrors
];

module.exports = {
  validateRegister,
  validateLogin,
  validateQuestionnaire
};
