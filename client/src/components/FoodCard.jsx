import React, { useState } from 'react'

const FoodCard = ({ food, onAddToCart }) => {
  const [quantity, setQuantity] = useState(1)

  const handleAddToCart = () => {
    onAddToCart(food, quantity)
    setQuantity(1)
  }

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition duration-300 transform hover:-translate-y-1">
      <div className="h-48 bg-gray-200">
        <img
          src={food.image}
          alt={food.name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-gray-800">{food.name}</h3>
          <span className="text-orange-500 font-bold">${food.price}</span>
        </div>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{food.description}</p>
        
        <div className="flex items-center justify-between mb-3">
          <span className="inline-block bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded-full">
            {food.category}
          </span>
          <div className="flex items-center space-x-1">
            <span className="text-yellow-500">★</span>
            <span className="text-sm text-gray-600">{food.rating}</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300 transition duration-200"
            >
              -
            </button>
            <span className="w-8 text-center">{quantity}</span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300 transition duration-200"
            >
              +
            </button>
          </div>
          <button
            onClick={handleAddToCart}
            className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition duration-300 transform hover:scale-105"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  )
}

export default FoodCard