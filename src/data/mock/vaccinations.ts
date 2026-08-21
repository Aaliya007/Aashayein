import type { Vaccination } from '@/types/vaccination';

/** Temporary UI data; replace with the vaccination API when its contract is available. */
export const mockVaccinations: Vaccination[] = [
  { id: 801, patientId: 1, name: 'Influenza vaccine', status: 'due', dueDate: '2026-08-25' },
  { id: 802, patientId: 2, name: 'Tetanus booster', status: 'upcoming', dueDate: '2026-09-10' },
  { id: 803, patientId: 3, name: 'Tetanus toxoid', status: 'completed', dueDate: '2026-08-12', completedAt: '2026-08-12' },
  { id: 804, patientId: 4, name: 'Pneumococcal vaccine', status: 'overdue', dueDate: '2026-08-05' },
];
