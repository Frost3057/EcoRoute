import React, { useState, useEffect } from 'react';
import { Coins, Leaf, Route, Award, RefreshCw, AlertCircle } from 'lucide-react';

interface EcoCoinsProps {
  ecoCoins: number;
  onBalanceUpdate?: (newBalance: number) => void;
}

const EcoCoinsPage: React.FC<EcoCoinsProps> = ({ ecoCoins, onBalanceUpdate }) => {
  const [balance, setBalance] = useState<number>(ecoCoins);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const blockchainAddress = "1Aej3ZBacU1JGtTTzAz4NfqvoanHrrN6Gaq3Ce";

  const fetchBalance = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(`http://localhost:8000/ecoCoin/getbalance/${blockchainAddress}`);
      
      if (response.ok) {
        const data = await response.json();
        // Extract qty from the response format: { "data": [{ "name": "EcoCoin", "assetref": "149-267-59242", "qty": 998999.9 }] }
        const newBalance = data.data && data.data.length > 0 ? data.data[0].qty || 0 : 0;
        setBalance(newBalance);
        
        // Update parent component if callback provided
        if (onBalanceUpdate) {
          onBalanceUpdate(newBalance);
        }
      } else {
        throw new Error('Failed to fetch balance');
      }
    } catch (err) {
      setError('Failed to load EcoCoin balance. Please try again.');
      console.error('Error fetching balance:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBalance();
  }, []);

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-8 rounded-2xl">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">Your EcoCoins</h2>
          <button
            onClick={fetchBalance}
            disabled={loading}
            className="p-2 bg-white bg-opacity-20 rounded-lg hover:bg-opacity-30 transition-all focus:outline-none focus:ring-2 focus:ring-white"
            aria-label="Refresh balance"
          >
            <RefreshCw size={20} className={`${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>
        
        {error ? (
          <div className="flex items-center space-x-2 mb-4 p-3 bg-red-500 bg-opacity-20 rounded-lg">
            <AlertCircle size={20} />
            <span className="text-red-100">{error}</span>
          </div>
        ) : (
          <div className="flex items-center space-x-2 mb-4">
            <Coins className="text-white" size={32} />
            <span className="text-4xl font-bold">
              {loading ? '...' : balance.toLocaleString()}
            </span>
          </div>
        )}
        
        <p className="text-blue-100">Earn EcoCoins by making sustainable choices and redeem them for discounts!</p>
        
        <div className="mt-4 p-3 bg-white bg-opacity-10 rounded-lg">
          <p className="text-sm text-blue-100">
            <span className="font-medium">Blockchain Address:</span> {blockchainAddress}
          </p>
          <p className="text-sm text-blue-100 mt-1">
            <span className="font-medium">Asset Reference:</span> 149-267-59242
          </p>
        </div>
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