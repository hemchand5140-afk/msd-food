import express from 'express';
import {
  getFoods,
  getFoodById,
  createFood,
  updateFood,
  deleteFood,
  addReview,
  getCategories,
  seedFoods
} from '../controllers/foodController.js';
import { auth, adminAuth } from '../middleware/auth.js';
import { foodValidation, handleValidationErrors } from '../middleware/validation.js';

const router = express.Router();

// Public routes
router.get('/', getFoods);
router.get('/categories', getCategories);
router.get('/:id', getFoodById);

// Development route for seeding data
router.post('/seed', seedFoods);

// Protected routes
router.post('/:id/reviews', auth, addReview);

// Admin routes
router.post('/', auth, adminAuth, foodValidation, handleValidationErrors, createFood);
router.put('/:id', auth, adminAuth, foodValidation, handleValidationErrors, updateFood);
router.delete('/:id', auth, adminAuth, deleteFood);

export default router;