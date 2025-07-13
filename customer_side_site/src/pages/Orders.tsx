import React, { useState, useEffect } from 'react';
import { Package, Clock, MapPin, Truck, CheckCircle, AlertCircle, Calendar, DollarSign, Leaf } from 'lucide-react';

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

const OrdersPage: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:8000/orders/1234');
      
      if (response.ok) {
        const data = await response.json();
        setOrders(data);
      } else {
        throw new Error('Failed to fetch orders');
      }
    } catch (err) {
      setError('Failed to load orders. Please try again.');
      console.error('Error fetching orders:', err);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'text-green-600 bg-green-100';
      case 'pending':
        return 'text-yellow-600 bg-yellow-100';
      case 'processing':
        return 'text-blue-600 bg-blue-100';
      case 'cancelled':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return <CheckCircle size={16} />;
      case 'pending':
        return <Clock size={16} />;
      case 'processing':
        return <Truck size={16} />;
      case 'cancelled':
        return <AlertCircle size={16} />;
      default:
        return <Package size={16} />;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-900">Order History</h2>
        <div className="bg-white p-8 rounded-2xl shadow-md border border-gray-100 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your orders...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-900">Order History</h2>
        <div className="bg-white p-8 rounded-2xl shadow-md border border-gray-100 text-center">
          <AlertCircle className="text-red-500 mx-auto mb-4" size={64} />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Error Loading Orders</h3>
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

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Order History</h2>
        <button
          onClick={fetchOrders}
          className="text-blue-600 hover:text-blue-700 font-medium focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          Refresh
        </button>
      </div>

      {orders.length === 0 ? (
        <div className="bg-white p-8 rounded-2xl shadow-md border border-gray-100 text-center">
          <Package className="text-gray-400 mx-auto mb-4" size={64} />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No Orders Yet</h3>
          <p className="text-gray-600 mb-4">You haven't placed any orders yet.</p>
          <button
            onClick={() => window.location.href = '/'}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Start Shopping
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order.id} className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-200">
              {/* Order Header */}
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <Package className="text-blue-600" size={24} />
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">Order #{order.id.slice(-8)}</h3>
                      <p className="text-sm text-gray-500">Placed on {formatDate(order.createdAt)}</p>
                    </div>
                  </div>
                  <div className={`flex items-center space-x-2 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                    {getStatusIcon(order.status)}
                    <span className="capitalize">{order.status}</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center space-x-2">
                    <Calendar className="text-gray-400" size={16} />
                    <span className="text-sm text-gray-600">{formatDate(order.createdAt)}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <DollarSign className="text-gray-400" size={16} />
                    <span className="text-sm text-gray-600">${order.totalAmount.toFixed(2)}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Leaf className="text-green-500" size={16} />
                    <span className="text-sm text-gray-600">+{order.edta.ecoBonus} EcoCoins</span>
                  </div>
                </div>
              </div>

              {/* Delivery Information */}
              <div className="p-6 border-b border-gray-100">
                <h4 className="font-semibold text-gray-900 mb-3">Delivery Information</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Customer</p>
                    <p className="font-medium text-gray-900">{order.name}</p>
                    <p className="text-sm text-gray-600">{order.phone}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Delivery Address</p>
                    <p className="font-medium text-gray-900">{order.address}</p>
                  </div>
                </div>
              </div>

              {/* Route Information */}
              <div className="p-6 border-b border-gray-100">
                <h4 className="font-semibold text-gray-900 mb-3">Delivery Route</h4>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h5 className="font-medium text-blue-900">{order.edta.route}</h5>
                    <span className="font-bold text-blue-900">{order.edta.cost}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <Clock className="text-blue-600" size={14} />
                        <span className="text-blue-700">{order.edta.time}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Leaf className="text-green-500" size={14} />
                        <span className="text-green-700">{order.edta.co2Saved} CO₂ saved</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Leaf className="text-green-500" size={14} />
                      <span className="text-green-700 font-medium">+{order.edta.ecoBonus} EcoCoins</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Order Items */}
              <div className="p-6">
                <h4 className="font-semibold text-gray-900 mb-3">Order Items</h4>
                <div className="space-y-3">
                  {order.edta.items.map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                          <Package className="text-blue-600" size={16} />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{item.name}</p>
                          <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-gray-900">${(item.price * item.quantity).toFixed(2)}</p>
                        <p className="text-sm text-blue-600">+{item.ecoPrice * item.quantity} EcoCoins</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrdersPage; 