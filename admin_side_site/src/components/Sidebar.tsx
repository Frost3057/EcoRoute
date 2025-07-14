import React from 'react';
import { 
  LayoutDashboard, 
  Users, 
  Package, 
  ShoppingCart, 
  Coins, 
  Settings, 
  Truck 
} from 'lucide-react';
import { PageType } from '../App';

interface SidebarProps {
  currentPage: PageType;
  onPageChange: (page: PageType) => void;
  productCount: number;
  orderCount: number;
  driverCount: number;
}

const Sidebar: React.FC<SidebarProps> = ({ currentPage, onPageChange, productCount, orderCount, driverCount }) => {
  const menuItems = [
    { id: 'dashboard' as PageType, label: 'Dashboard', icon: LayoutDashboard },
    { id: 'users' as PageType, label: 'Users', icon: Users },
    { id: 'products' as PageType, label: 'Products', icon: Package },
    { id: 'orders' as PageType, label: 'Orders', icon: ShoppingCart },
    { id: 'drivers' as PageType, label: 'Drivers', icon: Truck },
    { id: 'ecocoins' as PageType, label: 'EcoCoins', icon: Coins },
    { id: 'settings' as PageType, label: 'Settings', icon: Settings },
  ];

  return (
    <div className="fixed left-0 top-16 w-64 h-full bg-white border-r border-gray-200 z-40">
      <nav className="p-4 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPage === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onPageChange(item.id)}
              className={`w-full flex items-center px-3 py-2 text-left transition-colors duration-200 rounded-lg ${
                isActive
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
              }`}
            >
              <Icon className={`mr-3 h-4 w-4 ${isActive ? 'text-white' : 'text-gray-400'}`} />
              {item.label}
              {item.id === 'products' && (
                <span className="ml-auto bg-gray-200 text-gray-600 text-xs px-2 py-1 rounded-full">{productCount}</span>
              )}
              {item.id === 'orders' && (
                <span className="ml-auto bg-gray-200 text-gray-600 text-xs px-2 py-1 rounded-full">{orderCount}</span>
              )}
              {item.id === 'drivers' && (
                <span className="ml-auto bg-gray-200 text-gray-600 text-xs px-2 py-1 rounded-full">{driverCount}</span>
              )}
            </button>
          );
        })}
      </nav>
      
      <div className="absolute bottom-4 left-4 right-4">
        <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
            <span className="text-white text-xs font-medium">AD</span>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-900">Admin User</p>
            <p className="text-xs text-gray-500">System Administrator</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;