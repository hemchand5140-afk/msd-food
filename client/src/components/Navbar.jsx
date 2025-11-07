import React, { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const handleLogout = () => {
    logout()
    navigate('/')
    setIsOpen(false)
  }

  const isActiveRoute = (path) => {
    return location.pathname === path
  }

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">F</span>
              </div>
              <span className="ml-3 text-xl font-bold text-gray-800">
                Food & Stay
              </span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className={`px-3 py-2 rounded-md text-sm font-medium transition duration-300 ${
                isActiveRoute('/') 
                  ? 'text-orange-500 border-b-2 border-orange-500' 
                  : 'text-gray-700 hover:text-orange-500'
              }`}
            >
              Home
            </Link>
            <Link
              to="/food-menu"
              className={`px-3 py-2 rounded-md text-sm font-medium transition duration-300 ${
                isActiveRoute('/food-menu') 
                  ? 'text-orange-500 border-b-2 border-orange-500' 
                  : 'text-gray-700 hover:text-orange-500'
              }`}
            >
              Food Menu
            </Link>
            <Link
              to="/room-booking"
              className={`px-3 py-2 rounded-md text-sm font-medium transition duration-300 ${
                isActiveRoute('/room-booking') 
                  ? 'text-orange-500 border-b-2 border-orange-500' 
                  : 'text-gray-700 hover:text-orange-500'
              }`}
            >
              Room Booking
            </Link>

            {user ? (
              <div className="flex items-center space-x-4">
                <Link
                  to="/dashboard"
                  className={`px-3 py-2 rounded-md text-sm font-medium transition duration-300 ${
                    isActiveRoute('/dashboard') 
                      ? 'text-orange-500 border-b-2 border-orange-500' 
                      : 'text-gray-700 hover:text-orange-500'
                  }`}
                >
                  Dashboard
                </Link>
                <div className="relative group">
                  <button className="flex items-center space-x-2 text-gray-700 hover:text-orange-500">
                    <span>Welcome, {user.username}</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className="text-gray-700 hover:text-orange-500 px-3 py-2 rounded-md text-sm font-medium transition duration-300"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md text-sm font-medium transition duration-300 transform hover:scale-105"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-orange-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-orange-500"
            >
              <svg
                className="h-6 w-6"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 24 24"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
              <Link
                to="/"
                className="text-gray-700 hover:text-orange-500 block px-3 py-2 rounded-md text-base font-medium"
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/food-menu"
                className="text-gray-700 hover:text-orange-500 block px-3 py-2 rounded-md text-base font-medium"
                onClick={() => setIsOpen(false)}
              >
                Food Menu
              </Link>
              <Link
                to="/room-booking"
                className="text-gray-700 hover:text-orange-500 block px-3 py-2 rounded-md text-base font-medium"
                onClick={() => setIsOpen(false)}
              >
                Room Booking
              </Link>
              {user ? (
                <>
                  <Link
                    to="/dashboard"
                    className="text-gray-700 hover:text-orange-500 block px-3 py-2 rounded-md text-base font-medium"
                    onClick={() => setIsOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <Link
                    to="/profile"
                    className="text-gray-700 hover:text-orange-500 block px-3 py-2 rounded-md text-base font-medium"
                    onClick={() => setIsOpen(false)}
                  >
                    Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="text-gray-700 hover:text-orange-500 block px-3 py-2 rounded-md text-base font-medium w-full text-left"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="text-gray-700 hover:text-orange-500 block px-3 py-2 rounded-md text-base font-medium"
                    onClick={() => setIsOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="text-gray-700 hover:text-orange-500 block px-3 py-2 rounded-md text-base font-medium"
                    onClick={() => setIsOpen(false)}
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar