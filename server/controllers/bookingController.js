import Booking from '../models/Booking.js';
import Room from '../models/Room.js';

// Create new booking
export const createBooking = async (req, res) => {
  try {
    const {
      room,
      checkIn,
      checkOut,
      guests,
      specialRequests,
      guestDetails,
      roomService,
      breakfastIncluded,
      parkingRequired,
      paymentMethod
    } = req.body;

    // Validate room
    const roomData = await Room.findById(room);
    if (!roomData) {
      return res.status(400).json({
        success: false,
        message: 'Room not found'
      });
    }

    if (!roomData.isAvailable) {
      return res.status(400).json({
        success: false,
        message: 'Room is not available for booking'
      });
    }

    // Check availability
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);

    const overlappingBooking = await Booking.findOne({
      room,
      status: { $in: ['confirmed', 'checked-in'] },
      $or: [
        {
          checkIn: { $lte: checkOutDate },
          checkOut: { $gte: checkInDate }
        }
      ]
    });

    if (overlappingBooking) {
      return res.status(400).json({
        success: false,
        message: 'Room is not available for the selected dates'
      });
    }

    // Calculate total amount
    const nights = Math.ceil((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24));
    const totalAmount = nights * roomData.price;

    // Create booking
    const booking = new Booking({
      user: req.user._id,
      room,
      checkIn: checkInDate,
      checkOut: checkOutDate,
      guests,
      totalAmount,
      specialRequests,
      guestDetails: guestDetails || {
        firstName: req.user.profile?.firstName,
        lastName: req.user.profile?.lastName,
        email: req.user.email,
        phone: req.user.profile?.phone
      },
      roomService,
      breakfastIncluded,
      parkingRequired,
      paymentMethod
    });

    await booking.save();
    await booking.populate('room');
    await booking.populate('user', 'username email profile');

    res.status(201).json({
      success: true,
      message: 'Booking created successfully',
      data: booking
    });
  } catch (error) {
    console.error('Create booking error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while creating booking'
    });
  }
};

// Get user bookings
export const getUserBookings = async (req, res) => {
  try {
    const { page = 1, limit = 10, status } = req.query;

    const filter = { user: req.user._id };
    if (status) filter.status = status;

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const bookings = await Booking.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit))
      .populate('room')
      .populate('user', 'username email profile');

    const total = await Booking.countDocuments(filter);
    const totalPages = Math.ceil(total / parseInt(limit));

    res.json({
      success: true,
      data: bookings,
      pagination: {
        current: parseInt(page),
        total: totalPages,
        totalItems: total,
        hasNext: parseInt(page) < totalPages,
        hasPrev: parseInt(page) > 1
      }
    });
  } catch (error) {
    console.error('Get user bookings error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching bookings'
    });
  }
};

// Get booking by ID
export const getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findOne({
      _id: req.params.id,
      user: req.user._id
    })
      .populate('room')
      .populate('user', 'username email profile');

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    res.json({
      success: true,
      data: booking
    });
  } catch (error) {
    console.error('Get booking by ID error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching booking'
    });
  }
};

// Update booking status (Admin only)
export const updateBookingStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { 
        status,
        ...(status === 'checked-in' && { checkedInAt: new Date() }),
        ...(status === 'checked-out' && { checkedOutAt: new Date() })
      },
      { new: true, runValidators: true }
    )
      .populate('room')
      .populate('user', 'username email profile');

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    res.json({
      success: true,
      message: 'Booking status updated successfully',
      data: booking
    });
  } catch (error) {
    console.error('Update booking status error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while updating booking status'
    });
  }
};

// Cancel booking
export const cancelBooking = async (req, res) => {
  try {
    const { cancellationReason } = req.body;

    const booking = await Booking.findOne({
      _id: req.params.id,
      user: req.user._id
    });

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    // Only allow cancellation for pending or confirmed bookings
    if (!['pending', 'confirmed'].includes(booking.status)) {
      return res.status(400).json({
        success: false,
        message: 'Booking cannot be cancelled at this stage'
      });
    }

    booking.status = 'cancelled';
    booking.cancellationReason = cancellationReason;
    await booking.save();

    res.json({
      success: true,
      message: 'Booking cancelled successfully',
      data: booking
    });
  } catch (error) {
    console.error('Cancel booking error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while cancelling booking'
    });
  }
};

// Add rating and feedback to booking
export const addBookingFeedback = async (req, res) => {
  try {
    const { rating, feedback } = req.body;

    const booking = await Booking.findOne({
      _id: req.params.id,
      user: req.user._id,
      status: 'checked-out'
    });

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found or not completed'
      });
    }

    booking.rating = rating;
    booking.feedback = feedback;
    await booking.save();

    res.json({
      success: true,
      message: 'Feedback added successfully',
      data: booking
    });
  } catch (error) {
    console.error('Add booking feedback error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while adding feedback'
    });
  }
};

// Check room availability for dates
export const checkRoomAvailability = async (req, res) => {
  try {
    const { checkIn, checkOut } = req.query;

    if (!checkIn || !checkOut) {
      return res.status(400).json({
        success: false,
        message: 'Check-in and check-out dates are required'
      });
    }

    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);

    // Find all rooms
    const allRooms = await Room.find({ isAvailable: true });

    // Find booked rooms for the dates
    const bookedRooms = await Booking.find({
      status: { $in: ['confirmed', 'checked-in'] },
      $or: [
        {
          checkIn: { $lte: checkOutDate },
          checkOut: { $gte: checkInDate }
        }
      ]
    }).distinct('room');

    // Filter available rooms
    const availableRooms = allRooms.filter(room => 
      !bookedRooms.includes(room._id.toString())
    );

    res.json({
      success: true,
      data: {
        availableRooms,
        totalAvailable: availableRooms.length,
        checkIn: checkInDate,
        checkOut: checkOutDate,
        nights: Math.ceil((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24))
      }
    });
  } catch (error) {
    console.error('Check room availability error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while checking availability'
    });
  }
};