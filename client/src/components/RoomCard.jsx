import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext.jsx'

const RoomCard = ({ room, onBookRoom }) => {
  const [showDetails, setShowDetails] = useState(false)
  const { user } = useAuth()

  const handleBookNow = () => {
    if (!user) {
      alert('Please login to book a room')
      return
    }
    onBookRoom(room)
  }

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition duration-300">
      <div className="h-64 bg-gray-200 relative">
        <img
          src={room.images[0]}
          alt={room.type}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
          ${room.price}/night
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-xl font-semibold text-gray-800 capitalize">
            {room.type} Room
          </h3>
          <span className="text-sm text-gray-600">Room {room.roomNumber}</span>
        </div>
        
        <p className="text-gray-600 mb-4 line-clamp-2">{room.description}</p>
        
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <span>👤 {room.capacity} guests</span>
          </div>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
            room.isAvailable 
              ? 'bg-green-100 text-green-800' 
              : 'bg-red-100 text-red-800'
          }`}>
            {room.isAvailable ? 'Available' : 'Booked'}
          </span>
        </div>

        <div className="flex space-x-2 mb-4">
          {room.amenities.slice(0, 3).map((amenity, index) => (
            <span
              key={index}
              className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs"
            >
              {amenity}
            </span>
          ))}
          {room.amenities.length > 3 && (
            <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
              +{room.amenities.length - 3} more
            </span>
          )}
        </div>

        <div className="flex space-x-3">
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="flex-1 bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded-lg transition duration-300"
          >
            {showDetails ? 'Hide Details' : 'View Details'}
          </button>
          <button
            onClick={handleBookNow}
            disabled={!room.isAvailable}
            className={`flex-1 py-2 px-4 rounded-lg transition duration-300 ${
              room.isAvailable
                ? 'bg-orange-500 hover:bg-orange-600 text-white'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            Book Now
          </button>
        </div>

        {showDetails && (
          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <h4 className="font-semibold mb-2">Room Features:</h4>
            <ul className="grid grid-cols-2 gap-2 text-sm text-gray-600">
              {room.features.map((feature, index) => (
                <li key={index} className="flex items-center">
                  <span className="w-2 h-2 bg-orange-500 rounded-full mr-2"></span>
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}

export default RoomCard