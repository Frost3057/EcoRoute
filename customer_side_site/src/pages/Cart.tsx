import React, { useState } from 'react';
import { ShoppingCart, Coins, Route, ChevronRight, Clock, Leaf, Plus, Minus, X, CheckCircle, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface CartItem {
  id: number;
  name: string;
  price: number;
  ecoPrice: number;
  image: string;
  quantity: number;
  ecoFriendly: boolean;
  description: string;
}

interface DeliveryRoute {
  id: number;
  name: string;
  time: string;
  cost: string;
  ecoBonus: number;
  co2Saved: string;
  description: string;
}

interface OrderForm {
  name: string;
  phone: string;
  address: string;
}

interface CartProps {
  cartItems: CartItem[];
  updateQuantity: (productId: number, newQuantity: number) => void;
  removeFromCart: (productId: number) => void;
  getTotalPrice: () => number;
  getTotalEcoPrice: () => number;
  deliveryRoutes: DeliveryRoute[];
  showRouteOptions: boolean;
  setShowRouteOptions: (show: boolean) => void;
  clearCart: () => void;
}

const CartPage: React.FC<CartProps> = ({
  cartItems,
  updateQuantity,
  removeFromCart,
  getTotalPrice,
  getTotalEcoPrice,
  deliveryRoutes,
  showRouteOptions,
  setShowRouteOptions,
  clearCart
}) => {
  const navigate = useNavigate();
  const [showCheckout, setShowCheckout] = useState(false);
  const [selectedRoute, setSelectedRoute] = useState<DeliveryRoute | null>(deliveryRoutes[0]); // Default to Eco-Friendly Route
  const [orderForm, setOrderForm] = useState<OrderForm>({
    name: 'John Doe',
    phone: '+1 (555) 123-4567',
    address: '123 Main Street, Anytown, ST 12345'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderStatus, setOrderStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [orderMessage, setOrderMessage] = useState('');

  const handleInputChange = (field: keyof OrderForm, value: string) => {
    setOrderForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handlePlaceOrder = async () => {
    if (!selectedRoute) {
      setOrderStatus('error');
      setOrderMessage('Please select a delivery route');
      return;
    }

    setIsSubmitting(true);
    setOrderStatus('idle');

    try {
      // Create order object in the required format
      const orderData = {
        cust_id: "1234", // Fixed customer ID as requested
        status: "pending",
        createdAt: new Date().toISOString(),
        totalAmount: getTotalPrice(),
        address: orderForm.address,
        name: orderForm.name,
        phone: orderForm.phone,
        edta: {
          route: selectedRoute.name,
          time: selectedRoute.time,
          cost: selectedRoute.cost,
          ecoBonus: selectedRoute.ecoBonus,
          co2Saved: selectedRoute.co2Saved,
          items: cartItems.map(item => ({
            id: item.id,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            ecoPrice: item.ecoPrice
          }))
        }
      };

      // Send order to backend API
      const response = await fetch('http://localhost:8000/order/place_order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData)
      });

      if (response.ok) {
        const result = await response.json();
        setOrderStatus('success');
        setOrderMessage(`Order placed successfully! Order ID: ${result.message}`);
        // Clear cart and redirect after a delay
        clearCart();
        setTimeout(() => {
          navigate('/orders');
        }, 2000);
      } else {
        throw new Error('Failed to place order');
      }
    } catch (error) {
      setOrderStatus('error');
      setOrderMessage('Failed to place order. Please try again.');
      console.error('Order placement error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <div className="text-center py-12">
          <ShoppingCart className="text-gray-400 mx-auto mb-4" size={64} />
          <p className="text-gray-600 mb-4">Your cart is empty</p>
          <button
            onClick={() => navigate('/')}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Continue Shopping
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {cartItems.map((item) => (
              <div key={item.id} className="flex items-center space-x-4 bg-white p-4 rounded-2xl shadow-md border border-gray-100 hover:shadow-xl transition-all duration-200 group focus-within:ring-2 focus-within:ring-blue-400" tabIndex={0} aria-label={`Cart item: ${item.name}`}>
                <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-lg" />
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-1">{item.name}</h3>
                  <p className="text-sm text-gray-600 mb-2">{item.description}</p>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="p-1 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
                      aria-label={`Decrease quantity of ${item.name}`}
                    >
                      <Minus size={16} />
                    </button>
                    <span className="w-8 text-center font-medium">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="p-1 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
                      aria-label={`Increase quantity of ${item.name}`}
                    >
                      <Plus size={16} />
                    </button>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-500 hover:text-red-700 ml-4 focus:outline-none focus:ring-2 focus:ring-red-400"
                      aria-label={`Remove ${item.name} from cart`}
                    >
                      <X size={20} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="space-y-6">
            {/* Order Summary */}
            <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">${getTotalPrice().toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">EcoCoins Option</span>
                  <div className="flex items-center space-x-1">
                    <Coins className="text-blue-600" size={14} />
                    <span className="font-medium text-blue-600">{getTotalEcoPrice()} EcoCoins</span>
                  </div>
                </div>
                <div className="border-t pt-3">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span>${getTotalPrice().toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Delivery Options */}
            <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Choose Delivery Route</h3>
              <button
                onClick={() => setShowRouteOptions(!showRouteOptions)}
                className="w-full flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <div className="flex items-center space-x-2">
                  <Route size={20} className="text-blue-600" />
                  <span>{selectedRoute ? selectedRoute.name : 'Select Route'}</span>
                </div>
                <ChevronRight size={20} className={`transform transition-transform ${showRouteOptions ? 'rotate-90' : ''}`} />
              </button>
              {showRouteOptions && (
                <div className="mt-4 space-y-3">
                  {deliveryRoutes.map((route) => (
                    <div 
                      key={route.id} 
                      className={`p-4 border rounded-lg cursor-pointer focus-within:ring-2 focus-within:ring-blue-400 transition-all ${
                        selectedRoute?.id === route.id 
                          ? 'border-blue-500 bg-blue-50' 
                          : 'border-gray-200 hover:border-blue-300'
                      }`}
                      tabIndex={0} 
                      aria-label={`Delivery route: ${route.name}`}
                      onClick={() => setSelectedRoute(route)}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-gray-900">{route.name}</h4>
                        <span className="font-bold text-gray-900">{route.cost}</span>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{route.description}</p>
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-1">
                            <Clock size={14} className="text-gray-500" />
                            <span>{route.time}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Leaf size={14} className="text-green-500" />
                            <span>{route.co2Saved} CO₂ saved</span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Coins className="text-blue-600" size={14} />
                          <span className="text-blue-600 font-medium">+{route.ecoBonus} EcoCoins</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Checkout Form */}
            {showCheckout && (
              <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Delivery Information</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <input
                      type="text"
                      value={orderForm.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                    <input
                      type="tel"
                      value={orderForm.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter your phone number"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Delivery Address</label>
                    <textarea
                      value={orderForm.address}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      rows={3}
                      placeholder="Enter your delivery address"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Order Status Message */}
            {orderStatus !== 'idle' && (
              <div className={`p-4 rounded-lg flex items-center space-x-2 ${
                orderStatus === 'success' 
                  ? 'bg-green-50 text-green-800 border border-green-200' 
                  : 'bg-red-50 text-red-800 border border-red-200'
              }`}>
                {orderStatus === 'success' ? (
                  <CheckCircle size={20} className="text-green-600" />
                ) : (
                  <AlertCircle size={20} className="text-red-600" />
                )}
                <span className="text-sm font-medium">{orderMessage}</span>
              </div>
            )}

            {/* Checkout Button */}
            <button 
              className={`w-full py-3 rounded-lg font-medium text-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all ${
                isSubmitting 
                  ? 'bg-gray-400 text-white cursor-not-allowed' 
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
              onClick={() => {
                if (!showCheckout) {
                  setShowCheckout(true);
                } else {
                  handlePlaceOrder();
                }
              }}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Placing Order...' : showCheckout ? 'Place Order' : 'Proceed to Checkout'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage; 