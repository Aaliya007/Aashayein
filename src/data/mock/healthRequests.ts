import { HealthRequest } from '@/types/healthRequest';

export const mockHealthRequests: HealthRequest[] = [
  {
    id: 1,
    patientId: 1,
    message: 'Persistent headache for 3 days with mild fever.',
    lang: 'en',
    status: 'in_review',
    createdAt: '2026-08-18T10:30:00Z',
  },
  {
    id: 2,
    patientId: 1,
    message: 'Need guidance for seasonal allergies and cough.',
    lang: 'hi',
    status: 'pending',
    createdAt: '2026-08-19T14:15:00Z',
  },
];
