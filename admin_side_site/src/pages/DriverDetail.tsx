import React from 'react';
import { ArrowLeft, Phone, Mail, Truck, Package, MapPin, Clock, User } from 'lucide-react';
import { Driver } from '../App';

interface DriverDetailProps {
  driver: Driver;
  onBack: () => void;
}

const DriverDetail: React.FC<DriverDetailProps> = ({ driver, onBack }) => {
  const totalDelivered = driver.status === 'on-route' 
    ? Math.floor(driver.totalParcels * 0.6) 
    : driver.status === 'active' ? driver.totalParcels : 0;
  
  const remaining = driver.totalParcels - totalDelivered;

  return (
    <div className="p-6">
      <div className="mb-8">
        <button
          onClick={onBack}
          className="flex items-center text-gray-600 hover:text-gray-900 mb-4 transition-colors duration-200"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Drivers
        </button>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{driver.name}</h1>
          </div>
          <span className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${
            driver.status === 'on-route' ? 'bg-blue-100 text-blue-800' :
            driver.status === 'active' ? 'bg-green-100 text-green-800' :
            'bg-gray-100 text-gray-800'
          }`}>
            {driver.status === 'on-route' ? 'On Route' : 
             driver.status === 'active' ? 'Available' : 'Inactive'}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Driver Information */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <User className="h-5 w-5 mr-2" />
            Driver Information
          </h3>
          
          <div className="space-y-4">
            <div className="flex items-center">
              <Phone className="h-4 w-4 text-gray-400 mr-3" />
              <span className="text-gray-700">{driver.phone}</span>
            </div>
            
            <div className="flex items-center">
              <Mail className="h-4 w-4 text-gray-400 mr-3" />
              <span className="text-gray-700">{driver.email}</span>
            </div>
            
            <div className="flex items-center">
              <Truck className="h-4 w-4 text-gray-400 mr-3" />
              <span className="text-gray-700">{driver.vehicle}</span>
            </div>
          </div>
        </div>

        {/* Delivery Stats */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Package className="h-5 w-5 mr-2" />
            Delivery Statistics
          </h3>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Total Parcels</span>
              <span className="font-semibold text-gray-900">{driver.totalParcels}</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Delivered</span>
              <span className="font-semibold text-green-600">{totalDelivered}</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Remaining</span>
              <span className="font-semibold text-orange-600">{remaining}</span>
            </div>

            <div className="pt-2">
              <div className="flex justify-between items-center text-sm mb-2">
                <span className="text-gray-600">Progress</span>
                <span className="font-medium text-gray-900">
                  {Math.round((totalDelivered / driver.totalParcels) * 100)}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(totalDelivered / driver.totalParcels) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Current Status */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Clock className="h-5 w-5 mr-2" />
            Current Status
          </h3>
          
          <div className="space-y-4">
            {driver.status === 'on-route' ? (
              <>
                <div className="p-3 bg-blue-50 rounded-lg">
                  <p className="text-sm font-medium text-blue-800">Currently delivering</p>
                  <p className="text-xs text-blue-600 mt-1">En route to next stop</p>
                </div>
                <div className="text-sm text-gray-600">
                  <p>Estimated completion: 2:30 PM</p>
                  <p>Next stop: {driver.route[Math.floor(driver.route.length * 0.6)]}</p>
                </div>
              </>
            ) : driver.status === 'active' ? (
              <div className="p-3 bg-green-50 rounded-lg">
                <p className="text-sm font-medium text-green-800">Available for assignment</p>
                <p className="text-xs text-green-600 mt-1">Ready to start delivery</p>
              </div>
            ) : (
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="text-sm font-medium text-gray-800">Off duty</p>
                <p className="text-xs text-gray-600 mt-1">Not available for deliveries</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Route Information */}
      <div className="mt-6 bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <MapPin className="h-5 w-5 mr-2" />
          Delivery Route & Parcels per Stop
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {driver.route.map((stop, index) => {
            const isCompleted = driver.status === 'on-route' && index < Math.floor(driver.route.length * 0.6);
            const isCurrent = driver.status === 'on-route' && index === Math.floor(driver.route.length * 0.6);
            
            return (
              <div
                key={stop}
                className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                  isCompleted 
                    ? 'border-green-200 bg-green-50' 
                    : isCurrent 
                      ? 'border-blue-200 bg-blue-50' 
                      : 'border-gray-200 bg-gray-50'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className={`font-medium ${
                    isCompleted ? 'text-green-800' : isCurrent ? 'text-blue-800' : 'text-gray-700'
                  }`}>
                    {stop}
                  </h4>
                  <span className={`text-xs px-2 py-1 rounded ${
                    isCompleted 
                      ? 'bg-green-100 text-green-700' 
                      : isCurrent 
                        ? 'bg-blue-100 text-blue-700' 
                        : 'bg-gray-100 text-gray-600'
                  }`}>
                    Stop {index + 1}
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Parcels:</span>
                  <span className={`font-semibold ${
                    isCompleted ? 'text-green-700' : isCurrent ? 'text-blue-700' : 'text-gray-700'
                  }`}>
                    {driver.deliveriesPerStop[stop]}
                  </span>
                </div>
                
                {isCompleted && (
                  <div className="mt-2 text-xs text-green-600 flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                    Delivered
                  </div>
                )}
                
                {isCurrent && (
                  <div className="mt-2 text-xs text-blue-600 flex items-center">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-2 animate-pulse"></div>
                    Current stop
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default DriverDetail;