import React from 'react';
import { Plus, MapPin, Package, Truck, Clock } from 'lucide-react';
import { Driver, PageType } from '../App';
import RouteGraph from '../components/RouteGraph';

interface DriversProps {
  drivers: Driver[];
  onDriverClick: (driverId: string) => void;
  loading: boolean;
  error: string | null;
  onRefresh: () => Promise<void>;
  onNavigate: (page: PageType) => void;
}

const Drivers: React.FC<DriversProps> = ({ drivers, onDriverClick, loading, error, onRefresh, onNavigate }) => {
  if (loading) {
    return (
      <div className="p-6">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Drivers</h1>
          <div className="flex items-center space-x-3">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
            <span className="text-sm text-gray-600">Loading drivers...</span>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-white rounded-lg p-6 border border-gray-200 animate-pulse">
              <div className="h-4 bg-gray-200 rounded mb-2"></div>
              <div className="h-8 bg-gray-200 rounded mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Drivers</h1>
          <button
            onClick={onRefresh}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm flex items-center"
          >
            Refresh
          </button>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
          <div className="text-red-500 mx-auto mb-4 text-4xl">⚠️</div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Error Loading Drivers</h3>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={onRefresh}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Drivers</h1>
          <p className="text-gray-600 mt-1">Manage delivery drivers and their routes</p>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={onRefresh}
            className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm flex items-center hover:bg-gray-50"
          >
            Refresh
          </button>
          <button 
            onClick={() => onNavigate('add-driver')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center transition-colors duration-200"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Driver
          </button>
        </div>
      </div>

      {/* Route Graph */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Delivery Routes Overview</h3>
        <RouteGraph />
      </div>

      {/* Driver Cards */}
      {drivers.length === 0 ? (
        <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
          <div className="text-gray-400 mx-auto mb-4 text-4xl">🚛</div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No Drivers Found</h3>
          <p className="text-gray-600 mb-4">Get started by adding your first delivery driver.</p>
          <button 
            onClick={() => onNavigate('add-driver')}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Add Your First Driver
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {drivers.map((driver) => (
          <div
            key={driver.id || driver.name}
            onClick={() => driver.id && onDriverClick(driver.id)}
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
                <span>{driver.route?.length || 0} stops on route</span>
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
      )}
    </div>
  );
};

export default Drivers;