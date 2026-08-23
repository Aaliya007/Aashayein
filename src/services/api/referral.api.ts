import type { ApiReferral, CreateReferralPayload, ReferralStatus } from '@/types/api';
import { apiGet, apiPatch, apiPost } from './client';

export interface ReferralQuery {
  status?: ReferralStatus;
  facilityId?: number;
  createdBy?: number;
}

export function createReferral(payload: CreateReferralPayload) {
  return apiPost<ApiReferral>('/api/referrals', payload);
}

export function listReferrals(query?: ReferralQuery) {
  return apiGet<ApiReferral[]>('/api/referrals', query);
}

export function getReferral(id: number) {
  return apiGet<ApiReferral>(`/api/referrals/${id}`);
}

export function listReferralsForCase(caseId: number) {
  return apiGet<ApiReferral[]>(`/api/referrals/case/${caseId}`);
}

export function updateReferralStatus(id: number, status: ReferralStatus) {
  return apiPatch<ApiReferral>(`/api/referrals/${id}/status`, { status });
}
