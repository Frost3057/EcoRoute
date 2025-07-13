import React from 'react';
import { Leaf, Grid3X3, List } from 'lucide-react';

interface Category {
  id: string;
  name: string;
  icon: React.ElementType;
}

interface Product {
  id: number;
  name: string;
  price: number;
  ecoPrice: number;
  image: string;
  category: string;
  rating: number;
  ecoFriendly: boolean;
  description: string;
}

interface HomeProps {
  categories: Category[];
  products: Product[];
  filteredProducts: Product[];
  viewMode: string;
  setViewMode: (mode: string) => void;
  selectedCategory: string;
  setSelectedCategory: (id: string) => void;
  addToCart: (product: Product) => void;
  toggleWishlist: (product: Product) => void;
  isInWishlist: (productId: number) => boolean;
}

const Home: React.FC<HomeProps> = ({
  categories,
  products,
  filteredProducts,
  viewMode,
  setViewMode,
  selectedCategory,
  setSelectedCategory,
  addToCart,
  toggleWishlist,
  isInWishlist
}) => {
  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-8 rounded-2xl animate-fade-in shadow-xl">
        <div className="max-w-4xl">
          <h1 className="text-4xl font-bold mb-4">Shop Sustainably with EcoRoute</h1>
          <p className="text-blue-100 mb-8 text-lg">Earn EcoCoins with every eco-friendly purchase and delivery choice. Make a difference while you shop!</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <p className="text-3xl font-bold">2.4 tons</p>
              <p className="text-blue-100">CO₂ Saved</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold">1,250</p>
              <p className="text-blue-100">Your EcoCoins</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold">32</p>
              <p className="text-blue-100">Trees Saved</p>
            </div>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="flex flex-col mt-8 mb-4">
        <h2 className="text-2xl font-bold text-gray-900">Shop by Category</h2>
        <div className="flex items-center space-x-2 overflow-x-auto scrollbar-thin scrollbar-thumb-blue-200 scrollbar-track-blue-50 py-2 px-1 -mx-2 md:mx-0 md:px-0">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-blue-100 text-blue-600' : 'text-gray-500 hover:bg-gray-100'}`}
          >
            <Grid3X3 size={20} />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-blue-100 text-blue-600' : 'text-gray-500 hover:bg-gray-100'}`}
          >
            <List size={20} />
          </button>
        </div>
      </div>

      <div className="flex space-x-4 pb-2 pl-1 md:pl-0">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`flex items-center space-x-2 px-6 py-3 rounded-xl whitespace-nowrap transition-all duration-200 shadow-sm border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400 ${
              selectedCategory === category.id
                ? 'bg-blue-600 text-white scale-105 shadow-lg'
                : 'bg-white text-gray-600 hover:bg-blue-50 hover:text-blue-700'
            }`}
          >
            <category.icon size={16} />
            <span>{category.name}</span>
          </button>
        ))}
      </div>

      {/* Products Grid */}
      <div className={`grid gap-6 ${
        viewMode === 'grid'
          ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
          : 'grid-cols-1'
      }`}>
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden transition-all duration-200 group focus-within:ring-2 focus-within:ring-blue-400 hover:shadow-2xl hover:-translate-y-1 hover:border-blue-200"
            tabIndex={0}
            aria-label={`Product: ${product.name}`}
          >
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
                className={`absolute top-2 right-2 p-2 rounded-full shadow-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                  isInWishlist(product.id)
                    ? 'bg-red-500 text-white hover:bg-red-600'
                    : 'bg-white text-gray-600 hover:bg-gray-100'
                }`}
                aria-label={isInWishlist(product.id) ? 'Remove from wishlist' : 'Add to wishlist'}
              >
                ♥
              </button>
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{product.name}</h3>
              <p className="text-gray-600 text-sm mb-2">{product.description}</p>
              <div className="flex items-center justify-between mt-2">
                <span className="font-bold text-blue-600 text-lg">${product.price}</span>
                <button
                  onClick={() => addToCart(product)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-semibold shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                  aria-label={`Add ${product.name} to cart`}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home; 