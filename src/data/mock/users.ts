import { User } from '@/types/user';

export const mockAshaUser: User = {
  id: 1,
  name: 'Sunita Devi',
  mobile: '9876543210',
  email: 'sunita.asha@example.com',
  role: 'asha',
  village: 'Rampur',
  district: 'Amritsar',
  createdAt: '2025-01-15T08:00:00Z',
};

export const mockPatientUser: User = {
  id: 2,
  name: 'Priya Sharma',
  mobile: '9876543211',
  email: 'priya.sharma@example.com',
  role: 'patient',
  village: 'Rampur',
  district: 'Amritsar',
  createdAt: '2025-02-10T08:00:00Z',
};

export const mockAdminUser: User = {
  id: 3,
  name: 'Dr. Rajesh Kumar',
  mobile: '9876543212',
  email: 'admin@aashayein.org',
  role: 'admin',
  village: 'Rampur',
  district: 'Amritsar',
  createdAt: '2024-11-01T08:00:00Z',
};
