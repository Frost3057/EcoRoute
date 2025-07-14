import React, { useState } from 'react';
import { ArrowLeft, Save, User, Phone, Mail, Truck, Package } from 'lucide-react';
import { Driver, PageType } from '../App';

interface AddDriverProps {
  onAddDriver: (driver: Omit<Driver, 'id'>) => void;
  onNavigate: (page: PageType) => void;
}

const AddDriver: React.FC<AddDriverProps> = ({ onAddDriver, onNavigate }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    vehicle: '',
    totalParcels: 0,
    status: 'active' as Driver['status'],
    route: [] as string[],
    deliveriesPerStop: {} as { [stop: string]: number }
  });

  const [routeInput, setRouteInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Parse route and calculate deliveries per stop
    const routeStops = routeInput.split(',').map(stop => stop.trim()).filter(stop => stop);
    const parcelsPerStop = Math.ceil(formData.totalParcels / routeStops.length) || 0;
    
    const deliveriesPerStop: { [stop: string]: number } = {};
    routeStops.forEach((stop, index) => {
      if (index === routeStops.length - 1) {
        // Last stop gets remaining parcels
        deliveriesPerStop[stop] = formData.totalParcels - (parcelsPerStop * (routeStops.length - 1));
      } else {
        deliveriesPerStop[stop] = parcelsPerStop;
      }
    });

    const newDriver: Omit<Driver, 'id'> = {
      ...formData,
      route: routeStops,
      deliveriesPerStop
    };

    onAddDriver(newDriver);
    onNavigate('drivers');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'totalParcels' ? parseInt(value) || 0 : value
    }));
  };

  return (
    <div className="p-6">
      <div className="mb-8">
        <button
          onClick={() => onNavigate('drivers')}
          className="flex items-center text-gray-600 hover:text-gray-900 mb-4 transition-colors duration-200"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Drivers
        </button>
        <h1 className="text-2xl font-bold text-gray-900">Add New Driver</h1>
      </div>

      <div className="bg-white rounded-lg border border-gray-200">
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Personal Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900 flex items-center">
                <User className="h-5 w-5 mr-2" />
                Personal Information
              </h3>
              
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter driver's full name"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="+1 (555) 123-4567"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="driver@example.com"
                />
              </div>
            </div>

            {/* Vehicle & Delivery Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900 flex items-center">
                <Truck className="h-5 w-5 mr-2" />
                Vehicle & Delivery Information
              </h3>

              <div>
                <label htmlFor="vehicle" className="block text-sm font-medium text-gray-700 mb-1">
                  Vehicle Details *
                </label>
                <input
                  type="text"
                  id="vehicle"
                  name="vehicle"
                  required
                  value={formData.vehicle}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Van - ABC123"
                />
              </div>

              <div>
                <label htmlFor="totalParcels" className="block text-sm font-medium text-gray-700 mb-1">
                  Total Parcels *
                </label>
                <input
                  type="number"
                  id="totalParcels"
                  name="totalParcels"
                  required
                  min="0"
                  value={formData.totalParcels}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="0"
                />
              </div>

              <div>
                <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <select
                  id="status"
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="on-route">On Route</option>
                </select>
              </div>
            </div>
          </div>

          {/* Route Information */}
          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-lg font-medium text-gray-900 flex items-center mb-4">
              <Package className="h-5 w-5 mr-2" />
              Route Information
            </h3>
            
            <div>
              <label htmlFor="route" className="block text-sm font-medium text-gray-700 mb-1">
                Delivery Route *
              </label>
              <input
                type="text"
                id="route"
                value={routeInput}
                onChange={(e) => setRouteInput(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter stops separated by commas (e.g., Downtown, Midtown, Uptown)"
                required
              />
              <p className="text-xs text-gray-500 mt-1">
                Enter delivery stops separated by commas. Parcels will be distributed evenly across stops.
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={() => onNavigate('drivers')}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center transition-colors duration-200"
            >
              <Save className="h-4 w-4 mr-2" />
              Add Driver
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddDriver;