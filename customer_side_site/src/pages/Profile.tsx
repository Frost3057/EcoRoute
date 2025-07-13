import React from 'react';
import { Edit, User, Mail, Phone, MapPin, Shield, Calendar, Coins } from 'lucide-react';

interface UserProfile {
  name: string;
  email: string;
  phone: string;
  address: string;
  memberSince: string;
  membershipType: string;
  totalOrders: number;
  totalSaved: number;
  co2Saved: number;
  treesEquivalent: number;
}

interface ProfileProps {
  userProfile: UserProfile;
  ecoCoins: number;
}

const ProfilePage: React.FC<ProfileProps> = ({ userProfile, ecoCoins }) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Profile</h2>
        <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
          <Edit size={16} />
          <span>Edit Profile</span>
        </button>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Info */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100 focus-within:ring-2 focus-within:ring-blue-400" tabIndex={0}>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <User className="text-gray-400" size={20} />
                <div>
                  <p className="text-sm text-gray-600">Full Name</p>
                  <p className="font-medium text-gray-900">{userProfile.name}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="text-gray-400" size={20} />
                <div>
                  <p className="text-sm text-gray-600">Email</p>
                  <p className="font-medium text-gray-900">{userProfile.email}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="text-gray-400" size={20} />
                <div>
                  <p className="text-sm text-gray-600">Phone</p>
                  <p className="font-medium text-gray-900">{userProfile.phone}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="text-gray-400" size={20} />
                <div>
                  <p className="text-sm text-gray-600">Address</p>
                  <p className="font-medium text-gray-900">{userProfile.address}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100 focus-within:ring-2 focus-within:ring-blue-400" tabIndex={0}>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Membership Details</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Shield className="text-blue-600" size={20} />
                <div>
                  <p className="text-sm text-gray-600">Membership Type</p>
                  <p className="font-medium text-blue-600">{userProfile.membershipType}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Calendar className="text-gray-400" size={20} />
                <div>
                  <p className="text-sm text-gray-600">Member Since</p>
                  <p className="font-medium text-gray-900">{userProfile.memberSince}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Stats */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100 focus-within:ring-2 focus-within:ring-blue-400" tabIndex={0}>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Stats</h3>
            <div className="space-y-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <p className="text-2xl font-bold text-blue-600">{userProfile.totalOrders}</p>
                <p className="text-sm text-gray-600">Total Orders</p>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <p className="text-2xl font-bold text-green-600">${userProfile.totalSaved}</p>
                <p className="text-sm text-gray-600">Total Saved</p>
              </div>
              <div className="text-center p-4 bg-emerald-50 rounded-lg">
                <p className="text-2xl font-bold text-emerald-600">{userProfile.co2Saved} tons</p>
                <p className="text-sm text-gray-600">CO₂ Saved</p>
              </div>
              <div className="text-center p-4 bg-amber-50 rounded-lg">
                <p className="text-2xl font-bold text-amber-600">{userProfile.treesEquivalent}</p>
                <p className="text-sm text-gray-600">Trees Equivalent</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100 focus-within:ring-2 focus-within:ring-blue-400" tabIndex={0}>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">EcoCoins Balance</h3>
            <div className="text-center">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <Coins className="text-blue-600" size={24} />
                <span className="text-3xl font-bold text-blue-600">{ecoCoins.toLocaleString()}</span>
              </div>
              <p className="text-sm text-gray-600 mb-4">Available EcoCoins</p>
              <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors">
                Redeem EcoCoins
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage; 