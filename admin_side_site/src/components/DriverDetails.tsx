import React from 'react';
import { ArrowLeft, User, Phone, Mail, CreditCard, Truck, Package, MapPin, Clock, CheckCircle, AlertCircle, Circle } from 'lucide-react';
import { Driver } from '../types/driver';

interface DriverDetailsProps {
  driver: Driver;
  onBack: () => void;
}

export const DriverDetails: React.FC<DriverDetailsProps> = ({ driver, onBack }) => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'in-progress':
        return <AlertCircle className="w-5 h-5 text-yellow-500" />;
      case 'pending':
        return <Circle className="w-5 h-5 text-gray-400" />;
      default:
        return <Circle className="w-5 h-5 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-50 border-green-200';
      case 'in-progress':
        return 'bg-yellow-50 border-yellow-200';
      case 'pending':
        return 'bg-gray-50 border-gray-200';
      default:
        return 'bg-gray-50 border-gray-200';
    }
  };

  const completedStops = driver.deliveryStops.filter(stop => stop.status === 'completed').length;
  const totalStops = driver.deliveryStops.length;
  const progressPercentage = totalStops > 0 ? (completedStops / totalStops) * 100 : 0;

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={onBack}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Dashboard</span>
          </button>
          <div className="text-sm text-gray-500">
            Driver ID: {driver.id}
          </div>
        </div>

        <div className="flex items-start space-x-6">
          <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
            <User className="w-10 h-10 text-white" />
          </div>
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">{driver.name}</h1>
            <p className="text-gray-600 mb-4">{driver.currentRoute}</p>
            <div className="flex items-center space-x-6 text-sm text-gray-600">
              <div className="flex items-center">
                <Phone className="w-4 h-4 mr-2" />
                {driver.phoneNumber}
              </div>
              <div className="flex items-center">
                <Mail className="w-4 h-4 mr-2" />
                {driver.email}
              </div>
              <div className="flex items-center">
                <Truck className="w-4 h-4 mr-2" />
                {driver.vehicleType}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Driver Information */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Driver Information</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">License Number</span>
              <span className="font-medium">{driver.licenseNumber}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Vehicle Type</span>
              <span className="font-medium">{driver.vehicleType}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Status</span>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                driver.status === 'active' ? 'bg-green-100 text-green-800' :
                driver.status === 'on-route' ? 'bg-blue-100 text-blue-800' :
                'bg-gray-100 text-gray-800'
              }`}>
                {driver.status.charAt(0).toUpperCase() + driver.status.slice(1)}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Total Parcels</span>
              <span className="font-medium text-lg">{driver.totalParcels}</span>
            </div>
          </div>
        </div>

        {/* Delivery Progress */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Delivery Progress</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Completed Stops</span>
              <span className="font-medium">{completedStops} / {totalStops}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="bg-gradient-to-r from-green-500 to-green-600 h-3 rounded-full transition-all duration-300"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
            <div className="text-center text-sm text-gray-600">
              {progressPercentage.toFixed(1)}% Complete
            </div>
            <div className="grid grid-cols-3 gap-2 text-center text-sm">
              <div className="bg-green-50 p-2 rounded">
                <div className="font-medium text-green-800">{completedStops}</div>
                <div className="text-green-600">Completed</div>
              </div>
              <div className="bg-yellow-50 p-2 rounded">
                <div className="font-medium text-yellow-800">
                  {driver.deliveryStops.filter(s => s.status === 'in-progress').length}
                </div>
                <div className="text-yellow-600">In Progress</div>
              </div>
              <div className="bg-gray-50 p-2 rounded">
                <div className="font-medium text-gray-800">
                  {driver.deliveryStops.filter(s => s.status === 'pending').length}
                </div>
                <div className="text-gray-600">Pending</div>
              </div>
            </div>
          </div>
        </div>

        {/* Route Summary */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Route Summary</h2>
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <MapPin className="w-5 h-5 text-red-500" />
              <div>
                <div className="font-medium">Current Route</div>
                <div className="text-sm text-gray-600">{driver.currentRoute}</div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Package className="w-5 h-5 text-blue-500" />
              <div>
                <div className="font-medium">Total Parcels</div>
                <div className="text-sm text-gray-600">{driver.totalParcels} items to deliver</div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Clock className="w-5 h-5 text-green-500" />
              <div>
                <div className="font-medium">Estimated Completion</div>
                <div className="text-sm text-gray-600">
                  {driver.deliveryStops.length > 0 
                    ? driver.deliveryStops[driver.deliveryStops.length - 1].estimatedTime
                    : 'N/A'
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Delivery Stops */}
      <div className="bg-white rounded-xl shadow-lg p-6 mt-6">
        <h2 className="text-xl font-bold text-gray-800 mb-6">Delivery Stops</h2>
        <div className="space-y-4">
          {driver.deliveryStops.map((stop, index) => (
            <div
              key={stop.id}
              className={`border rounded-lg p-4 transition-all ${getStatusColor(stop.status)}`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4">
                  <div className="flex items-center justify-center w-8 h-8 bg-white rounded-full border-2 border-gray-300">
                    <span className="text-sm font-medium">{index + 1}</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      {getStatusIcon(stop.status)}
                      <h3 className="font-medium text-gray-800">{stop.address}</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                      <div className="flex items-center">
                        <Package className="w-4 h-4 mr-2" />
                        {stop.parcelsCount} parcels
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-2" />
                        ETA: {stop.estimatedTime}
                      </div>
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-2" />
                        {stop.coordinates.lat.toFixed(4)}, {stop.coordinates.lng.toFixed(4)}
                      </div>
                    </div>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  stop.status === 'completed' ? 'bg-green-100 text-green-800' :
                  stop.status === 'in-progress' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {stop.status.charAt(0).toUpperCase() + stop.status.slice(1)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};