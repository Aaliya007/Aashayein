import { apiClient } from './client';
import type { ApiReferral } from '@/types/api';

export type Referral = ApiReferral;

export const referralsApi = {
  getAll: () =>
    apiClient.get<Referral[]>('/api/referrals'),

  getById: (id: number) =>
    apiClient.get<Referral>(`/api/referrals/${id}`),

  getByCase: (caseId: number) =>
    apiClient.get<Referral[]>(
      `/api/referrals/case/${caseId}`,
    ),
};
