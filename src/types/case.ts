export type CaseStatus = 'active' | 'pending' | 'in_progress' | 'resolved' | 'referred';

export interface Case {
  id: number;
  healthRequestId: number;
  patientId: number;
  symptoms: string;
  duration: string;
  summary: string;
  priorityScore: number;
  ashaId: number;
  status: CaseStatus;
  createdAt: string;
  updatedAt: string;
}
