import type { ApiAsha, ApiCase, AssignCasePayload } from '@/types/api';
import { apiGet, apiPatch } from './client';

export function listAshas() {
  return apiGet<ApiAsha[]>('/api/ashas');
}

export function getAsha(id: number) {
  return apiGet<ApiAsha>(`/api/ashas/${id}`);
}

export function assignCase(caseId: number, payload: AssignCasePayload) {
  return apiPatch<ApiCase>(`/api/ashas/cases/${caseId}/assign`, payload);
}
