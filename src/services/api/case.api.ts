import type { ApiCase, CaseStatus, PriorityLevel, UpdateCaseStatusPayload } from '@/types/api';
import { apiGet, apiPatch } from './client';

export interface AshaCaseQuery {
  ashaId?: number;
  priorityLevel?: PriorityLevel;
  status?: CaseStatus;
}

export function listAshaCases(query?: AshaCaseQuery) {
  return apiGet<ApiCase[]>('/api/asha/cases', query);
}

export function getAshaCase(id: number) {
  return apiGet<ApiCase>(`/api/asha/cases/${id}`);
}

export function updateAshaCaseStatus(id: number, payload: UpdateCaseStatusPayload) {
  return apiPatch<ApiCase>(`/api/asha/cases/${id}/status`, payload);
}
