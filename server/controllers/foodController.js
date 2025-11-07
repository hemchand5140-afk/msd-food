import Food from '../models/Food.js';

// Get all foods with filtering and pagination
export const getFoods = async (req, res) => {
  try {
    const {
      category,
      search,
      minPrice,
      maxPrice,
      vegetarian,
      vegan,
      glutenFree,
      page = 1,
      limit = 10,
      sortBy = 'createdAt',
      sortOrder = 'desc'
    } = req.query;

    // Build filter object
    const filter = { isAvailable: true };
    
    if (category && category !== 'all') {
      filter.category = category;
    }
    
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { ingredients: { $in: [new RegExp(search, 'i')] } }
      ];
    }
    
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = parseFloat(minPrice);
      if (maxPrice) filter.price.$lte = parseFloat(maxPrice);
    }
    
    if (vegetarian === 'true') filter.isVegetarian = true;
    if (vegan === 'true') filter.isVegan = true;
    if (glutenFree === 'true') filter.isGlutenFree = true;

    // Build sort object
    const sort = {};
    sort[sortBy] = sortOrder === 'desc' ? -1 : 1;

    // Calculate pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);

    // Execute query
    const foods = await Food.find(filter)
      .sort(sort)
      .skip(skip)
      .limit(parseInt(limit))
      .populate('createdBy', 'username');

    const total = await Food.countDocuments(filter);
    const totalPages = Math.ceil(total / parseInt(limit));

    res.json({
      success: true,
      data: foods,
      pagination: {
        current: parseInt(page),
        total: totalPages,
        totalItems: total,
        hasNext: parseInt(page) < totalPages,
        hasPrev: parseInt(page) > 1
      }
    });
  } catch (error) {
    console.error('Get foods error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching foods'
    });
  }
};

// Get single food by ID
export const getFoodById = async (req, res) => {
  try {
    const food = await Food.findById(req.params.id)
      .populate('createdBy', 'username')
      .populate('reviews.user', 'username profile');

    if (!food) {
      return res.status(404).json({
        success: false,
        message: 'Food not found'
      });
    }

    res.json({
      success: true,
      data: food
    });
  } catch (error) {
    console.error('Get food by ID error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching food'
    });
  }
};

// Create new food (Admin only)
export const createFood = async (req, res) => {
  try {
    const foodData = {
      ...req.body,
      createdBy: req.user._id
    };

    const food = new Food(foodData);
    await food.save();

    await food.populate('createdBy', 'username');

    res.status(201).json({
      success: true,
      message: 'Food created successfully',
      data: food
    });
  } catch (error) {
    console.error('Create food error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while creating food'
    });
  }
};

// Update food (Admin only)
export const updateFood = async (req, res) => {
  try {
    const food = await Food.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('createdBy', 'username');

    if (!food) {
      return res.status(404).json({
        success: false,
        message: 'Food not found'
      });
    }

    res.json({
      success: true,
      message: 'Food updated successfully',
      data: food
    });
  } catch (error) {
    console.error('Update food error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while updating food'
    });
  }
};

// Delete food (Admin only)
export const deleteFood = async (req, res) => {
  try {
    const food = await Food.findByIdAndDelete(req.params.id);

    if (!food) {
      return res.status(404).json({
        success: false,
        message: 'Food not found'
      });
    }

    res.json({
      success: true,
      message: 'Food deleted successfully'
    });
  } catch (error) {
    console.error('Delete food error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while deleting food'
    });
  }
};

// Add review to food
export const addReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const food = await Food.findById(req.params.id);

    if (!food) {
      return res.status(404).json({
        success: false,
        message: 'Food not found'
      });
    }

    // Check if user already reviewed
    const existingReview = food.reviews.find(
      review => review.user.toString() === req.user._id.toString()
    );

    if (existingReview) {
      return res.status(400).json({
        success: false,
        message: 'You have already reviewed this food'
      });
    }

    // Add review
    food.reviews.push({
      user: req.user._id,
      rating,
      comment
    });

    await food.save();
    await food.populate('reviews.user', 'username profile');

    res.json({
      success: true,
      message: 'Review added successfully',
      data: food
    });
  } catch (error) {
    console.error('Add review error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while adding review'
    });
  }
};

// Get food categories
export const getCategories = async (req, res) => {
  try {
    const categories = await Food.distinct('category');
    
    res.json({
      success: true,
      data: categories
    });
  } catch (error) {
    console.error('Get categories error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching categories'
    });
  }
};

// Seed demo foods (for development)
export const seedFoods = async (req, res) => {
  try {
    const demoFoods = [
      {
        name: 'Margherita Pizza',
        description: 'Classic pizza with tomato sauce, fresh mozzarella, and basil',
        price: 12.99,
        category: 'main-course',
        image: 'https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?w=400',
        ingredients: ['Tomato sauce', 'Mozzarella', 'Basil', 'Olive oil'],
        preparationTime: 20,
        isVegetarian: true,
        spiceLevel: 'mild'
      },
      {
        name: 'Caesar Salad',
        description: 'Fresh romaine lettuce with Caesar dressing, croutons, and parmesan',
        price: 8.99,
        category: 'appetizer',
        image: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=400',
        ingredients: ['Romaine lettuce', 'Caesar dressing', 'Croutons', 'Parmesan'],
        preparationTime: 10,
        isVegetarian: true,
        spiceLevel: 'mild'
      },
      {
        name: 'Grilled Salmon',
        description: 'Fresh salmon grilled to perfection with herbs and lemon',
        price: 18.99,
        category: 'main-course',
        image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400',
        ingredients: ['Salmon', 'Herbs', 'Lemon', 'Olive oil'],
        preparationTime: 25,
        isVegetarian: false,
        spiceLevel: 'mild'
      },
      {
        name: 'Chocolate Lava Cake',
        description: 'Warm chocolate cake with a molten chocolate center, served with vanilla ice cream',
        price: 6.99,
        category: 'dessert',
        image: 'https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=400',
        ingredients: ['Chocolate', 'Flour', 'Eggs', 'Butter', 'Sugar'],
        preparationTime: 15,
        isVegetarian: true,
        spiceLevel: 'mild'
      },
      {
        name: 'Fresh Orange Juice',
        description: 'Freshly squeezed orange juice, served chilled',
        price: 3.99,
        category: 'beverage',
        image: 'https://images.unsplash.com/photo-1613478223719-2ab802602423?w=400',
        ingredients: ['Fresh oranges'],
        preparationTime: 5,
        isVegetarian: true,
        isVegan: true,
        spiceLevel: 'mild'
      },
      {
        name: 'Vegetable Stir Fry',
        description: 'Mixed vegetables stir-fried in a savory sauce with tofu',
        price: 10.99,
        category: 'vegetarian',
        image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=400',
        ingredients: ['Broccoli', 'Carrots', 'Bell peppers', 'Tofu', 'Soy sauce'],
        preparationTime: 15,
        isVegetarian: true,
        isVegan: true,
        spiceLevel: 'medium'
      }
    ];

    // Clear existing foods and insert demo data
    await Food.deleteMany({});
    const foods = await Food.insertMany(demoFoods);

    res.json({
      success: true,
      message: 'Demo foods seeded successfully',
      data: foods
    });
  } catch (error) {
    console.error('Seed foods error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while seeding foods'
    });
  }
};