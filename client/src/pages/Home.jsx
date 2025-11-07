import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

const Home = () => {
  const { user } = useAuth()

  const features = [
    {
      title: "Food Ordering",
      description: "Order from a wide variety of delicious foods across multiple categories",
      icon: "🍕",
      link: "/food-menu",
      color: "from-orange-500 to-red-500"
    },
    {
      title: "Room Booking",
      description: "Book comfortable rooms for your stay with amazing amenities",
      icon: "🏨",
      link: "/room-booking",
      color: "from-blue-500 to-purple-500"
    },
    {
      title: "Fast Delivery",
      description: "Quick and reliable delivery service right to your doorstep",
      icon: "🚚",
      link: "/food-menu",
      color: "from-green-500 to-teal-500"
    }
  ]

  const foodCategories = [
    { 
      name: "Appetizers", 
      count: "25+ Items", 
      image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=400",
      description: "Start your meal with delicious appetizers"
    },
    { 
      name: "Main Course", 
      count: "50+ Items", 
      image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400",
      description: "Hearty main dishes for every palate"
    },
    { 
      name: "Desserts", 
      count: "20+ Items", 
      image: "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=400",
      description: "Sweet treats to complete your meal"
    },
    { 
      name: "Beverages", 
      count: "15+ Items", 
      image: "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=400",
      description: "Refreshing drinks and beverages"
    }
  ]

  const stats = [
    { number: "10,000+", label: "Happy Customers" },
    { number: "500+", label: "Food Items" },
    { number: "50+", label: "Rooms Available" },
    { number: "24/7", label: "Customer Support" }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-orange-500 via-red-500 to-pink-500 text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in">
              Welcome to <span className="text-yellow-300">Food & Stay</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90 max-w-3xl mx-auto">
              Experience the perfect blend of delicious food and comfortable accommodation. 
              Order your favorite meals and book luxury rooms all in one place.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {!user ? (
                <>
                  <Link
                    to="/register"
                    className="bg-white text-orange-500 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition duration-300 transform hover:scale-105 shadow-lg"
                  >
                    Get Started Free
                  </Link>
                  <Link
                    to="/food-menu"
                    className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-orange-500 transition duration-300 shadow-lg"
                  >
                    Order Now
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    to="/food-menu"
                    className="bg-white text-orange-500 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition duration-300 transform hover:scale-105 shadow-lg"
                  >
                    Order Food
                  </Link>
                  <Link
                    to="/room-booking"
                    className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-orange-500 transition duration-300 shadow-lg"
                  >
                    Book Room
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-orange-500 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Why Choose <span className="text-orange-500">Food & Stay</span>?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We provide exceptional service with a focus on quality, convenience, and customer satisfaction
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 hover:shadow-2xl transition duration-300 transform hover:-translate-y-4 animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center text-2xl mb-6`}>
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">{feature.description}</p>
                <Link
                  to={feature.link}
                  className="inline-flex items-center text-orange-500 font-semibold hover:text-orange-600 transition duration-300 group"
                >
                  Explore More
                  <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Food Categories Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Explore Food Categories
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover a wide range of delicious food options crafted by our expert chefs
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {foodCategories.map((category, index) => (
              <div
                key={index}
                className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition duration-300 transform hover:scale-105"
              >
                <div className="h-48 bg-gray-200 overflow-hidden">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                  />
                  <div className="absolute top-4 right-4 bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                    {category.count}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    {category.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    {category.description}
                  </p>
                  <Link
                    to="/food-menu"
                    className="inline-flex items-center text-orange-500 font-semibold text-sm hover:text-orange-600 transition duration-300"
                  >
                    Browse Menu
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-orange-500 to-red-500 text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Experience the Best?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Join thousands of satisfied customers who trust us for their food and accommodation needs. 
            Your perfect dining and staying experience awaits!
          </p>
          {!user ? (
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/register"
                className="bg-white text-orange-500 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition duration-300 transform hover:scale-105 shadow-lg"
              >
                Create Your Account
              </Link>
              <Link
                to="/food-menu"
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-orange-500 transition duration-300 shadow-lg"
              >
                Browse Menu
              </Link>
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/food-menu"
                className="bg-white text-orange-500 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition duration-300 transform hover:scale-105 shadow-lg"
              >
                Order Food Now
              </Link>
              <Link
                to="/room-booking"
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-orange-500 transition duration-300 shadow-lg"
              >
                Book a Room
              </Link>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

export default Home