import { User } from '@/types/user';

export const MOCK_ADMIN = {
  user: {
    id: 999,
    name: 'Aashayein Admin',
    mobile: '9999999999',
    email: 'admin@aashayein.local',
    role: 'admin',
    createdAt: '2026-01-01T00:00:00Z',
  } satisfies User,
  password: 'Admin@123',
} as const;

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

export const mockAdminUser: User = MOCK_ADMIN.user;
