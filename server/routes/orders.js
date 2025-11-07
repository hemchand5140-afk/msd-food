import express from 'express';
import {
  createOrder,
  getUserOrders,
  getOrderById,
  updateOrderStatus,
  cancelOrder,
  addOrderFeedback
} from '../controllers/orderController.js';
import { auth, adminAuth } from '../middleware/auth.js';

const router = express.Router();

// Protected routes
router.post('/', auth, createOrder);
router.get('/my-orders', auth, getUserOrders);
router.get('/:id', auth, getOrderById);
router.put('/:id/cancel', auth, cancelOrder);
router.put('/:id/feedback', auth, addOrderFeedback);

// Admin routes
router.put('/:id/status', auth, adminAuth, updateOrderStatus);

export default router;