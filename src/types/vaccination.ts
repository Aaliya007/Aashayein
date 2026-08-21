export type VaccinationStatus = 'completed' | 'upcoming' | 'due' | 'overdue';

/**
 * Frontend-only record until the backend vaccination API/schema is finalized.
 */
export interface Vaccination {
  id: number;
  patientId: number;
  name: string;
  status: VaccinationStatus;
  dueDate: string;
  completedAt?: string;
}
