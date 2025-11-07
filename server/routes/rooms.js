import express from 'express';
import {
  getRooms,
  getRoomById,
  createRoom,
  updateRoom,
  deleteRoom,
  checkAvailability,
  getRoomTypes,
  seedRooms
} from '../controllers/roomController.js';
import { auth, adminAuth } from '../middleware/auth.js';
import { roomValidation, handleValidationErrors } from '../middleware/validation.js';

const router = express.Router();

// Public routes
router.get('/', getRooms);
router.get('/types', getRoomTypes);
router.get('/:id', getRoomById);
router.get('/:id/availability', checkAvailability);

// Development route for seeding data
router.post('/seed', seedRooms);

// Admin routes
router.post('/', auth, adminAuth, roomValidation, handleValidationErrors, createRoom);
router.put('/:id', auth, adminAuth, roomValidation, handleValidationErrors, updateRoom);
router.delete('/:id', auth, adminAuth, deleteRoom);

export default router;