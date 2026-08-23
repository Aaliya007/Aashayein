import type { Vaccination, VaccinationStatus } from '@/types/vaccination';

/**
 * Temporary vaccination-only demo data. Replace this factory with the future
 * vaccination API without changing the vaccination screens.
 */
const templates: Omit<Vaccination, 'id' | 'patientId'>[] = [
  { name: 'Tetanus toxoid', dose: 'Dose 2', status: 'completed', dueDate: '2026-07-15', completedAt: '2026-07-15' },
  { name: 'Influenza vaccine', dose: 'Annual dose', status: 'due', dueDate: '2026-08-25' },
  { name: 'Hepatitis B', dose: 'Dose 3', status: 'upcoming', dueDate: '2026-09-12' },
  { name: 'Pneumococcal vaccine', dose: 'Single dose', status: 'overdue', dueDate: '2026-08-05' },
];

export function getMockVaccinationsForPatients(patientIds: number[]): Vaccination[] {
  return patientIds.map((patientId, index) => ({
    ...templates[index % templates.length],
    id: 80_000 + patientId,
    patientId,
  }));
}

export function getVaccinationStatusLabel(status: VaccinationStatus): string {
  return status.charAt(0).toUpperCase() + status.slice(1);
}
