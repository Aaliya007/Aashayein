import type { ApiFacility, ReferralStatus } from '@/types/api';

export type { ReferralStatus };

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
  patientName?: string;
  facilityName?: string;
  facility?: ApiFacility;
}
