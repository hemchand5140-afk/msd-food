import mongoose from 'mongoose';

const orderItemSchema = new mongoose.Schema({
  food: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Food',
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    min: 1
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  specialInstructions: {
    type: String,
    maxlength: [500, 'Special instructions cannot exceed 500 characters']
  }
});

const OrderSchema = new mongoose.Schema({
  orderNumber: {
    type: String,
    unique: true,
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  items: [orderItemSchema],
  totalAmount: {
    type: Number,
    required: true,
    min: 0
  },
  deliveryAddress: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
    country: String
  },
  contactNumber: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'preparing', 'out-for-delivery', 'delivered', 'cancelled'],
    default: 'pending'
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid', 'failed', 'refunded'],
    default: 'pending'
  },
  paymentMethod: {
    type: String,
    enum: ['cash', 'card', 'online'],
    default: 'cash'
  },
  specialInstructions: {
    type: String,
    maxlength: [500, 'Special instructions cannot exceed 500 characters']
  },
  estimatedDelivery: {
    type: Date
  },
  deliveredAt: {
    type: Date
  },
  driver: {
    name: String,
    contact: String,
    vehicle: String
  },
  rating: {
    type: Number,
    min: 1,
    max: 5
  },
  feedback: {
    type: String,
    maxlength: [1000, 'Feedback cannot exceed 1000 characters']
  }
}, {
  timestamps: true
});

// REMOVE THIS DUPLICATE INDEX
// OrderSchema.index({ orderNumber: 1 });

// Keep these indexes (they are not duplicates)
OrderSchema.index({ user: 1, createdAt: -1 });
OrderSchema.index({ status: 1 });

// Pre-save middleware to generate order number
OrderSchema.pre('save', async function(next) {
  if (this.isNew) {
    const date = new Date();
    const timestamp = date.getTime();
    const random = Math.floor(Math.random() * 1000);
    this.orderNumber = `ORD-${timestamp}-${random}`;
    
    // Calculate total amount
    this.totalAmount = this.items.reduce((total, item) => {
      return total + (item.price * item.quantity);
    }, 0);
  }
  next();
});

export default mongoose.model('Order', OrderSchema);