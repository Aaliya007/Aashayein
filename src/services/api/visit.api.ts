import type { ApiVisit, CreateVisitPayload, UpdateVisitPayload } from '@/types/api';
import { apiGet, apiPost, apiPut } from './client';

export function createVisit(payload: CreateVisitPayload) {
  return apiPost<ApiVisit>('/api/visits', payload);
}

export function getVisit(id: number) {
  return apiGet<ApiVisit>(`/api/visits/${id}`);
}

export function listVisitsForCase(caseId: number) {
  return apiGet<ApiVisit[]>(`/api/visits/case/${caseId}`);
}

export function updateVisit(id: number, payload: UpdateVisitPayload) {
  return apiPut<ApiVisit>(`/api/visits/${id}`, payload);
}
