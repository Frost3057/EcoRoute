import React, { useState, useEffect } from 'react';
import { Coins, TrendingUp, Users, Award, RefreshCw, AlertCircle } from 'lucide-react';

const EcoCoins: React.FC = () => {
  const [balance, setBalance] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const blockchainAddress = "1CyKBraiJ7yw7QQfjvDrVdH1ai9oroWCrDfxwX";

  useEffect(() => {
    fetchBalance();
  }, []);

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

  const stats = [
    { 
      label: 'Total EcoCoins Balance', 
      value: loading ? '...' : balance.toLocaleString(), 
      icon: Coins, 
      color: 'bg-emerald-500',
      subtitle: 'Current blockchain balance'
    },
    { 
      label: 'Active Participants', 
      value: '3,247', 
      icon: Users, 
      color: 'bg-blue-500',
      subtitle: 'Users with EcoCoins'
    },
    { 
      label: 'Rewards Claimed', 
      value: '8,924', 
      icon: Award, 
      color: 'bg-purple-500',
      subtitle: 'Total redemptions'
    },
    { 
      label: 'Monthly Growth', 
      value: '+24%', 
      icon: TrendingUp, 
      color: 'bg-orange-500',
      subtitle: 'This month'
    },
  ];

  const recentTransactions = [
    { user: 'Alice Johnson', action: 'Earned', amount: '+50', reason: 'Sustainable packaging choice' },
    { user: 'Bob Smith', action: 'Redeemed', amount: '-100', reason: 'Free delivery voucher' },
    { user: 'Carol Brown', action: 'Earned', amount: '+25', reason: 'Referral bonus' },
    { user: 'David Wilson', action: 'Earned', amount: '+75', reason: 'Bulk order discount' },
  ];

  if (loading) {
    return (
      <div className="p-6">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">EcoCoins Management</h1>
            <div className="flex items-center space-x-3">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
              <span className="text-sm text-gray-600">Loading balance...</span>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-white rounded-lg p-6 border border-gray-200 animate-pulse">
              <div className="h-4 bg-gray-200 rounded mb-2"></div>
              <div className="h-8 bg-gray-200 rounded mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">EcoCoins Management</h1>
            <button
              onClick={fetchBalance}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm flex items-center"
            >
              <RefreshCw size={16} className="mr-2" />
              Refresh
            </button>
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
          <AlertCircle className="text-red-500 mx-auto mb-4" size={48} />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Error Loading EcoCoins</h3>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={fetchBalance}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">EcoCoins Management</h1>
          <button
            onClick={fetchBalance}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm flex items-center"
          >
            <RefreshCw size={16} className="mr-2" />
            Refresh Balance
          </button>
        </div>
        <p className="text-gray-600 mt-1">Manage EcoCoins system and track blockchain balance</p>
      </div>

      {/* Blockchain Balance Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-6 rounded-lg mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold mb-2">Blockchain Balance</h2>
            <p className="text-blue-100 mb-4">Current EcoCoins balance on the blockchain</p>
            <div className="flex items-center space-x-4">
              <div className="bg-white bg-opacity-20 px-4 py-2 rounded-lg">
                <p className="text-sm text-blue-100">Address</p>
                <p className="font-mono text-sm">{blockchainAddress}</p>
              </div>
              <div className="bg-white bg-opacity-20 px-4 py-2 rounded-lg">
                <p className="text-sm text-blue-100">Asset Reference</p>
                <p className="font-mono text-sm">149-267-59242</p>
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-4xl font-bold mb-2">{balance.toLocaleString()}</div>
            <p className="text-blue-100">EcoCoins</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-gray-600">{stat.label}</p>
              <div className={`w-10 h-10 ${stat.color} rounded-lg flex items-center justify-center`}>
                <stat.icon className="h-5 w-5 text-white" />
              </div>
            </div>
            <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            <p className="text-xs text-gray-500 mt-1">{stat.subtitle}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* EcoCoins Settings */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">EcoCoins Settings</h3>
          <div className="space-y-6">
            <div className="flex items-center justify-between py-4 border-b border-gray-200">
              <div>
                <p className="font-medium text-gray-900">Eco-Friendly Product Bonus</p>
                <p className="text-sm text-gray-600">Extra coins for sustainable purchases</p>
              </div>
              <div className="text-blue-600 font-semibold">
                2x multiplier
              </div>
            </div>
            
            <div className="flex items-center justify-between py-4 border-b border-gray-200">
              <div>
                <p className="font-medium text-gray-900">Eco Route Bonus</p>
                <p className="text-sm text-gray-600">Bonus for choosing sustainable delivery</p>
              </div>
              <div className="text-blue-600 font-semibold">
                50 coins
              </div>
            </div>
            
            <div className="flex items-center justify-between py-4">
              <div>
                <p className="font-medium text-gray-900">Referral Bonus</p>
                <p className="text-sm text-gray-600">Coins for successful referrals</p>
              </div>
              <div className="text-blue-600 font-semibold">
                500 coins
              </div>
            </div>
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Recent Transactions</h3>
          <div className="space-y-4">
            {recentTransactions.map((transaction, index) => (
              <div key={index} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
                <div>
                  <p className="font-medium text-gray-900">{transaction.user}</p>
                  <p className="text-sm text-gray-600">{transaction.reason}</p>
                </div>
                <div className="text-right">
                  <p className={`font-semibold ${transaction.action === 'Earned' ? 'text-green-600' : 'text-red-600'}`}>
                    {transaction.amount}
                  </p>
                  <p className="text-xs text-gray-500">{transaction.action}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EcoCoins;