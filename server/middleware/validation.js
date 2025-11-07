import { body, validationResult } from 'express-validator';

// Validation rules
export const registerValidation = [
  body('username')
    .isLength({ min: 3 })
    .withMessage('Username must be at least 3 characters long')
    .isAlphanumeric()
    .withMessage('Username must contain only letters and numbers')
    .trim(),
  
  body('email')
    .isEmail()
    .withMessage('Please provide a valid email')
    .normalizeEmail(),
  
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long')
];

export const loginValidation = [
  body('email')
    .isEmail()
    .withMessage('Please provide a valid email')
    .normalizeEmail(),
  
  body('password')
    .notEmpty()
    .withMessage('Password is required')
];

export const foodValidation = [
  body('name')
    .notEmpty()
    .withMessage('Food name is required')
    .isLength({ min: 2 })
    .withMessage('Food name must be at least 2 characters long'),
  
  body('description')
    .notEmpty()
    .withMessage('Description is required')
    .isLength({ min: 10 })
    .withMessage('Description must be at least 10 characters long'),
  
  body('price')
    .isFloat({ min: 0 })
    .withMessage('Price must be a positive number'),
  
  body('category')
    .isIn(['appetizer', 'main-course', 'dessert', 'beverage', 'vegetarian', 'non-vegetarian'])
    .withMessage('Invalid category')
];

export const roomValidation = [
  body('roomNumber')
    .notEmpty()
    .withMessage('Room number is required'),
  
  body('type')
    .isIn(['single', 'double', 'suite', 'deluxe'])
    .withMessage('Invalid room type'),
  
  body('price')
    .isFloat({ min: 0 })
    .withMessage('Price must be a positive number'),
  
  body('capacity')
    .isInt({ min: 1 })
    .withMessage('Capacity must be at least 1')
];

// Validation result middleware
export const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array().map(err => ({
        field: err.param,
        message: err.msg,
        value: err.value
      }))
    });
  }
  next();
};