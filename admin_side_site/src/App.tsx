import React, { useState, useEffect } from 'react';
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
  id?: string;
  name: string;
  phone: string;
  email: string;
  license_number?: string;
  vehicle_type?: string;
  vehicle?: string;
  totalParcels?: number;
  status?: 'active' | 'inactive' | 'on-route';
  route?: string[];
  deliveriesPerStop?: { [stop: string]: number };
}

function App() {
  const [currentPage, setCurrentPage] = useState<PageType>('dashboard');
  const [selectedDriverId, setSelectedDriverId] = useState<string | null>(null);
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchDrivers();
    fetchProducts();
    fetchOrders();
  }, []);

  const fetchDrivers = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch('http://localhost:8000/drivers');
      
      if (response.ok) {
        const data = await response.json();
        setDrivers(data);
      } else {
        throw new Error('Failed to fetch drivers');
      }
    } catch (err) {
      setError('Failed to load drivers. Please try again.');
      console.error('Error fetching drivers:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:8000/catalog');
      
      if (response.ok) {
        const data = await response.json();
        setProducts(data);
      } else {
        console.error('Failed to fetch products');
      }
    } catch (err) {
      console.error('Error fetching products:', err);
    }
  };

  const fetchOrders = async () => {
    try {
      const response = await fetch('http://localhost:8000/orders');
      
      if (response.ok) {
        const data = await response.json();
        setOrders(data);
      } else {
        console.error('Failed to fetch orders');
      }
    } catch (err) {
      console.error('Error fetching orders:', err);
    }
  };

  const addDriver = async (newDriver: Omit<Driver, 'id'>) => {
    try {
      const response = await fetch('http://localhost:8000/drivers/add_driver', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newDriver)
      });

      if (response.ok) {
        const result = await response.json();
        // Refresh the drivers list after adding
        await fetchDrivers();
        return { success: true, message: 'Driver added successfully!' };
      } else {
        throw new Error('Failed to add driver');
      }
    } catch (error) {
      console.error('Error adding driver:', error);
      return { success: false, message: 'Failed to add driver. Please try again.' };
    }
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
        return <Drivers 
          drivers={drivers} 
          onDriverClick={handleDriverClick} 
          loading={loading}
          error={error}
          onRefresh={fetchDrivers}
          onNavigate={setCurrentPage}
        />;
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
              <Sidebar 
          currentPage={currentPage} 
          onPageChange={setCurrentPage} 
          productCount={products.length}
          orderCount={orders.length}
          driverCount={drivers.length}
        />
      <main className="flex-1 overflow-auto ml-64 mt-16">
        {renderPage()}
      </main>
    </div>
  );
}

export default App;