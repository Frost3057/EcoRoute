import React from 'react';
import { Plus, MapPin, Package, Truck, Clock } from 'lucide-react';
import { Driver } from '../App';
import RouteGraph from '../components/RouteGraph';

interface DriversProps {
  drivers: Driver[];
  onDriverClick: (driverId: string) => void;
}

const Drivers: React.FC<DriversProps> = ({ drivers, onDriverClick }) => {
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Drivers</h1>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center transition-colors duration-200">
          <Plus className="h-4 w-4 mr-2" />
          Add Driver
        </button>
      </div>

      {/* Route Graph */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Delivery Routes Overview</h3>
        <RouteGraph />
      </div>

      {/* Driver Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {drivers.map((driver) => (
          <div
            key={driver.id}
            onClick={() => onDriverClick(driver.id)}
            className="bg-white rounded-lg border border-gray-200 p-6 cursor-pointer hover:shadow-lg transition-shadow duration-200"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                  <Truck className="h-6 w-6 text-blue-600" />
                </div>
                <div className="ml-3">
                  <h4 className="text-lg font-medium text-gray-900">{driver.name}</h4>
                  <p className="text-sm text-gray-600">{driver.phone}</p>
                </div>
              </div>
              <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                driver.status === 'on-route' ? 'bg-blue-100 text-blue-800' :
                driver.status === 'active' ? 'bg-green-100 text-green-800' :
                'bg-gray-100 text-gray-800'
              }`}>
                {driver.status === 'on-route' ? 'On Route' : 
                 driver.status === 'active' ? 'Available' : 'Inactive'}
              </span>
            </div>

            <div className="space-y-3">
              <div className="flex items-center text-sm text-gray-600">
                <Package className="h-4 w-4 mr-2" />
                <span>{driver.totalParcels} parcels assigned</span>
              </div>
              
              <div className="flex items-center text-sm text-gray-600">
                <Truck className="h-4 w-4 mr-2" />
                <span>{driver.vehicle}</span>
              </div>

              <div className="flex items-center text-sm text-gray-600">
                <MapPin className="h-4 w-4 mr-2" />
                <span>{driver.route.length} stops on route</span>
              </div>

              {driver.status === 'on-route' && (
                <div className="flex items-center text-sm text-blue-600">
                  <Clock className="h-4 w-4 mr-2" />
                  <span>Currently delivering</span>
                </div>
              )}
            </div>

            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-600">Route Progress</span>
                <span className="font-medium text-gray-900">
                  {driver.status === 'on-route' ? '60%' : '0%'}
                </span>
              </div>
              <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: driver.status === 'on-route' ? '60%' : '0%' }}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Drivers;