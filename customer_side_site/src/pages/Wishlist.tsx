import React from 'react';
import { Leaf, Heart, Star, Coins } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface WishlistItem {
  id: number;
  name: string;
  price: number;
  ecoPrice: number;
  image: string;
  ecoFriendly: boolean;
  description: string;
  rating: number;
}

interface WishlistProps {
  wishlistItems: WishlistItem[];
  addToCart: (product: WishlistItem) => void;
  toggleWishlist: (product: WishlistItem) => void;
  isInWishlist: (productId: number) => boolean;
}

const WishlistPage: React.FC<WishlistProps> = ({
  wishlistItems,
  addToCart,
  toggleWishlist,
  isInWishlist
}) => {
  const navigate = useNavigate();
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Your Wishlist</h2>
      {wishlistItems.length === 0 ? (
        <div className="text-center py-12">
          <Heart className="text-gray-400 mx-auto mb-4" size={64} />
          <p className="text-gray-600 mb-4">Your wishlist is empty</p>
          <button
            onClick={() => navigate('/')}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Start Shopping
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {wishlistItems.map((product) => (
            <div key={product.id} className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-200 group focus-within:ring-2 focus-within:ring-blue-400" tabIndex={0} aria-label={`Wishlist item: ${product.name}`}>
              <div className="relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover group-hover:scale-105 group-focus-within:scale-105 transition-transform duration-300"
                />
                {product.ecoFriendly && (
                  <div className="absolute top-2 left-2 bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1">
                    <Leaf size={12} />
                    <span>Eco-Friendly</span>
                  </div>
                )}
                <button
                  onClick={() => toggleWishlist(product)}
                  className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full shadow-md hover:bg-red-600 transition-colors focus:outline-none focus:ring-2 focus:ring-red-400"
                  aria-label={isInWishlist(product.id) ? 'Remove from wishlist' : 'Add to wishlist'}
                >
                  <Heart size={16} className="fill-current" />
                </button>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 mb-1">{product.name}</h3>
                <p className="text-sm text-gray-600 mb-2">{product.description}</p>
                <div className="flex items-center space-x-1 mb-3">
                  <Star className="text-yellow-400 fill-current" size={16} />
                  <span className="text-sm text-gray-600">{product.rating}</span>
                </div>
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <p className="text-lg font-bold text-gray-900">${product.price}</p>
                    <div className="flex items-center space-x-1">
                      <Coins className="text-blue-600" size={14} />
                      <span className="text-sm text-blue-600 font-medium">{product.ecoPrice} EcoCoins</span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => addToCart(product)}
                  className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium focus:outline-none focus:ring-2 focus:ring-blue-400"
                  aria-label={`Add ${product.name} to cart`}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WishlistPage; 