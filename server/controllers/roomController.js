import Room from '../models/Room.js';
import Booking from '../models/Booking.js';

// Get all rooms with filtering and pagination
export const getRooms = async (req, res) => {
  try {
    const {
      type,
      minPrice,
      maxPrice,
      capacity,
      available,
      page = 1,
      limit = 10,
      sortBy = 'price',
      sortOrder = 'asc'
    } = req.query;

    // Build filter object
    const filter = {};
    
    if (type && type !== 'all') {
      filter.type = type;
    }
    
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = parseFloat(minPrice);
      if (maxPrice) filter.price.$lte = parseFloat(maxPrice);
    }
    
    if (capacity) {
      filter.capacity = { $gte: parseInt(capacity) };
    }
    
    if (available === 'true') {
      filter.isAvailable = true;
    }

    // Build sort object
    const sort = {};
    sort[sortBy] = sortOrder === 'desc' ? -1 : 1;

    // Calculate pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);

    // Execute query
    const rooms = await Room.find(filter)
      .sort(sort)
      .skip(skip)
      .limit(parseInt(limit))
      .populate('createdBy', 'username');

    const total = await Room.countDocuments(filter);
    const totalPages = Math.ceil(total / parseInt(limit));

    res.json({
      success: true,
      data: rooms,
      pagination: {
        current: parseInt(page),
        total: totalPages,
        totalItems: total,
        hasNext: parseInt(page) < totalPages,
        hasPrev: parseInt(page) > 1
      }
    });
  } catch (error) {
    console.error('Get rooms error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching rooms'
    });
  }
};

// Get single room by ID
export const getRoomById = async (req, res) => {
  try {
    const room = await Room.findById(req.params.id)
      .populate('createdBy', 'username');

    if (!room) {
      return res.status(404).json({
        success: false,
        message: 'Room not found'
      });
    }

    res.json({
      success: true,
      data: room
    });
  } catch (error) {
    console.error('Get room by ID error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching room'
    });
  }
};

// Create new room (Admin only)
export const createRoom = async (req, res) => {
  try {
    const roomData = {
      ...req.body,
      createdBy: req.user._id
    };

    const room = new Room(roomData);
    await room.save();

    await room.populate('createdBy', 'username');

    res.status(201).json({
      success: true,
      message: 'Room created successfully',
      data: room
    });
  } catch (error) {
    console.error('Create room error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while creating room'
    });
  }
};

// Update room (Admin only)
export const updateRoom = async (req, res) => {
  try {
    const room = await Room.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('createdBy', 'username');

    if (!room) {
      return res.status(404).json({
        success: false,
        message: 'Room not found'
      });
    }

    res.json({
      success: true,
      message: 'Room updated successfully',
      data: room
    });
  } catch (error) {
    console.error('Update room error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while updating room'
    });
  }
};

// Delete room (Admin only)
export const deleteRoom = async (req, res) => {
  try {
    const room = await Room.findByIdAndDelete(req.params.id);

    if (!room) {
      return res.status(404).json({
        success: false,
        message: 'Room not found'
      });
    }

    res.json({
      success: true,
      message: 'Room deleted successfully'
    });
  } catch (error) {
    console.error('Delete room error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while deleting room'
    });
  }
};

// Check room availability
export const checkAvailability = async (req, res) => {
  try {
    const { checkIn, checkOut, roomType } = req.query;

    if (!checkIn || !checkOut) {
      return res.status(400).json({
        success: false,
        message: 'Check-in and check-out dates are required'
      });
    }

    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);

    // Find overlapping bookings
    const overlappingBookings = await Booking.find({
      room: req.params.id,
      status: { $in: ['confirmed', 'checked-in'] },
      $or: [
        {
          checkIn: { $lte: checkOutDate },
          checkOut: { $gte: checkInDate }
        }
      ]
    });

    const isAvailable = overlappingBookings.length === 0;

    res.json({
      success: true,
      data: {
        isAvailable,
        conflictingBookings: overlappingBookings.length
      }
    });
  } catch (error) {
    console.error('Check availability error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while checking availability'
    });
  }
};

// Get room types
export const getRoomTypes = async (req, res) => {
  try {
    const types = await Room.distinct('type');
    
    res.json({
      success: true,
      data: types
    });
  } catch (error) {
    console.error('Get room types error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching room types'
    });
  }
};

// Seed demo rooms (for development)
export const seedRooms = async (req, res) => {
  try {
    const demoRooms = [
      {
        roomNumber: '101',
        type: 'single',
        price: 89,
        capacity: 1,
        size: '250 sq ft',
        amenities: ['WiFi', 'TV', 'AC', 'Mini Bar', 'Coffee Maker'],
        image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400',
        description: 'Comfortable single room perfect for solo travelers with all essential amenities',
        features: ['Queen Bed', 'Work Desk', 'Private Bathroom', 'City View'],
        bedType: 'queen',
        view: 'city'
      },
      {
        roomNumber: '201',
        type: 'double',
        price: 129,
        capacity: 2,
        size: '350 sq ft',
        amenities: ['WiFi', 'TV', 'AC', 'Mini Bar', 'Coffee Maker', 'Safe'],
        image: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=400',
        description: 'Spacious double room ideal for couples or business travelers with extra comfort',
        features: ['King Bed', 'Sitting Area', 'Private Bathroom', 'Mountain View', 'Balcony'],
        bedType: 'king',
        view: 'mountain'
      },
      {
        roomNumber: '301',
        type: 'suite',
        price: 199,
        capacity: 3,
        size: '500 sq ft',
        amenities: ['WiFi', 'TV', 'AC', 'Mini Bar', 'Coffee Maker', 'Safe', 'Jacuzzi'],
        image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400',
        description: 'Luxurious suite with separate living area and premium amenities for ultimate comfort',
        features: ['King Bed', 'Living Room', 'Private Bathroom', 'Ocean View', 'Balcony', 'Kitchenette'],
        bedType: 'king',
        view: 'ocean'
      },
      {
        roomNumber: '401',
        type: 'deluxe',
        price: 299,
        capacity: 4,
        size: '650 sq ft',
        amenities: ['WiFi', 'TV', 'AC', 'Mini Bar', 'Coffee Maker', 'Safe', 'Jacuzzi', 'Kitchenette'],
        image: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=400',
        description: 'Premium deluxe room with exceptional comfort, luxury amenities and panoramic views',
        features: ['Two King Beds', 'Dining Area', 'Private Bathroom', 'Panoramic View', 'Smart Home'],
        bedType: 'king',
        view: 'ocean'
      }
    ];

    // Clear existing rooms and insert demo data
    await Room.deleteMany({});
    const rooms = await Room.insertMany(demoRooms);

    res.json({
      success: true,
      message: 'Demo rooms seeded successfully',
      data: rooms
    });
  } catch (error) {
    console.error('Seed rooms error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while seeding rooms'
    });
  }
};