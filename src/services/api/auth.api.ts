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
import type {
  ApiLoginResponse,
  ApiRegisterResponse,
  AshaRegisterPayload,
  CitizenRegisterPayload,
  LoginPayload,
} from '@/types/api';
import { apiPost } from './client';

export function login(payload: LoginPayload) {
  return apiPost<ApiLoginResponse>('/api/auth/login', payload);
}

export function registerCitizen(payload: CitizenRegisterPayload) {
  return apiPost<ApiRegisterResponse>('/api/auth/register', payload);
}

export function registerAsha(payload: AshaRegisterPayload) {
  return apiPost<ApiRegisterResponse>('/api/ashas/register', payload);
}
