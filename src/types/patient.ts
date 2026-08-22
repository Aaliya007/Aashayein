export interface Patient {
  id: number;
  userId: number;
  name: string;
  mobile: string;
  email?: string;
  village?: string;
  district?: string;
  dateOfBirth: string;
  gender: string;
  address: string;
  latitude?: number;
  longitude?: number;
  emergencyContact?: string;
  createdAt: string;
}
