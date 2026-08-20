import { HealthcareFacility } from '@/types/facility';

export const mockFacilities: HealthcareFacility[] = [
  {
    id: 1,
    name: 'Amritsar District Hospital',
    type: 'hospital',
    address: 'Court Road, Amritsar',
    district: 'Amritsar',
    latitude: 31.634,
    longitude: 74.872,
    phone: '0183-2400000',
    isActive: true,
  },
  {
    id: 2,
    name: 'Rampur Primary Health Centre',
    type: 'phc',
    address: 'Main Road, Rampur',
    district: 'Amritsar',
    latitude: 31.628,
    longitude: 74.865,
    phone: '9876509876',
    isActive: true,
  },
];
