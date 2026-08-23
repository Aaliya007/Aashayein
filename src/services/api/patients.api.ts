import { apiClient } from './client';

export interface PatientProfile {
  id: number;
  name?: string;
  mobile?: string;
  email?: string;
  village?: string;
  district?: string;
  address?: string;
  dateOfBirth?: string;
  gender?: string;
  emergencyContact?: string;
}

export interface HealthHistory {
  patient?: PatientProfile;
  healthRequests?: any[];
  cases?: any[];
  visits?: any[];
  referrals?: any[];
}

export const patientsApi = {
  getById: (patientId: number) =>
    apiClient.get<PatientProfile>(
      `/patients/${patientId}`,
    ),

  getHistory: (patientId: number) =>
    apiClient.get<HealthHistory>(
      `/patients/${patientId}/history`,
    ),
};