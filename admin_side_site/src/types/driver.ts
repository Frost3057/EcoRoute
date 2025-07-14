export interface Driver {
  id: string;
  name: string;
  phoneNumber: string;
  email: string;
  licenseNumber: string;
  vehicleType: string;
  totalParcels: number;
  currentRoute: string;
  status: 'active' | 'inactive' | 'on-route';
  deliveryStops: DeliveryStop[];
}

export interface DeliveryStop {
  id: string;
  address: string;
  parcelsCount: number;
  estimatedTime: string;
  status: 'pending' | 'completed' | 'in-progress';
  coordinates: {
    lat: number;
    lng: number;
  };
}

export interface RouteData {
  driverId: string;
  driverName: string;
  stops: DeliveryStop[];
  totalDistance: string;
  estimatedDuration: string;
}