import React from 'react';
import { Package, Plus, Search } from 'lucide-react';

const Products: React.FC = () => {
  const products = [
    { id: 1, name: 'Organic Apples', category: 'Fruits', price: '$4.99', stock: 150, status: 'In Stock' },
    { id: 2, name: 'Fresh Bread', category: 'Bakery', price: '$2.49', stock: 45, status: 'In Stock' },
    { id: 3, name: 'Milk (1L)', category: 'Dairy', price: '$3.29', stock: 0, status: 'Out of Stock' },
    { id: 4, name: 'Chicken Breast', category: 'Meat', price: '$8.99', stock: 25, status: 'Low Stock' },
  ];

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Product Management</h1>
        </div>
        <div className="flex items-center space-x-3">
          <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm flex items-center hover:bg-gray-50">
            Import
          </button>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm flex items-center">
            <Plus className="h-4 w-4 mr-2" />
            Add Product
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">PRODUCT</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">CATEGORY</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">PRICE</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">STOCK</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">SOLD</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">RATING</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">STATUS</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                      <span className="text-green-600">🍌</span>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900">Organic Bananas</p>
                      <p className="text-xs text-green-600">🌱 Eco-Friendly</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Groceries</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <p className="text-sm text-gray-900">$2.99</p>
                  <p className="text-xs text-gray-500">% 150</p>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">245</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">1247</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <span className="text-yellow-400">★</span>
                    <span className="text-sm text-gray-900 ml-1">4.5</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                    Active
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <div className="flex items-center space-x-2">
                    <button className="text-blue-600 hover:text-blue-900">👁</button>
                    <button className="text-blue-600 hover:text-blue-900">✏️</button>
                    <button className="text-red-600 hover:text-red-900">🗑</button>
                  </div>
                </td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <span className="text-blue-600">🎧</span>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900">Wireless Headphones</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Electronics</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <p className="text-sm text-gray-900">$79.99</p>
                  <p className="text-xs text-gray-500">% 4900</p>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">67</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">234</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <span className="text-yellow-400">★</span>
                    <span className="text-sm text-gray-900 ml-1">4.8</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                    Active
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <div className="flex items-center space-x-2">
                    <button className="text-blue-600 hover:text-blue-900">👁</button>
                    <button className="text-blue-600 hover:text-blue-900">✏️</button>
                    <button className="text-red-600 hover:text-red-900">🗑</button>
                  </div>
                </td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                      <span className="text-green-600">👕</span>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900">Eco-Friendly T-Shirt</p>
                      <p className="text-xs text-green-600">🌱 Eco-Friendly</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Clothing</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <p className="text-sm text-gray-900">$24.99</p>
                  <p className="text-xs text-gray-500">% 1250</p>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600">0</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">567</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <span className="text-yellow-400">★</span>
                    <span className="text-sm text-gray-900 ml-1">4.3</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-red-100 text-red-800">
                    Out of Stock
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <div className="flex items-center space-x-2">
                    <button className="text-blue-600 hover:text-blue-900">👁</button>
                    <button className="text-blue-600 hover:text-blue-900">✏️</button>
                    <button className="text-red-600 hover:text-red-900">🗑</button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Products;