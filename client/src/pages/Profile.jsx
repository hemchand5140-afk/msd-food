import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const Profile = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');

  const tabs = [
    { id: 'profile', name: 'Profile', icon: '👤' },
    { id: 'orders', name: 'Food Orders', icon: '🍕' },
    { id: 'bookings', name: 'Room Bookings', icon: '🏨' },
    { id: 'settings', name: 'Settings', icon: '⚙️' }
  ];

  const renderProfileContent = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Personal Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
            <input
              type="text"
              defaultValue={user?.profile?.firstName || ''}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
            <input
              type="text"
              defaultValue={user?.profile?.lastName || ''}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input
              type="email"
              defaultValue={user?.email || ''}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
            <input
              type="tel"
              defaultValue={user?.profile?.phone || ''}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
        </div>
        <button className="mt-6 bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg transition duration-300">
          Update Profile
        </button>
      </div>
    </div>
  );

  const renderOrdersContent = () => (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Food Orders</h3>
      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <span className="text-xl">🍕</span>
            </div>
            <div>
              <p className="font-medium text-gray-800">Margherita Pizza</p>
              <p className="text-sm text-gray-600">Order #12345 • Delivered</p>
            </div>
          </div>
          <div className="text-right">
            <p className="font-semibold text-gray-800">$12.99</p>
            <p className="text-sm text-gray-600">2 days ago</p>
          </div>
        </div>
        <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <span className="text-xl">🥗</span>
            </div>
            <div>
              <p className="font-medium text-gray-800">Caesar Salad</p>
              <p className="text-sm text-gray-600">Order #12346 • Preparing</p>
            </div>
          </div>
          <div className="text-right">
            <p className="font-semibold text-gray-800">$8.99</p>
            <p className="text-sm text-gray-600">1 hour ago</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderBookingsContent = () => (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Room Bookings</h3>
      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <span className="text-xl">🏨</span>
            </div>
            <div>
              <p className="font-medium text-gray-800">Deluxe Suite - Room 401</p>
              <p className="text-sm text-gray-600">Check-in: Dec 15, 2024 • 3 nights</p>
            </div>
          </div>
          <div className="text-right">
            <p className="font-semibold text-gray-800">$897.00</p>
            <p className="text-sm text-green-600">Confirmed</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSettingsContent = () => (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Account Settings</h3>
      <div className="space-y-6">
        <div>
          <h4 className="font-medium text-gray-800 mb-3">Notifications</h4>
          <div className="space-y-3">
            <label className="flex items-center">
              <input type="checkbox" className="rounded text-orange-500" defaultChecked />
              <span className="ml-2 text-gray-700">Email notifications</span>
            </label>
            <label className="flex items-center">
              <input type="checkbox" className="rounded text-orange-500" defaultChecked />
              <span className="ml-2 text-gray-700">SMS notifications</span>
            </label>
            <label className="flex items-center">
              <input type="checkbox" className="rounded text-orange-500" />
              <span className="ml-2 text-gray-700">Promotional emails</span>
            </label>
          </div>
        </div>
        <div>
          <h4 className="font-medium text-gray-800 mb-3">Privacy</h4>
          <button className="text-orange-500 hover:text-orange-600 font-medium">
            Change Password
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Profile Header */}
        <div className="bg-white rounded-2xl shadow-md p-8 mb-8">
          <div className="flex items-center space-x-6">
            <div className="w-20 h-20 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl flex items-center justify-center text-white text-2xl font-bold">
              {user?.username?.charAt(0).toUpperCase()}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                {user?.profile?.firstName} {user?.profile?.lastName}
              </h1>
              <p className="text-gray-600">@{user?.username}</p>
              <p className="text-gray-500 text-sm mt-1">{user?.email}</p>
            </div>
            <div className="ml-auto bg-orange-100 text-orange-800 px-4 py-2 rounded-full text-sm font-medium">
              {user?.role === 'admin' ? 'Administrator' : 'Premium Member'}
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-1/4">
            <div className="bg-white rounded-2xl shadow-md p-6 sticky top-8">
              <nav className="space-y-2">
                {tabs.map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left transition duration-300 ${
                      activeTab === tab.id
                        ? 'bg-orange-500 text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <span className="text-lg">{tab.icon}</span>
                    <span className="font-medium">{tab.name}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:w-3/4">
            {activeTab === 'profile' && renderProfileContent()}
            {activeTab === 'orders' && renderOrdersContent()}
            {activeTab === 'bookings' && renderBookingsContent()}
            {activeTab === 'settings' && renderSettingsContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;