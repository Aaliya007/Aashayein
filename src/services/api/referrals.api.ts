import { apiClient } from './client';

export interface Referral {
  id: number;
  caseId: number;
  patientId: number;
  facilityId: number;
  createdBy: number;
  reason: string;
  status: 'PENDING' | 'ACCEPTED' | 'COMPLETED';
  createdAt?: string;
}

export const referralsApi = {
  getAll: () =>
    apiClient.get<Referral[]>('/referrals'),

  getById: (id: number) =>
    apiClient.get<Referral>(`/referrals/${id}`),

  getByCase: (caseId: number) =>
    apiClient.get<Referral[]>(
      `/referrals/case/${caseId}`,
    ),
};