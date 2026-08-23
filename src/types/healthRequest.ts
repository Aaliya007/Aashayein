import type { PriorityLevel, RequestStatus } from '@/types/api';

export type HealthRequestStatus = RequestStatus;

export interface HealthRequest {
  id: number;
  patientId: number;
  message: string;
  lang: string;
  status: HealthRequestStatus;
  createdAt: string;
  caseId?: number;
  symptoms?: string;
  duration?: string;
  summary?: string;
  priorityLevel?: PriorityLevel;
  priorityScore?: number;
  evaluation?: string | null;
  redFlags?: string[];
  confidence?: number | null;
}
