import mongoose from 'mongoose';

const RoomSchema = new mongoose.Schema({
  roomNumber: {
    type: String,
    required: [true, 'Room number is required'],
    unique: true,
    trim: true,
    uppercase: true
  },
  type: {
    type: String,
    required: [true, 'Room type is required'],
    enum: {
      values: ['single', 'double', 'suite', 'deluxe'],
      message: 'Invalid room type'
    }
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: [0, 'Price cannot be negative']
  },
  capacity: {
    type: Number,
    required: [true, 'Capacity is required'],
    min: [1, 'Capacity must be at least 1']
  },
  size: {
    type: String, // e.g., "300 sq ft"
    required: true
  },
  amenities: [{
    type: String,
    trim: true
  }],
  image: {
    type: String,
    default: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400'
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    maxlength: [1000, 'Description cannot exceed 1000 characters']
  },
  features: [{
    type: String,
    trim: true
  }],
  isAvailable: {
    type: Boolean,
    default: true
  },
  bedType: {
    type: String,
    enum: ['single', 'double', 'queen', 'king', 'twin'],
    required: true
  },
  view: {
    type: String,
    enum: ['garden', 'city', 'ocean', 'mountain', 'pool'],
    default: 'city'
  },
  smoking: {
    type: Boolean,
    default: false
  },
  wifi: {
    type: Boolean,
    default: true
  },
  airConditioning: {
    type: Boolean,
    default: true
  },
  television: {
    type: Boolean,
    default: true
  },
  minibar: {
    type: Boolean,
    default: false
  },
  roomService: {
    type: Boolean,
    default: true
  },
  rating: {
    average: {
      type: Number,
      default: 0,
      min: 0,
      max: 5
    },
    count: {
      type: Number,
      default: 0
    }
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
});

// Index for better query performance
RoomSchema.index({ type: 1, isAvailable: 1 });
RoomSchema.index({ price: 1 });
RoomSchema.index({ 'rating.average': -1 });

// Virtual for formatted room type
RoomSchema.virtual('formattedType').get(function() {
  return this.type.charAt(0).toUpperCase() + this.type.slice(1) + ' Room';
});

export default mongoose.model('Room', RoomSchema);