import React, { useState } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Users from './pages/Users';
import Products from './pages/Products';
import Orders from './pages/Orders';
import EcoCoins from './pages/EcoCoins';
import Settings from './pages/Settings';
import Drivers from './pages/Drivers';
import AddDriver from './pages/AddDriver';
import DriverDetail from './pages/DriverDetail';

export type PageType = 'dashboard' | 'users' | 'products' | 'orders' | 'ecocoins' | 'settings' | 'drivers' | 'add-driver' | 'driver-detail';

export interface Driver {
  id: string;
  name: string;
  phone: string;
  email: string;
  vehicle: string;
  totalParcels: number;
  status: 'active' | 'inactive' | 'on-route';
  route: string[];
  deliveriesPerStop: { [stop: string]: number };
}

function App() {
  const [currentPage, setCurrentPage] = useState<PageType>('dashboard');
  const [selectedDriverId, setSelectedDriverId] = useState<string | null>(null);
  const [drivers, setDrivers] = useState<Driver[]>([
    {
      id: '1',
      name: 'John Smith',
      phone: '+1 (555) 123-4567',
      email: 'john.smith@delivery.com',
      vehicle: 'Van - ABC123',
      totalParcels: 25,
      status: 'on-route',
      route: ['Downtown', 'Midtown', 'Uptown', 'Suburbs'],
      deliveriesPerStop: { 'Downtown': 8, 'Midtown': 6, 'Uptown': 7, 'Suburbs': 4 }
    },
    {
      id: '2',
      name: 'Sarah Johnson',
      phone: '+1 (555) 987-6543',
      email: 'sarah.johnson@delivery.com',
      vehicle: 'Truck - XYZ789',
      totalParcels: 32,
      status: 'active',
      route: ['East Side', 'West Side', 'North End', 'South End'],
      deliveriesPerStop: { 'East Side': 10, 'West Side': 8, 'North End': 9, 'South End': 5 }
    },
    {
      id: '3',
      name: 'Mike Chen',
      phone: '+1 (555) 456-7890',
      email: 'mike.chen@delivery.com',
      vehicle: 'Van - DEF456',
      totalParcels: 18,
      status: 'active',
      route: ['Business District', 'Residential Area', 'Mall District'],
      deliveriesPerStop: { 'Business District': 7, 'Residential Area': 6, 'Mall District': 5 }
    }
  ]);

  const addDriver = (newDriver: Omit<Driver, 'id'>) => {
    const driver: Driver = {
      ...newDriver,
      id: Date.now().toString()
    };
    setDrivers(prev => [...prev, driver]);
  };

  const handleDriverClick = (driverId: string) => {
    setSelectedDriverId(driverId);
    setCurrentPage('driver-detail');
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'users':
        return <Users />;
      case 'products':
        return <Products />;
      case 'orders':
        return <Orders />;
      case 'ecocoins':
        return <EcoCoins />;
      case 'settings':
        return <Settings />;
      case 'drivers':
        return <Drivers drivers={drivers} onDriverClick={handleDriverClick} />;
      case 'add-driver':
        return <AddDriver onAddDriver={addDriver} onNavigate={setCurrentPage} />;
      case 'driver-detail':
        const selectedDriver = drivers.find(d => d.id === selectedDriverId);
        return selectedDriver ? (
          <DriverDetail driver={selectedDriver} onBack={() => setCurrentPage('drivers')} />
        ) : (
          <div>Driver not found</div>
        );
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Header />
      <Sidebar currentPage={currentPage} onPageChange={setCurrentPage} />
      <main className="flex-1 overflow-auto ml-64 mt-16">
        {renderPage()}
      </main>
    </div>
  );
}

export default App;