import { apiClient } from './client';
import type { ApiCase, ApiHealthRequest, ApiPatient, ApiReferral, ApiVisit } from '@/types/api';

export type PatientProfile = ApiPatient;

export interface HealthHistory {
  patient: PatientProfile;
  healthRequests?: ApiHealthRequest[];
  cases?: ApiCase[];
  visits?: ApiVisit[];
  referrals?: ApiReferral[];
}

export const patientsApi = {
  getById: (patientId: number) =>
    apiClient.get<PatientProfile>(
      `/api/patients/${patientId}`,
    ),

  getHistory: (patientId: number) =>
    apiClient.get<HealthHistory>(
      `/api/patients/${patientId}/history`,
    ),
};
