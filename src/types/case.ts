export type CaseStatus = 'open' | 'in_progress' | 'closed' | 'referred';

export interface Case {
  id: number;
  healthRequestId: number;
  patientId: number;
  symptoms: string;
  duration: string;
  summary: string;
  priorityScore: number;
  assignedId?: number;
  status: CaseStatus;
  createdAt: string;
  updatedAt: string;
}
