import type { ApiPatient, ApiPatientHistory } from '@/types/api';
import { apiGet } from './client';

export function getPatient(patientId: number) {
  return apiGet<ApiPatient>(`/api/patients/${patientId}`);
}

export function getPatientHistory(patientId: number) {
  return apiGet<ApiPatientHistory>(`/api/patients/${patientId}/history`);
}
