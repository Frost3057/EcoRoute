import React, { useState } from 'react';
import { Truck, Plus, Home } from 'lucide-react';
import { DriverForm } from './components/DriverForm';
import { Dashboard } from './components/Dashboard';
import { DriverDetails } from './components/DriverDetails';
import { allMockDrivers } from './data/mockData';
import { Driver } from './types/driver';

function App() {
  const [currentView, setCurrentView] = useState<'form' | 'dashboard' | 'details'>('form');
  const [drivers, setDrivers] = useState<Driver[]>(allMockDrivers);
  const [selectedDriverId, setSelectedDriverId] = useState<string | null>(null);

  const handleDriverSubmit = (formData: any) => {
    const newDriver: Driver = {
      id: `driver${drivers.length + 1}`,
      ...formData,
      currentRoute: `Route ${String.fromCharCode(65 + drivers.length)} - New Assignment`,
      status: 'active' as const,
      deliveryStops: [
        {
          id: `stop${Date.now()}`,
          address: '123 Sample St, New Area',
          parcelsCount: formData.totalParcels,
          estimatedTime: '10:00 AM',
          status: 'pending' as const,
          coordinates: { lat: 40.7128, lng: -74.0060 }
        }
      ]
    };
    
    setDrivers(prev => [...prev, newDriver]);
    setCurrentView('dashboard');
  };

  const handleDriverClick = (driverId: string) => {
    setSelectedDriverId(driverId);
    setCurrentView('details');
  };

  const handleBackToDashboard = () => {
    setSelectedDriverId(null);
    setCurrentView('dashboard');
  };

  const selectedDriver = selectedDriverId 
    ? drivers.find(d => d.id === selectedDriverId) 
    : null;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <Truck className="w-8 h-8 text-blue-600" />
              <h1 className="text-xl font-bold text-gray-800">EcoRoute Admin</h1>
            </div>
            <nav className="flex items-center space-x-4">
              <button
                onClick={() => setCurrentView('form')}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                  currentView === 'form' 
                    ? 'bg-blue-100 text-blue-700' 
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                <Plus className="w-4 h-4" />
                <span>Add Driver</span>
              </button>
              <button
                onClick={() => setCurrentView('dashboard')}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                  currentView === 'dashboard' 
                    ? 'bg-blue-100 text-blue-700' 
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                <Home className="w-4 h-4" />
                <span>Dashboard</span>
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {currentView === 'form' && (
          <DriverForm onSubmit={handleDriverSubmit} />
        )}
        
        {currentView === 'dashboard' && (
          <Dashboard 
            drivers={drivers} 
            onDriverClick={handleDriverClick} 
          />
        )}
        
        {currentView === 'details' && selectedDriver && (
          <DriverDetails 
            driver={selectedDriver} 
            onBack={handleBackToDashboard} 
          />
        )}
      </main>
    </div>
  );
}

export default App;
