import { apiClient } from './client';

export interface LoginPayload {
  identifier: string;
  password: string;
}

export interface LoginResponse {
  id: number;
  name: string;
  role: 'CITIZEN' | 'ASHA' | 'AUTHORITY';
  patientId?: number;
}

export const authApi = {
  login: (payload: LoginPayload) =>
    apiClient.post<LoginResponse>(
      '/auth/login',
      {
        mobile: payload.identifier,
        password: payload.password,
      },
    ),
};