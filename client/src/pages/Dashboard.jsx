import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const { user } = useAuth();

  const recentActivities = [
    { action: 'Order placed', item: 'Pizza Margherita', time: '2 hours ago', type: 'food' },
    { action: 'Room booked', item: 'Deluxe Suite', time: '1 day ago', type: 'room' },
    { action: 'Profile updated', item: 'Personal information', time: '2 days ago', type: 'profile' }
  ];

  const quickActions = [
    { title: 'Order Food', description: 'Browse our delicious menu', link: '/food-menu', icon: '🍕', color: 'bg-orange-500' },
    { title: 'Book Room', description: 'Find your perfect stay', link: '/room-booking', icon: '🏨', color: 'bg-blue-500' },
    { title: 'View Profile', description: 'Manage your account', link: '/profile', icon: '👤', color: 'bg-green-500' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome back, {user?.profile?.firstName || user?.username}!
          </h1>
          <p className="text-gray-600 mt-2">
            Here's what's happening with your Food & Stay experience.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-orange-500">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-orange-100 text-orange-500 mr-4">
                <span className="text-2xl">🍕</span>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Food Orders</p>
                <p className="text-2xl font-bold text-gray-900">12</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-500">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-blue-100 text-blue-500 mr-4">
                <span className="text-2xl">🏨</span>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Room Bookings</p>
                <p className="text-2xl font-bold text-gray-900">3</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-green-500">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-green-100 text-green-500 mr-4">
                <span className="text-2xl">⭐</span>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Loyalty Points</p>
                <p className="text-2xl font-bold text-gray-900">1,250</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Quick Actions */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Quick Actions</h2>
            <div className="space-y-4">
              {quickActions.map((action, index) => (
                <Link
                  key={index}
                  to={action.link}
                  className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-orange-300 hover:bg-orange-50 transition duration-300 group"
                >
                  <div className={`w-12 h-12 ${action.color} rounded-lg flex items-center justify-center text-white text-xl mr-4 group-hover:scale-110 transition duration-300`}>
                    {action.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 group-hover:text-orange-600 transition duration-300">
                      {action.title}
                    </h3>
                    <p className="text-sm text-gray-600">{action.description}</p>
                  </div>
                  <div className="ml-auto text-gray-400 group-hover:text-orange-500 transition duration-300">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Activity</h2>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div
                  key={index}
                  className="flex items-center p-3 border border-gray-200 rounded-lg"
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-4 ${
                    activity.type === 'food' ? 'bg-orange-100 text-orange-500' :
                    activity.type === 'room' ? 'bg-blue-100 text-blue-500' :
                    'bg-green-100 text-green-500'
                  }`}>
                    {activity.type === 'food' && '🍕'}
                    {activity.type === 'room' && '🏨'}
                    {activity.type === 'profile' && '👤'}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-800">{activity.action}</p>
                    <p className="text-sm text-gray-600">{activity.item}</p>
                  </div>
                  <div className="text-sm text-gray-500">{activity.time}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Special Offers */}
        <div className="mt-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl p-8 text-white">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-2">Special Offer!</h2>
              <p className="text-orange-100">
                Get 20% off on your first room booking when you order food above $30.
              </p>
            </div>
            <Link
              to="/food-menu"
              className="mt-4 md:mt-0 bg-white text-orange-500 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition duration-300 transform hover:scale-105"
            >
              Claim Offer
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;