import React from 'react';
import { Coins, Leaf, Route, Award } from 'lucide-react';

interface EcoCoinsProps {
  ecoCoins: number;
}

const EcoCoinsPage: React.FC<EcoCoinsProps> = ({ ecoCoins }) => {
  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-8 rounded-2xl">
        <h2 className="text-2xl font-bold mb-4">Your EcoCoins</h2>
        <div className="flex items-center space-x-2 mb-4">
          <Coins className="text-white" size={32} />
          <span className="text-4xl font-bold">{ecoCoins.toLocaleString()}</span>
        </div>
        <p className="text-blue-100">Earn EcoCoins by making sustainable choices and redeem them for discounts!</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100 focus-within:ring-2 focus-within:ring-blue-400" tabIndex={0}>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">How to Earn EcoCoins</h3>
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <Leaf size={16} className="text-green-600" />
              </div>
              <div>
                <p className="font-medium">Buy Eco-Friendly Products</p>
                <p className="text-sm text-gray-600">Earn 2x coins on sustainable items</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <Route size={16} className="text-blue-600" />
              </div>
              <div>
                <p className="font-medium">Choose Eco Routes</p>
                <p className="text-sm text-gray-600">Get bonus coins for sustainable delivery</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                <Award size={16} className="text-purple-600" />
              </div>
              <div>
                <p className="font-medium">Complete Challenges</p>
                <p className="text-sm text-gray-600">Weekly sustainability goals</p>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100 focus-within:ring-2 focus-within:ring-blue-400" tabIndex={0}>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">Eco-Friendly Delivery</p>
                <p className="text-sm text-gray-600">2 hours ago</p>
              </div>
              <span className="text-green-600 font-medium">+50 coins</span>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">Organic Purchase</p>
                <p className="text-sm text-gray-600">1 day ago</p>
              </div>
              <span className="text-green-600 font-medium">+100 coins</span>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">Weekly Challenge</p>
                <p className="text-sm text-gray-600">3 days ago</p>
              </div>
              <span className="text-green-600 font-medium">+200 coins</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EcoCoinsPage; 