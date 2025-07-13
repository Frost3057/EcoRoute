import React from 'react';
import { Package } from 'lucide-react';

const OrdersPage: React.FC = () => {
  return (
    <div className="bg-white p-8 rounded-2xl shadow-md border border-gray-100 text-center focus-within:ring-2 focus-within:ring-blue-400" tabIndex={0}>
      <Package className="text-gray-400 mx-auto mb-4" size={64} />
      <h3 className="text-lg font-semibold text-gray-900 mb-2">Order History</h3>
      <p className="text-gray-600">This section is coming soon!</p>
    </div>
  );
};

export default OrdersPage; 