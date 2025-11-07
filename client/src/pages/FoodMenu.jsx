import React, { useState, useEffect } from 'react';
import FoodCard from '../components/FoodCard';
import LoadingSpinner from '../components/LoadingSpinner';

const FoodMenu = () => {
  const [foods, setFoods] = useState([]);
  const [filteredFoods, setFilteredFoods] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState([]);

  const categories = [
    'all',
    'appetizer',
    'main-course',
    'dessert',
    'beverage',
    'vegetarian',
    'non-vegetarian'
  ];

  // Mock data - replace with actual API call
  useEffect(() => {
    const mockFoods = [
      {
        _id: '1',
        name: 'Margherita Pizza',
        description: 'Classic pizza with tomato sauce, fresh mozzarella, and basil',
        price: 12.99,
        category: 'main-course',
        image: 'https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?w=400',
        ingredients: ['Tomato sauce', 'Mozzarella', 'Basil'],
        preparationTime: 20,
        rating: 4.5
      },
      {
        _id: '2',
        name: 'Caesar Salad',
        description: 'Fresh romaine lettuce with Caesar dressing, croutons, and parmesan',
        price: 8.99,
        category: 'appetizer',
        image: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=400',
        ingredients: ['Romaine lettuce', 'Caesar dressing', 'Croutons', 'Parmesan'],
        preparationTime: 10,
        rating: 4.2
      },
      {
        _id: '3',
        name: 'Chocolate Lava Cake',
        description: 'Warm chocolate cake with a molten chocolate center',
        price: 6.99,
        category: 'dessert',
        image: 'https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=400',
        ingredients: ['Chocolate', 'Flour', 'Eggs', 'Butter'],
        preparationTime: 15,
        rating: 4.8
      },
      {
        _id: '4',
        name: 'Fresh Orange Juice',
        description: 'Freshly squeezed orange juice',
        price: 3.99,
        category: 'beverage',
        image: 'https://images.unsplash.com/photo-1613478223719-2ab802602423?w=400',
        ingredients: ['Fresh oranges'],
        preparationTime: 5,
        rating: 4.0
      },
      {
        _id: '5',
        name: 'Vegetable Stir Fry',
        description: 'Mixed vegetables stir-fried in a savory sauce',
        price: 10.99,
        category: 'vegetarian',
        image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=400',
        ingredients: ['Broccoli', 'Carrots', 'Bell peppers', 'Soy sauce'],
        preparationTime: 15,
        rating: 4.3
      },
      {
        _id: '6',
        name: 'Grilled Salmon',
        description: 'Fresh salmon grilled to perfection with herbs',
        price: 18.99,
        category: 'non-vegetarian',
        image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400',
        ingredients: ['Salmon', 'Herbs', 'Lemon', 'Olive oil'],
        preparationTime: 25,
        rating: 4.7
      }
    ];

    setFoods(mockFoods);
    setFilteredFoods(mockFoods);
    setLoading(false);
  }, []);

  useEffect(() => {
    let filtered = foods;

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(food => food.category === selectedCategory);
    }

    if (searchTerm) {
      filtered = filtered.filter(food =>
        food.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        food.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredFoods(filtered);
  }, [selectedCategory, searchTerm, foods]);

  const handleAddToCart = (food, quantity) => {
    const existingItem = cart.find(item => item.food._id === food._id);
    
    if (existingItem) {
      setCart(cart.map(item =>
        item.food._id === food._id
          ? { ...item, quantity: item.quantity + quantity }
          : item
      ));
    } else {
      setCart([...cart, { food, quantity }]);
    }

    // Show success message
    alert(`Added ${quantity} ${food.name} to cart!`);
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Food Menu</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our delicious selection of foods crafted with the finest ingredients
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-8 bg-white rounded-2xl shadow-md p-6">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="flex-1 w-full md:max-w-md">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Search for food items..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition duration-300"
                />
              </div>
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition duration-300 capitalize ${
                    selectedCategory === category
                      ? 'bg-orange-500 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {category === 'all' ? 'All' : category.replace('-', ' ')}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Food Grid */}
        {filteredFoods.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🍕</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No food items found</h3>
            <p className="text-gray-600">Try adjusting your search or filter criteria</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {filteredFoods.map(food => (
                <FoodCard
                  key={food._id}
                  food={food}
                  onAddToCart={handleAddToCart}
                />
              ))}
            </div>

            {/* Cart Summary */}
            {cart.length > 0 && (
              <div className="fixed bottom-4 right-4 bg-white rounded-2xl shadow-2xl p-4 border border-orange-200">
                <div className="flex items-center space-x-3">
                  <div className="bg-orange-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">
                    {cart.reduce((total, item) => total + item.quantity, 0)}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">Cart Summary</p>
                    <p className="text-sm text-gray-600">
                      Total: ${cart.reduce((total, item) => total + (item.food.price * item.quantity), 0).toFixed(2)}
                    </p>
                  </div>
                  <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg font-medium transition duration-300">
                    Checkout
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default FoodMenu;