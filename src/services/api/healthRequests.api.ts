import { apiClient } from './client';

export interface CreateHealthRequestPayload {
  patientId: number;
  message: string;
  language: string;
  inputType: 'TEXT' | 'VOICE';
}

export interface HealthRequestResponse {
  id: number;
  patientId: number;
  caseId?: number;
  status: string;
  symptoms?: string[];
  duration?: string;
  priorityScore?: number;
  priorityLevel?: string;
  summary?: string;
  evaluation?: string;
  redFlags?: string[];
  confidence?: number;
  createdAt?: string;
  inputType?: 'TEXT' | 'VOICE';
  language?: string;
}

export const healthRequestsApi = {
  create: (payload: CreateHealthRequestPayload) =>
    apiClient.post<HealthRequestResponse>(
      '/health-requests',
      payload,
    ),

  getById: (id: number) =>
    apiClient.get<HealthRequestResponse>(
      `/health-requests/${id}`,
    ),

  getByPatient: (patientId: number) =>
    apiClient.get<HealthRequestResponse[]>(
      `/health-requests/patient/${patientId}`,
    ),
};