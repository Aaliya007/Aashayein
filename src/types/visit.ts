export interface Visit {
  id: number;
  caseId: number;
  ashaId: number;
  facilityId?: number;
  temperature?: number;
  condition: string;
  symptoms: string;
  notes?: string;
  visitedAt: string;
}
