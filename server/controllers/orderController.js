import Order from '../models/Order.js';
import Food from '../models/Food.js';

// Create new order
export const createOrder = async (req, res) => {
  try {
    const { items, deliveryAddress, contactNumber, specialInstructions, paymentMethod } = req.body;

    // Validate items and calculate total
    let totalAmount = 0;
    const orderItems = [];

    for (const item of items) {
      const food = await Food.findById(item.food);
      if (!food) {
        return res.status(400).json({
          success: false,
          message: `Food item with ID ${item.food} not found`
        });
      }

      if (!food.isAvailable) {
        return res.status(400).json({
          success: false,
          message: `Food item ${food.name} is not available`
        });
      }

      const itemTotal = food.price * item.quantity;
      totalAmount += itemTotal;

      orderItems.push({
        food: food._id,
        quantity: item.quantity,
        price: food.price,
        specialInstructions: item.specialInstructions
      });
    }

    // Create order
    const order = new Order({
      user: req.user._id,
      items: orderItems,
      totalAmount,
      deliveryAddress,
      contactNumber,
      specialInstructions,
      paymentMethod,
      estimatedDelivery: new Date(Date.now() + 45 * 60 * 1000) // 45 minutes from now
    });

    await order.save();
    await order.populate('items.food', 'name image');
    await order.populate('user', 'username email profile');

    res.status(201).json({
      success: true,
      message: 'Order created successfully',
      data: order
    });
  } catch (error) {
    console.error('Create order error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while creating order'
    });
  }
};

// Get user orders
export const getUserOrders = async (req, res) => {
  try {
    const { page = 1, limit = 10, status } = req.query;

    const filter = { user: req.user._id };
    if (status) filter.status = status;

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const orders = await Order.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit))
      .populate('items.food', 'name image price')
      .populate('user', 'username email profile');

    const total = await Order.countDocuments(filter);
    const totalPages = Math.ceil(total / parseInt(limit));

    res.json({
      success: true,
      data: orders,
      pagination: {
        current: parseInt(page),
        total: totalPages,
        totalItems: total,
        hasNext: parseInt(page) < totalPages,
        hasPrev: parseInt(page) > 1
      }
    });
  } catch (error) {
    console.error('Get user orders error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching orders'
    });
  }
};

// Get order by ID
export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findOne({
      _id: req.params.id,
      user: req.user._id
    })
      .populate('items.food', 'name image price description')
      .populate('user', 'username email profile');

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    res.json({
      success: true,
      data: order
    });
  } catch (error) {
    console.error('Get order by ID error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching order'
    });
  }
};

// Update order status (Admin only)
export const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { 
        status,
        ...(status === 'delivered' && { deliveredAt: new Date() })
      },
      { new: true, runValidators: true }
    )
      .populate('items.food', 'name image price')
      .populate('user', 'username email profile');

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    res.json({
      success: true,
      message: 'Order status updated successfully',
      data: order
    });
  } catch (error) {
    console.error('Update order status error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while updating order status'
    });
  }
};

// Cancel order
export const cancelOrder = async (req, res) => {
  try {
    const order = await Order.findOne({
      _id: req.params.id,
      user: req.user._id
    });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    // Only allow cancellation for pending or confirmed orders
    if (!['pending', 'confirmed'].includes(order.status)) {
      return res.status(400).json({
        success: false,
        message: 'Order cannot be cancelled at this stage'
      });
    }

    order.status = 'cancelled';
    await order.save();

    res.json({
      success: true,
      message: 'Order cancelled successfully',
      data: order
    });
  } catch (error) {
    console.error('Cancel order error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while cancelling order'
    });
  }
};

// Add rating and feedback to order
export const addOrderFeedback = async (req, res) => {
  try {
    const { rating, feedback } = req.body;

    const order = await Order.findOne({
      _id: req.params.id,
      user: req.user._id,
      status: 'delivered'
    });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found or not delivered'
      });
    }

    order.rating = rating;
    order.feedback = feedback;
    await order.save();

    res.json({
      success: true,
      message: 'Feedback added successfully',
      data: order
    });
  } catch (error) {
    console.error('Add order feedback error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while adding feedback'
    });
  }
};