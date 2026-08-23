import type { CaseStatus, PriorityLevel } from '@/types/api';
import type { Patient } from '@/types/patient';
import type { Referral } from '@/types/referral';
import type { Visit } from '@/types/visit';

export type { CaseStatus };

export interface Case {
  id: number;
  healthRequestId: number;
  patientId: number;
  ashaId?: number;
  symptoms: string;
  duration: string;
  summary: string;
  priorityScore: number;
  priorityLevel: PriorityLevel;
  status: CaseStatus;
  createdAt: string;
  updatedAt: string;
  evaluation?: string | null;
  redFlags?: string[];
  confidence?: number | null;
  patientName?: string;
  patient?: Patient;
  visits?: Visit[];
  referrals?: Referral[];
}
