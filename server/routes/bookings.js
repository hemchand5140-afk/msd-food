import express from 'express';
import {
  createBooking,
  getUserBookings,
  getBookingById,
  updateBookingStatus,
  cancelBooking,
  addBookingFeedback,
  checkRoomAvailability
} from '../controllers/bookingController.js';
import { auth, adminAuth } from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.get('/availability', checkRoomAvailability);

// Protected routes
router.post('/', auth, createBooking);
router.get('/my-bookings', auth, getUserBookings);
router.get('/:id', auth, getBookingById);
router.put('/:id/cancel', auth, cancelBooking);
router.put('/:id/feedback', auth, addBookingFeedback);

// Admin routes
router.put('/:id/status', auth, adminAuth, updateBookingStatus);

export default router;