import { Driver, DeliveryStop } from '../types/driver';

export const mockDeliveryStops: DeliveryStop[] = [
  {
    id: 'stop1',
    address: '123 Main St, Downtown',
    parcelsCount: 5,
    estimatedTime: '09:00 AM',
    status: 'completed',
    coordinates: { lat: 40.7128, lng: -74.0060 }
  },
  {
    id: 'stop2',
    address: '456 Oak Ave, Midtown',
    parcelsCount: 3,
    estimatedTime: '10:30 AM',
    status: 'in-progress',
    coordinates: { lat: 40.7589, lng: -73.9851 }
  },
  {
    id: 'stop3',
    address: '789 Pine Rd, Uptown',
    parcelsCount: 7,
    estimatedTime: '12:00 PM',
    status: 'pending',
    coordinates: { lat: 40.7831, lng: -73.9712 }
  },
  {
    id: 'stop4',
    address: '321 Elm St, Westside',
    parcelsCount: 2,
    estimatedTime: '02:00 PM',
    status: 'pending',
    coordinates: { lat: 40.7505, lng: -74.0087 }
  }
];

export const mockDrivers: Driver[] = [
  {
    id: 'driver1',
    name: 'John Smith',
    phoneNumber: '+1 (555) 123-4567',
    email: 'john.smith@ecoroute.com',
    licenseNumber: 'DL123456789',
    vehicleType: 'Electric Van',
    totalParcels: 17,
    currentRoute: 'Route A - Downtown Circuit',
    status: 'on-route',
    deliveryStops: mockDeliveryStops
  },
  {
    id: 'driver2',
    name: 'Sarah Johnson',
    phoneNumber: '+1 (555) 234-5678',
    email: 'sarah.johnson@ecoroute.com',
    licenseNumber: 'DL234567890',
    vehicleType: 'Hybrid Truck',
    totalParcels: 23,
    currentRoute: 'Route B - Suburban Loop',
    status: 'active',
    deliveryStops: [
      {
        id: 'stop5',
        address: '555 Maple Dr, Suburbs',
        parcelsCount: 8,
        estimatedTime: '09:30 AM',
        status: 'pending',
        coordinates: { lat: 40.7282, lng: -73.7949 }
      },
      {
        id: 'stop6',
        address: '777 Cedar Ln, Eastside',
        parcelsCount: 15,
        estimatedTime: '11:00 AM',
        status: 'pending',
        coordinates: { lat: 40.7614, lng: -73.7776 }
      }
    ]
  },
  {
    id: 'driver3',
    name: 'Mike Davis',
    phoneNumber: '+1 (555) 345-6789',
    email: 'mike.davis@ecoroute.com',
    licenseNumber: 'DL345678901',
    vehicleType: 'Electric Bike',
    totalParcels: 12,
    currentRoute: 'Route C - City Center',
    status: 'active',
    deliveryStops: [
      {
        id: 'stop7',
        address: '999 Broadway, Theater District',
        parcelsCount: 4,
        estimatedTime: '10:00 AM',
        status: 'pending',
        coordinates: { lat: 40.7590, lng: -73.9845 }
      },
      {
        id: 'stop8',
        address: '111 Wall St, Financial District',
        parcelsCount: 8,
        estimatedTime: '01:00 PM',
        status: 'pending',
        coordinates: { lat: 40.7074, lng: -74.0113 }
      }
    ]
  }
];

// Generate additional mock drivers to reach 10 total
const additionalDrivers: Driver[] = Array.from({ length: 7 }, (_, index) => ({
  id: `driver${index + 4}`,
  name: `Driver ${index + 4}`,
  phoneNumber: `+1 (555) ${400 + index}${500 + index}`,
  email: `driver${index + 4}@ecoroute.com`,
  licenseNumber: `DL${400000000 + index}`,
  vehicleType: ['Electric Van', 'Hybrid Truck', 'Electric Bike'][index % 3],
  totalParcels: Math.floor(Math.random() * 20) + 10,
  currentRoute: `Route ${String.fromCharCode(68 + index)} - Area ${index + 1}`,
  status: ['active', 'inactive', 'on-route'][index % 3] as 'active' | 'inactive' | 'on-route',
  deliveryStops: [
    {
      id: `stop${9 + index}`,
      address: `${100 + index * 100} Sample St, Area ${index + 1}`,
      parcelsCount: Math.floor(Math.random() * 10) + 1,
      estimatedTime: `${9 + index}:00 AM`,
      status: 'pending',
      coordinates: { 
        lat: 40.7128 + (Math.random() - 0.5) * 0.1, 
        lng: -74.0060 + (Math.random() - 0.5) * 0.1 
      }
    }
  ]
}));

export const allMockDrivers = [...mockDrivers, ...additionalDrivers];