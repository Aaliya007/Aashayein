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
