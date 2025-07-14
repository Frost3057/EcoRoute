import React from 'react';
import { MapPin, Truck, Package } from 'lucide-react';

const RouteGraph: React.FC = () => {
  // Mock route data for visualization
  const routes = [
    { id: 1, driver: 'John Smith', color: 'bg-blue-500', stops: ['Downtown', 'Midtown', 'Uptown', 'Suburbs'] },
    { id: 2, driver: 'Sarah Johnson', color: 'bg-emerald-500', stops: ['East Side', 'West Side', 'North End', 'South End'] },
    { id: 3, driver: 'Mike Chen', color: 'bg-orange-500', stops: ['Business District', 'Residential', 'Mall District'] },
  ];

  return (
    <div className="bg-gray-50 rounded-lg p-6 min-h-[400px]">
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          {/* Placeholder Graph Visual */}
          <div className="relative w-full max-w-4xl mx-auto mb-6">
            <svg viewBox="0 0 800 300" className="w-full h-auto">
              {/* Background grid */}
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#e5e7eb" strokeWidth="1"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
              
              {/* Route paths */}
              <path d="M 50 100 Q 200 50 350 120 Q 500 180 650 80 Q 750 50 780 100" 
                    fill="none" stroke="#3b82f6" strokeWidth="3" strokeDasharray="5,5" opacity="0.8"/>
              <path d="M 50 150 Q 150 200 300 160 Q 450 120 600 180 Q 700 220 780 150" 
                    fill="none" stroke="#10b981" strokeWidth="3" strokeDasharray="5,5" opacity="0.8"/>
              <path d="M 50 200 Q 250 120 400 200 Q 550 280 780 200" 
                    fill="none" stroke="#f97316" strokeWidth="3" strokeDasharray="5,5" opacity="0.8"/>
              
              {/* Route markers */}
              {[
                { x: 50, y: 100, color: '#3b82f6' },
                { x: 200, y: 120, color: '#3b82f6' },
                { x: 500, y: 80, color: '#3b82f6' },
                { x: 780, y: 100, color: '#3b82f6' },
              ].map((point, index) => (
                <circle key={`blue-${index}`} cx={point.x} cy={point.y} r="6" fill={point.color} />
              ))}
              
              {[
                { x: 50, y: 150, color: '#10b981' },
                { x: 300, y: 160, color: '#10b981' },
                { x: 600, y: 180, color: '#10b981' },
                { x: 780, y: 150, color: '#10b981' },
              ].map((point, index) => (
                <circle key={`green-${index}`} cx={point.x} cy={point.y} r="6" fill={point.color} />
              ))}
              
              {[
                { x: 50, y: 200, color: '#f97316' },
                { x: 400, y: 200, color: '#f97316' },
                { x: 780, y: 200, color: '#f97316' },
              ].map((point, index) => (
                <circle key={`orange-${index}`} cx={point.x} cy={point.y} r="6" fill={point.color} />
              ))}
            </svg>
          </div>

          {/* Route Legend */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {routes.map((route) => (
              <div key={route.id} className="bg-white rounded-lg p-4 border border-gray-200">
                <div className="flex items-center mb-3">
                  <div className={`w-4 h-4 ${route.color} rounded-full mr-3`}></div>
                  <div className="flex items-center">
                    <Truck className="h-4 w-4 text-gray-600 mr-2" />
                    <span className="font-medium text-gray-900">{route.driver}</span>
                  </div>
                </div>
                <div className="space-y-1">
                  {route.stops.map((stop, index) => (
                    <div key={stop} className="flex items-center text-sm text-gray-600">
                      <MapPin className="h-3 w-3 mr-2" />
                      <span>{index + 1}. {stop}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Summary Stats */}
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <div className="flex items-center justify-center">
                <Truck className="h-6 w-6 text-blue-600 mr-2" />
                <div>
                  <p className="text-lg font-semibold text-gray-900">3</p>
                  <p className="text-sm text-gray-600">Active Routes</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <div className="flex items-center justify-center">
                <MapPin className="h-6 w-6 text-emerald-600 mr-2" />
                <div>
                  <p className="text-lg font-semibold text-gray-900">11</p>
                  <p className="text-sm text-gray-600">Total Stops</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <div className="flex items-center justify-center">
                <Package className="h-6 w-6 text-orange-600 mr-2" />
                <div>
                  <p className="text-lg font-semibold text-gray-900">75</p>
                  <p className="text-sm text-gray-600">Total Parcels</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 text-sm text-gray-500">
            * This is a placeholder visualization. In production, this would show real-time route data with interactive maps.
          </div>
        </div>
      </div>
    </div>
  );
};

export default RouteGraph;