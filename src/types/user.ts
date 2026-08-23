export type UserRole = 'patient' | 'asha' | 'admin';

export interface User {
  id: number;
  name: string;
  mobile: string;
  email: string;
  role: UserRole;
  village?: string;
  district?: string;
  ashaId?: number;
  createdAt: string;
  patientId?: number;
}
