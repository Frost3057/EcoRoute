import React from 'react';
import { User, Phone, Package, MapPin, Clock } from 'lucide-react';
import { Driver } from '../types/driver';

interface DriverTileProps {
  driver: Driver;
  onClick: (driverId: string) => void;
}

export const DriverTile: React.FC<DriverTileProps> = ({ driver, onClick }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'on-route':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'inactive':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return '🟢';
      case 'on-route':
        return '🚛';
      case 'inactive':
        return '⚪';
      default:
        return '⚪';
    }
  };

  return (
    <div
      onClick={() => onClick(driver.id)}
      className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer transform hover:scale-105 border border-gray-100"
    >
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
              <User className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 text-lg">{driver.name}</h3>
              <p className="text-sm text-gray-600 flex items-center">
                <Phone className="w-3 h-3 mr-1" />
                {driver.phoneNumber}
              </p>
            </div>
          </div>
          <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(driver.status)}`}>
            {getStatusIcon(driver.status)} {driver.status.charAt(0).toUpperCase() + driver.status.slice(1)}
          </span>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center text-sm text-gray-600">
              <Package className="w-4 h-4 mr-2 text-blue-500" />
              <span>Total Parcels</span>
            </div>
            <span className="font-semibold text-gray-800">{driver.totalParcels}</span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center text-sm text-gray-600">
              <MapPin className="w-4 h-4 mr-2 text-red-500" />
              <span>Delivery Stops</span>
            </div>
            <span className="font-semibold text-gray-800">{driver.deliveryStops.length}</span>
          </div>

          <div className="pt-3 border-t border-gray-100">
            <div className="flex items-center text-sm text-gray-600">
              <Clock className="w-4 h-4 mr-2 text-green-500" />
              <span className="truncate">{driver.currentRoute}</span>
            </div>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="text-xs text-gray-500 text-center">
            Click to view detailed information
          </div>
        </div>
      </div>
    </div>
  );
};