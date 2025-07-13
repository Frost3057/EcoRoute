import React, { useState } from 'react';
import { NavLink, Routes, Route, useNavigate } from 'react-router-dom';
import {
  ShoppingCart,
  Search,
  User,
  Heart,
  Star,
  Plus,
  Minus,
  Leaf,
  Coins,
  MapPin,
  Clock,
  Truck,
  Filter,
  Grid3X3,
  List,
  Home,
  Package,
  CreditCard,
  Settings,
  Bell,
  Menu,
  X,
  ChevronRight,
  Award,
  Route as RouteIcon,
  Edit,
  Mail,
  Phone,
  Calendar,
  Shield,
  MessageCircle
} from 'lucide-react';
import HomePage from './pages/Home';
import CartPage from './pages/Cart';
import WishlistPage from './pages/Wishlist';
import ProfilePage from './pages/Profile';
import EcoCoinsPage from './pages/EcoCoins';
import OrdersPage from './pages/Orders';

function App() {
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [wishlistItems, setWishlistItems] = useState<any[]>([]);
  const [ecoCoins, setEcoCoins] = useState(1250);
  const [viewMode, setViewMode] = useState('grid');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showRouteOptions, setShowRouteOptions] = useState(false);
  const navigate = useNavigate();
  const [chatOpen, setChatOpen] = useState(false);
  const [chatHistory, setChatHistory] = useState([
    { sender: 'bot', text: 'Hi! I am EcoAgent. How can I help you today?' }
  ]);
  const [chatInput, setChatInput] = useState('');

  const handleSendMessage = () => {
    if (!chatInput.trim()) return;
    setChatHistory([...chatHistory, { sender: 'user', text: chatInput }]);
    setChatInput('');
    setTimeout(() => {
      setChatHistory((prev) => [
        ...prev,
        { sender: 'bot', text: 'This is a placeholder response from EcoAgent.' }
      ]);
    }, 600);
  };

  const categories = [
    { id: 'all', name: 'All Products', icon: Grid3X3 },
    { id: 'groceries', name: 'Groceries', icon: Package },
    { id: 'electronics', name: 'Electronics', icon: Package },
    { id: 'clothing', name: 'Clothing', icon: Package },
    { id: 'home', name: 'Home & Garden', icon: Home }
  ];

  const products = [
    {
      id: 1,
      name: 'Organic Bananas',
      price: 2.99,
      ecoPrice: 150,
      image: 'https://images.pexels.com/photos/2872755/pexels-photo-2872755.jpeg?auto=compress&cs=tinysrgb&w=300',
      category: 'groceries',
      rating: 4.5,
      ecoFriendly: true,
      description: 'Fresh organic bananas, sustainably sourced'
    },
    {
      id: 2,
      name: 'Wireless Headphones',
      price: 79.99,
      ecoPrice: 4000,
      image: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=300',
      category: 'electronics',
      rating: 4.8,
      ecoFriendly: false,
      description: 'High-quality wireless headphones with noise cancellation'
    },
    {
      id: 3,
      name: 'Eco-Friendly T-Shirt',
      price: 24.99,
      ecoPrice: 1250,
      image: 'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=300',
      category: 'clothing',
      rating: 4.3,
      ecoFriendly: true,
      description: 'Made from 100% organic cotton'
    },
    {
      id: 4,
      name: 'Smart LED Bulbs',
      price: 34.99,
      ecoPrice: 1750,
      image: 'https://images.pexels.com/photos/1036936/pexels-photo-1036936.jpeg?auto=compress&cs=tinysrgb&w=300',
      category: 'home',
      rating: 4.6,
      ecoFriendly: true,
      description: 'Energy-efficient smart LED bulbs'
    },
    {
      id: 5,
      name: 'Fresh Avocados',
      price: 4.99,
      ecoPrice: 250,
      image: 'https://images.pexels.com/photos/557659/pexels-photo-557659.jpeg?auto=compress&cs=tinysrgb&w=300',
      category: 'groceries',
      rating: 4.4,
      ecoFriendly: true,
      description: 'Ripe avocados perfect for your meals'
    },
    {
      id: 6,
      name: 'Bluetooth Speaker',
      price: 49.99,
      ecoPrice: 2500,
      image: 'https://images.pexels.com/photos/1649771/pexels-photo-1649771.jpeg?auto=compress&cs=tinysrgb&w=300',
      category: 'electronics',
      rating: 4.2,
      ecoFriendly: false,
      description: 'Portable Bluetooth speaker with great sound'
    }
  ];

  const deliveryRoutes = [
    {
      id: 1,
      name: 'Eco-Friendly Route',
      time: '45-60 min',
      cost: 'Free',
      ecoBonus: 50,
      co2Saved: '2.3kg',
      description: 'Optimized for minimal environmental impact'
    },
    {
      id: 2,
      name: 'Standard Route',
      time: '30-45 min',
      cost: '$4.99',
      ecoBonus: 25,
      co2Saved: '1.1kg',
      description: 'Balanced speed and efficiency'
    },
    {
      id: 3,
      name: 'Express Route',
      time: '15-30 min',
      cost: '$9.99',
      ecoBonus: 10,
      co2Saved: '0.5kg',
      description: 'Fastest delivery available'
    }
  ];

  const userProfile = {
    name: 'John Doe',
    email: 'john.doe@email.com',
    phone: '+1 (555) 123-4567',
    address: '123 Main Street, Anytown, ST 12345',
    memberSince: 'January 2023',
    membershipType: 'Premium Member',
    totalOrders: 47,
    totalSaved: 156.78,
    co2Saved: 2.4,
    treesEquivalent: 32
  };

  const filteredProducts = selectedCategory === 'all'
    ? products
    : products.filter(product => product.category === selectedCategory);

  const addToCart = (product: any) => {
    setCartItems(prev => {
      const existing = prev.find((item: any) => item.id === product.id);
      if (existing) {
        return prev.map((item: any) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const toggleWishlist = (product: any) => {
    setWishlistItems(prev => {
      const existing = prev.find((item: any) => item.id === product.id);
      if (existing) {
        return prev.filter((item: any) => item.id !== product.id);
      }
      return [...prev, product];
    });
  };

  const isInWishlist = (productId: number) => {
    return wishlistItems.some((item: any) => item.id === productId);
  };

  const removeFromCart = (productId: number) => {
    setCartItems(prev => prev.filter((item: any) => item.id !== productId));
  };

  const updateQuantity = (productId: number, newQuantity: number) => {
    if (newQuantity === 0) {
      removeFromCart(productId);
      return;
    }
    setCartItems(prev =>
      prev.map((item: any) =>
        item.id === productId
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getTotalEcoPrice = () => {
    return cartItems.reduce((total, item) => total + (item.ecoPrice * item.quantity), 0);
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const NavItem = ({ icon: Icon, label, to, count }: { icon: any, label: string, to: string, count?: number }) => (
    <NavLink
      to={to}
      className={({ isActive }: { isActive: boolean }) =>
        `flex items-center space-x-3 w-full p-3 rounded-lg transition-all duration-200 ${
          isActive
            ? 'bg-blue-600 text-white shadow-lg'
            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
        }`
      }
      onClick={() => setSidebarOpen(false)}
    >
      <Icon size={20} />
      <span className="font-medium flex items-center">
        {label}
        {label === 'Wishlist' && count && count > 0 && (
          <span className="ml-2 bg-blue-100 text-blue-700 text-xs font-semibold px-2 py-0.5 rounded-full">
            {count}
          </span>
        )}
      </span>
    </NavLink>
  );

  return (
    <div className="h-screen bg-gray-50 flex overflow-hidden">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-xl transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:flex-shrink-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="h-full flex flex-col">
          {/* Logo */}
          <div className="flex items-center justify-between p-6 border-b flex-shrink-0">
            <div className="flex items-center space-x-2 animate-fade-in">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <Leaf className="text-white" size={20} />
              </div>
              <span className="text-2xl font-extrabold tracking-tight text-blue-700 font-sans" style={{ letterSpacing: '0.04em' }}>
                EcoRoute
              </span>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden text-gray-500 hover:text-gray-700"
            >
              <X size={20} />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
            <NavItem icon={Home} label="Home" to="/" />
            <NavItem icon={ShoppingCart} label="Cart" to="/cart" count={cartItems.length} />
            <NavItem icon={Coins} label="EcoCoins" to="/ecocoins" />
            <NavItem icon={Package} label="Orders" to="/orders" />
            <NavItem icon={Heart} label="Wishlist" to="/wishlist" count={wishlistItems.length} />
            <NavItem icon={User} label="Profile" to="/profile" />
          </nav>

          {/* Profile Section - Fixed at bottom */}
          <div className="p-4 border-t flex-shrink-0 bg-white">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-gray-600">EcoCoins Balance</span>
              <div className="flex items-center space-x-1">
                <Coins className="text-blue-600" size={16} />
                <span className="font-bold text-blue-600">{ecoCoins.toLocaleString()}</span>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-600 font-semibold">JD</span>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">John Doe</p>
                <p className="text-xs text-gray-500">Premium Member</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm border-b flex-shrink-0 z-30">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center space-x-4 flex-1">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden text-gray-500 hover:text-gray-700"
              >
                <Menu size={20} />
              </button>
              <div className="relative flex-1 max-w-2xl">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search products..."
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                />
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full">
                <Bell size={20} />
              </button>
              <NavLink
                to="/cart"
                className="relative p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full"
              >
                <ShoppingCart size={20} />
                {cartItems.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cartItems.length}
                  </span>
                )}
              </NavLink>
              <div className="flex items-center space-x-2 bg-blue-50 px-4 py-2 rounded-lg">
                <Coins className="text-blue-600" size={16} />
                <span className="font-semibold text-blue-600">{ecoCoins.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-6 overflow-y-auto">
          <Routes>
            <Route
              path="/"
              element={
                <HomePage
                  categories={categories}
                  products={products}
                  filteredProducts={filteredProducts}
                  viewMode={viewMode}
                  setViewMode={setViewMode}
                  selectedCategory={selectedCategory}
                  setSelectedCategory={setSelectedCategory}
                  addToCart={addToCart}
                  toggleWishlist={toggleWishlist}
                  isInWishlist={isInWishlist}
                />
              }
            />
            <Route
              path="/cart"
              element={
                <CartPage
                  cartItems={cartItems}
                  updateQuantity={updateQuantity}
                  removeFromCart={removeFromCart}
                  getTotalPrice={getTotalPrice}
                  getTotalEcoPrice={getTotalEcoPrice}
                  deliveryRoutes={deliveryRoutes}
                  showRouteOptions={showRouteOptions}
                  setShowRouteOptions={setShowRouteOptions}
                  clearCart={clearCart}
                />
              }
            />
            <Route
              path="/wishlist"
              element={
                <WishlistPage
                  wishlistItems={wishlistItems}
                  addToCart={addToCart}
                  toggleWishlist={toggleWishlist}
                  isInWishlist={isInWishlist}
                />
              }
            />
            <Route
              path="/profile"
              element={<ProfilePage userProfile={userProfile} ecoCoins={ecoCoins} />}
            />
            <Route
              path="/ecocoins"
              element={<EcoCoinsPage ecoCoins={ecoCoins} />}
            />
            <Route
              path="/orders"
              element={<OrdersPage />}
            />
          </Routes>
        </main>
      </div>
      {/* Floating Chatbot Widget */}
      <button
        className="fixed z-50 bottom-6 right-6 bg-blue-600 text-white rounded-full shadow-lg p-4 flex items-center space-x-2 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
        aria-label="Open EcoAgent chatbot"
        onClick={() => setChatOpen(true)}
        style={{ display: chatOpen ? 'none' : 'flex' }}
      >
        <MessageCircle size={24} className="mr-1" />
        <span className="font-semibold">EcoAgent</span>
      </button>
      {chatOpen && (
        <div className="fixed z-50 bottom-6 right-6 w-80 max-w-full bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col animate-fade-in">
          <div className="flex items-center justify-between p-4 border-b">
            <div className="flex items-center space-x-2">
              <MessageCircle size={20} className="text-blue-600" />
              <span className="font-bold text-blue-700">EcoAgent</span>
            </div>
            <button
              className="text-gray-400 hover:text-gray-600 focus:outline-none"
              aria-label="Close chat"
              onClick={() => setChatOpen(false)}
            >
              <X size={20} />
            </button>
          </div>
          <div className="flex-1 p-4 space-y-2 overflow-y-auto max-h-80">
            {chatHistory.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`px-3 py-2 rounded-lg text-sm max-w-[75%] ${
                    msg.sender === 'user'
                      ? 'bg-blue-600 text-white rounded-br-none'
                      : 'bg-gray-100 text-gray-900 rounded-bl-none'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>
          <form
            className="flex items-center border-t p-2"
            onSubmit={e => {
              e.preventDefault();
              handleSendMessage();
            }}
          >
            <input
              type="text"
              className="flex-1 px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
              placeholder="Type your message..."
              value={chatInput}
              onChange={e => setChatInput(e.target.value)}
              aria-label="Type your message"
              onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) handleSendMessage(); }}
            />
            <button
              type="submit"
              className="ml-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 font-semibold"
              aria-label="Send message"
            >
              Send
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default App;