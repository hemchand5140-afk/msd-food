import React, { useState, useEffect } from 'react';
import RoomCard from '../components/RoomCard';
import LoadingSpinner from '../components/LoadingSpinner';
import { useAuth } from '../context/AuthContext';

const RoomBooking = () => {
  const [rooms, setRooms] = useState([]);
  const [filteredRooms, setFilteredRooms] = useState([]);
  const [selectedType, setSelectedType] = useState('all');
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const roomTypes = ['all', 'single', 'double', 'suite', 'deluxe'];

  // Mock data - replace with actual API call
  useEffect(() => {
    const mockRooms = [
      {
        _id: '1',
        roomNumber: '101',
        type: 'single',
        price: 89,
        capacity: 1,
        amenities: ['WiFi', 'TV', 'AC', 'Mini Bar'],
        images: ['https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400'],
        description: 'Comfortable single room perfect for solo travelers',
        isAvailable: true,
        features: ['Queen Bed', 'Work Desk', 'Private Bathroom', 'City View']
      },
      {
        _id: '2',
        roomNumber: '201',
        type: 'double',
        price: 129,
        capacity: 2,
        amenities: ['WiFi', 'TV', 'AC', 'Mini Bar', 'Coffee Maker'],
        images: ['https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=400'],
        description: 'Spacious double room ideal for couples or business travelers',
        isAvailable: true,
        features: ['King Bed', 'Sitting Area', 'Private Bathroom', 'Mountain View']
      },
      {
        _id: '3',
        roomNumber: '301',
        type: 'suite',
        price: 199,
        capacity: 3,
        amenities: ['WiFi', 'TV', 'AC', 'Mini Bar', 'Coffee Maker', 'Jacuzzi'],
        images: ['https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400'],
        description: 'Luxurious suite with separate living area and premium amenities',
        isAvailable: false,
        features: ['King Bed', 'Living Room', 'Private Bathroom', 'Balcony', 'Ocean View']
      },
      {
        _id: '4',
        roomNumber: '401',
        type: 'deluxe',
        price: 299,
        capacity: 4,
        amenities: ['WiFi', 'TV', 'AC', 'Mini Bar', 'Coffee Maker', 'Jacuzzi', 'Kitchenette'],
        images: ['https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=400'],
        description: 'Premium deluxe room with exceptional comfort and luxury',
        isAvailable: true,
        features: ['Two King Beds', 'Dining Area', 'Private Bathroom', 'Panoramic View', 'Smart Home']
      }
    ];

    setRooms(mockRooms);
    setFilteredRooms(mockRooms);
    setLoading(false);
  }, []);

  useEffect(() => {
    if (selectedType === 'all') {
      setFilteredRooms(rooms);
    } else {
      setFilteredRooms(rooms.filter(room => room.type === selectedType));
    }
  }, [selectedType, rooms]);

  const handleBookRoom = (room) => {
    if (!user) {
      alert('Please login to book a room');
      return;
    }
    
    // In a real app, this would open a booking modal or navigate to booking page
    alert(`Booking initiated for ${room.type} room ${room.roomNumber}`);
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Room Booking</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Find your perfect stay with our selection of comfortable and luxurious rooms
          </p>
        </div>

        {/* Room Type Filter */}
        <div className="mb-8 bg-white rounded-2xl shadow-md p-6">
          <div className="flex flex-wrap gap-4 justify-center">
            {roomTypes.map(type => (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                className={`px-6 py-3 rounded-xl text-sm font-medium transition duration-300 capitalize ${
                  selectedType === type
                    ? 'bg-orange-500 text-white shadow-lg'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {type === 'all' ? 'All Rooms' : `${type} Rooms`}
              </button>
            ))}
          </div>
        </div>

        {/* Room Grid */}
        {filteredRooms.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🏨</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No rooms available</h3>
            <p className="text-gray-600">Try selecting a different room type</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {filteredRooms.map(room => (
              <RoomCard
                key={room._id}
                room={room}
                onBookRoom={handleBookRoom}
              />
            ))}
          </div>
        )}

        {/* Booking Information */}
        <div className="mt-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl p-8 text-white">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-3xl mb-2">🛎️</div>
              <h3 className="font-semibold mb-2">24/7 Room Service</h3>
              <p className="text-blue-100 text-sm">Round-the-clock service for your comfort</p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">🚗</div>
              <h3 className="font-semibold mb-2">Free Parking</h3>
              <p className="text-blue-100 text-sm">Complimentary parking for all guests</p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">🍽️</div>
              <h3 className="font-semibold mb-2">Complimentary Breakfast</h3>
              <p className="text-blue-100 text-sm">Free breakfast with every booking</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomBooking;