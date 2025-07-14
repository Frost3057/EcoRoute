import React, { useState, useEffect } from 'react';
import { TrendingUp, Users, Package, Truck, RefreshCw, AlertCircle } from 'lucide-react';

interface OrderItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  ecoPrice: number;
}

interface OrderEdta {
  route: string;
  time: string;
  cost: string;
  ecoBonus: number;
  co2Saved: string;
  items: OrderItem[];
}

interface Order {
  id: string;
  cust_id: string;
  status: string;
  createdAt: string;
  totalAmount: number;
  address: string;
  name: string;
  phone: string;
  edta: OrderEdta;
}

const Dashboard: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch('http://localhost:8000/orders');
      
      if (response.ok) {
        const data = await response.json();
        setOrders(data);
      } else {
        throw new Error('Failed to fetch orders');
      }
    } catch (err) {
      setError('Failed to load dashboard data');
      console.error('Error fetching orders:', err);
    } finally {
      setLoading(false);
    }
  };

  const getTotalRevenue = () => {
    return orders.reduce((sum, order) => sum + order.totalAmount, 0);
  };

  const getTotalEcoCoins = () => {
    return orders.reduce((sum, order) => {
      if (order.edta?.items) {
        return sum + order.edta.items.reduce((itemSum, item) => itemSum + (item.ecoPrice * item.quantity), 0);
      }
      return sum;
    }, 0);
  };

  const getCompletedOrders = () => {
    return orders.filter(order => 
      order.status.toLowerCase() === 'completed' || 
      order.status.toLowerCase() === 'delivered'
    ).length;
  };

  const getPendingOrders = () => {
    return orders.filter(order => 
      order.status.toLowerCase() === 'pending' || 
      order.status.toLowerCase() === 'processing'
    ).length;
  };

  const getRecentOrders = () => {
    return orders
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, 5);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed':
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
            <div className="flex items-center space-x-3">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
              <span className="text-sm text-gray-600">Loading...</span>
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
            <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
            <button
              onClick={fetchOrders}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm flex items-center"
            >
              <RefreshCw size={16} className="mr-2" />
              Refresh
            </button>
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
          <AlertCircle className="text-red-500 mx-auto mb-4" size={48} />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Error Loading Dashboard</h3>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={fetchOrders}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const stats = [
    { 
      label: 'Total Orders', 
      value: orders.length.toString(), 
      icon: Package, 
      color: 'bg-emerald-500',
      change: '+12.5%',
      changeColor: 'text-green-600'
    },
    { 
      label: 'Completed Orders', 
      value: getCompletedOrders().toString(), 
      icon: Package, 
      color: 'bg-green-500',
      change: `${((getCompletedOrders() / orders.length) * 100).toFixed(1)}%`,
      changeColor: 'text-green-600'
    },
    { 
      label: 'Pending Orders', 
      value: getPendingOrders().toString(), 
      icon: Package, 
      color: 'bg-yellow-500',
      change: `${((getPendingOrders() / orders.length) * 100).toFixed(1)}%`,
      changeColor: 'text-yellow-600'
    },
    { 
      label: 'Total Revenue', 
      value: `$${getTotalRevenue().toFixed(2)}`, 
      icon: TrendingUp, 
      color: 'bg-purple-500',
      change: '+15.2%',
      changeColor: 'text-green-600'
    },
  ];

  return (
    <div className="p-6">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <div className="flex items-center space-x-3">
            <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
              <option>Last 7 days</option>
              <option>Last 30 days</option>
              <option>Last 90 days</option>
            </select>
            <button 
              onClick={fetchOrders}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm flex items-center"
            >
              <RefreshCw size={16} className="mr-2" />
              Refresh
            </button>
            <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm flex items-center">
              Export
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-gray-600">{stat.label}</p>
              <div className={`w-10 h-10 ${stat.color} rounded-lg flex items-center justify-center`}>
                <stat.icon className="h-5 w-5 text-white" />
              </div>
            </div>
            <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            <p className={`text-sm ${stat.changeColor} mt-1`}>↗ {stat.change}</p>
          </div>
        ))}
      </div>

      {/* Environmental Impact Section */}
      <div className="bg-green-600 rounded-lg p-8 mb-8 text-white">
        <h3 className="text-xl font-bold mb-6">Environmental Impact</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="text-center">
            <p className="text-3xl font-bold">{orders.length}</p>
            <p className="text-green-100 text-sm">Total Orders</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold">{getCompletedOrders()}</p>
            <p className="text-green-100 text-sm">Completed Orders</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold">{getTotalEcoCoins().toLocaleString()}</p>
            <p className="text-green-100 text-sm">EcoCoins Issued</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold">89%</p>
            <p className="text-green-100 text-sm">Customer Satisfaction</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Orders</h3>
          <div className="space-y-4">
            {getRecentOrders().length === 0 ? (
              <p className="text-gray-500 text-center py-4">No orders found</p>
            ) : (
              getRecentOrders().map((order) => (
                <div key={order.id} className="flex items-center justify-between py-2">
                  <div>
                    <p className="font-medium text-gray-900">{order.id.slice(-8)}</p>
                    <p className="text-sm text-gray-600">{order.name}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-900">${order.totalAmount.toFixed(2)}</p>
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Statistics</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between py-2">
              <div>
                <p className="font-medium text-gray-900">Total Orders</p>
                <p className="text-sm text-gray-600">All time</p>
              </div>
              <div className="text-right">
                <p className="font-medium text-gray-900">{orders.length}</p>
              </div>
            </div>
            <div className="flex items-center justify-between py-2">
              <div>
                <p className="font-medium text-gray-900">Completed</p>
                <p className="text-sm text-gray-600">Successfully delivered</p>
              </div>
              <div className="text-right">
                <p className="font-medium text-gray-900">{getCompletedOrders()}</p>
                <p className="text-sm text-green-600">{((getCompletedOrders() / orders.length) * 100).toFixed(1)}%</p>
              </div>
            </div>
            <div className="flex items-center justify-between py-2">
              <div>
                <p className="font-medium text-gray-900">Pending</p>
                <p className="text-sm text-gray-600">In processing</p>
              </div>
              <div className="text-right">
                <p className="font-medium text-gray-900">{getPendingOrders()}</p>
                <p className="text-sm text-yellow-600">{((getPendingOrders() / orders.length) * 100).toFixed(1)}%</p>
              </div>
            </div>
            <div className="flex items-center justify-between py-2">
              <div>
                <p className="font-medium text-gray-900">Total Revenue</p>
                <p className="text-sm text-gray-600">All orders</p>
              </div>
              <div className="text-right">
                <p className="font-medium text-gray-900">${getTotalRevenue().toFixed(2)}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;