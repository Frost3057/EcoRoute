import React from 'react';
import { MapPin, Navigation, Clock, Package } from 'lucide-react';

export const RouteGraph: React.FC = () => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold text-gray-800">Live Route Overview</h3>
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
          <span>Live Tracking</span>
        </div>
      </div>

      {/* Placeholder Graph Area */}
      <div className="relative bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg p-8 mb-6" style={{ height: '400px' }}>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <Navigation className="w-16 h-16 text-blue-500 mx-auto mb-4" />
            <h4 className="text-xl font-semibold text-gray-700 mb-2">Interactive Route Map</h4>
            <p className="text-gray-600 max-w-md">
              Real-time visualization of all active delivery routes. 
              This will show driver locations, delivery stops, and optimized paths.
            </p>
          </div>
        </div>

        {/* Mock Route Elements */}
        <div className="absolute top-4 left-4 bg-white rounded-lg p-3 shadow-md">
          <div className="flex items-center space-x-2">
            <MapPin className="w-4 h-4 text-red-500" />
            <span className="text-sm font-medium">3 Active Routes</span>
          </div>
        </div>

        <div className="absolute top-4 right-4 bg-white rounded-lg p-3 shadow-md">
          <div className="flex items-center space-x-2">
            <Clock className="w-4 h-4 text-green-500" />
            <span className="text-sm font-medium">Avg. ETA: 2.5 hrs</span>
          </div>
        </div>

        <div className="absolute bottom-4 left-4 bg-white rounded-lg p-3 shadow-md">
          <div className="flex items-center space-x-2">
            <Package className="w-4 h-4 text-blue-500" />
            <span className="text-sm font-medium">52 Parcels in Transit</span>
          </div>
        </div>

        {/* Mock Route Lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          <defs>
            <linearGradient id="routeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#1D4ED8" stopOpacity="0.8" />
            </linearGradient>
          </defs>
          <path
            d="M 50 100 Q 150 50 250 100 T 350 150"
            stroke="url(#routeGradient)"
            strokeWidth="3"
            fill="none"
            strokeDasharray="5,5"
            className="animate-pulse"
          />
          <path
            d="M 100 200 Q 200 150 300 200 T 400 250"
            stroke="url(#routeGradient)"
            strokeWidth="3"
            fill="none"
            strokeDasharray="5,5"
            className="animate-pulse"
            style={{ animationDelay: '0.5s' }}
          />
        </svg>
      </div>

      {/* Route Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-4 rounded-lg">
          <div className="text-2xl font-bold">7</div>
          <div className="text-sm opacity-90">Completed Deliveries</div>
        </div>
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-4 rounded-lg">
          <div className="text-2xl font-bold">15</div>
          <div className="text-sm opacity-90">In Progress</div>
        </div>
        <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white p-4 rounded-lg">
          <div className="text-2xl font-bold">30</div>
          <div className="text-sm opacity-90">Pending</div>
        </div>
        <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-4 rounded-lg">
          <div className="text-2xl font-bold">92%</div>
          <div className="text-sm opacity-90">On-Time Rate</div>
        </div>
      </div>
    </div>
  );
};