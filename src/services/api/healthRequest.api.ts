import type { ApiHealthRequest, CreateHealthRequestPayload } from '@/types/api';
import { apiGet, apiPost } from './client';

export function createHealthRequest(payload: CreateHealthRequestPayload) {
  return apiPost<ApiHealthRequest>('/api/health-requests', payload);
}

export function getHealthRequest(id: number) {
  return apiGet<ApiHealthRequest>(`/api/health-requests/${id}`);
}

export function listHealthRequestsForPatient(patientId: number) {
  return apiGet<ApiHealthRequest[]>(`/api/health-requests/patient/${patientId}`);
}
