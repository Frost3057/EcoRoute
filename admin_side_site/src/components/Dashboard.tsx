import React from 'react';
import { RouteGraph } from './RouteGraph';
import { DriverTile } from './DriverTile';
import { Driver } from '../types/driver';

interface DashboardProps {
  drivers: Driver[];
  onDriverClick: (driverId: string) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ drivers, onDriverClick }) => {
  return (
    <div className="space-y-8">
      {/* Route Graph Section */}
      <RouteGraph />

      {/* Drivers Section */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Active Drivers</h2>
          <div className="text-sm text-gray-600">
            {drivers.length} drivers registered
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {drivers.map((driver) => (
            <DriverTile
              key={driver.id}
              driver={driver}
              onClick={onDriverClick}
            />
          ))}
        </div>
      </div>
    </div>
  );
};