import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  comment: {
    type: String,
    maxlength: [500, 'Comment cannot exceed 500 characters']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const FoodSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Food name is required'],
    trim: true,
    maxlength: [100, 'Food name cannot exceed 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    maxlength: [1000, 'Description cannot exceed 1000 characters']
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: [0, 'Price cannot be negative']
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: {
      values: ['appetizer', 'main-course', 'dessert', 'beverage', 'vegetarian', 'non-vegetarian'],
      message: 'Invalid category'
    }
  },
  image: {
    type: String,
    default: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400'
  },
  ingredients: [{
    type: String,
    trim: true
  }],
  preparationTime: {
    type: Number, // in minutes
    required: [true, 'Preparation time is required'],
    min: [1, 'Preparation time must be at least 1 minute']
  },
  isAvailable: {
    type: Boolean,
    default: true
  },
  isVegetarian: {
    type: Boolean,
    default: false
  },
  isVegan: {
    type: Boolean,
    default: false
  },
  isGlutenFree: {
    type: Boolean,
    default: false
  },
  spiceLevel: {
    type: String,
    enum: ['mild', 'medium', 'hot', 'extra-hot'],
    default: 'mild'
  },
  nutritionalInfo: {
    calories: Number,
    protein: Number, // in grams
    carbs: Number,   // in grams
    fat: Number      // in grams
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
  reviews: [reviewSchema],
  tags: [String],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
});

// Index for better query performance
FoodSchema.index({ category: 1, isAvailable: 1 });
FoodSchema.index({ price: 1 });
FoodSchema.index({ 'rating.average': -1 });

// Calculate average rating before saving
FoodSchema.pre('save', function(next) {
  if (this.reviews.length > 0) {
    const total = this.reviews.reduce((sum, review) => sum + review.rating, 0);
    this.rating.average = total / this.reviews.length;
    this.rating.count = this.reviews.length;
  }
  next();
});

export default mongoose.model('Food', FoodSchema);