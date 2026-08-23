import type { VisitCondition } from '@/types/api';

export interface Visit {
  id: number;
  caseId: number;
  ashaId: number;
  facilityId?: number;
  temperature?: number;
  condition: VisitCondition | string;
  symptoms: string;
  notes?: string;
  visitedAt: string;
}
