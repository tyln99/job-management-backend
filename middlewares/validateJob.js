const { body, validationResult } = require('express-validator');

const validateJob = [
  // Validate title
  body('title').notEmpty().withMessage('Title is required'),

  // Validate description
  body('description').notEmpty().withMessage('Description is required'),

  // Validate expiry_date
  body('expiry_date').notEmpty().withMessage('Expiry date is required'),

  // Custom validation to ensure expiry_date is a valid date
  body('expiry_date').custom((value, { req }) => {
    if (!Date.parse(value)) {
      throw new Error('Expiry date must be a valid date');
    }
    return true;
  }),

  // Handle validation errors
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

module.exports = { validateJob };
