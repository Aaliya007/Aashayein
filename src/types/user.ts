export type UserRole = 'asha' | 'patient' | 'admin';

export interface User {
  id: number;
  name: string;
  mobile: string;
  email: string;
  role: UserRole;
  village?: string;
  district?: string;
  createdAt: string;
}
