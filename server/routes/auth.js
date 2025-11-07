import express from 'express';
import {
  register,
  login,
  getCurrentUser,
  updateProfile,
  changePassword
} from '../controllers/authController.js';
import { auth } from '../middleware/auth.js';
import {
  registerValidation,
  loginValidation,
  handleValidationErrors
} from '../middleware/validation.js';

const router = express.Router();

// Public routes
router.post('/register', registerValidation, handleValidationErrors, register);
router.post('/login', loginValidation, handleValidationErrors, login);

// Protected routes
router.get('/me', auth, getCurrentUser);
router.put('/profile', auth, updateProfile);
router.put('/change-password', auth, changePassword);

export default router;