import mongoose from 'mongoose';

const BookingSchema = new mongoose.Schema({
  bookingNumber: {
    type: String,
    unique: true,
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  room: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Room',
    required: true
  },
  checkIn: {
    type: Date,
    required: true
  },
  checkOut: {
    type: Date,
    required: true
  },
  guests: {
    adults: {
      type: Number,
      required: true,
      min: 1
    },
    children: {
      type: Number,
      default: 0,
      min: 0
    }
  },
  totalAmount: {
    type: Number,
    required: true,
    min: 0
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'checked-in', 'checked-out', 'cancelled'],
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
  specialRequests: {
    type: String,
    maxlength: [500, 'Special requests cannot exceed 500 characters']
  },
  guestDetails: {
    firstName: String,
    lastName: String,
    email: String,
    phone: String,
    idNumber: String,
    idType: {
      type: String,
      enum: ['passport', 'driver-license', 'national-id']
    }
  },
  roomService: {
    type: Boolean,
    default: false
  },
  breakfastIncluded: {
    type: Boolean,
    default: false
  },
  parkingRequired: {
    type: Boolean,
    default: false
  },
  checkedInAt: {
    type: Date
  },
  checkedOutAt: {
    type: Date
  },
  cancellationReason: {
    type: String,
    maxlength: [500, 'Cancellation reason cannot exceed 500 characters']
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
// BookingSchema.index({ bookingNumber: 1 });

// Keep these indexes (they are not duplicates)
BookingSchema.index({ user: 1, createdAt: -1 });
BookingSchema.index({ room: 1, checkIn: 1, checkOut: 1 });
BookingSchema.index({ status: 1 });

// Pre-save middleware to generate booking number and calculate total amount
BookingSchema.pre('save', async function(next) {
  if (this.isNew) {
    const date = new Date();
    const timestamp = date.getTime();
    const random = Math.floor(Math.random() * 1000);
    this.bookingNumber = `BKG-${timestamp}-${random}`;
  }
  
  // Calculate total amount based on nights and room price
  if (this.isModified('checkIn') || this.isModified('checkOut') || this.isNew) {
    if (this.checkIn && this.checkOut) {
      const nights = Math.ceil((this.checkOut - this.checkIn) / (1000 * 60 * 60 * 24));
      if (this.room && this.room.price) {
        this.totalAmount = nights * this.room.price;
      }
    }
  }
  next();
});

export default mongoose.model('Booking', BookingSchema);