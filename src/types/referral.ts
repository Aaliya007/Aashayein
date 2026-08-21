export type ReferralStatus = 'pending' | 'accepted' | 'completed' | 'declined';

export interface Referral {
  id: number;
  caseId: number;
  patientId: number;
  facilityId: number;
  ashaId: number;
  reason: string;
  status: ReferralStatus;
  createdAt: string;
  updatedAt: string;
}
