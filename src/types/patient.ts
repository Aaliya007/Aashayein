export interface Patient {
  id: number;
  userId: number;
  dateOfBirth: string;
  gender: string;
  address: string;
  latitude?: number;
  longitude?: number;
  emergencyContact?: string;
  createdAt: string;
}
