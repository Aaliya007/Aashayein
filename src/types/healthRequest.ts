export type HealthRequestStatus = 'pending' | 'in_review' | 'resolved' | 'cancelled';

export interface HealthRequest {
  id: number;
  patientId: number;
  message: string;
  lang: string;
  status: HealthRequestStatus;
  createdAt: string;
}
