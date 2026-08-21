import {
  AuthResult,
  LoginCredentials,
  OtpPayload,
  OtpSendResult,
  RegisterPayload,
} from '@/services/auth';
import { apiClient, ApiResponse } from './client';

const AUTH_PREFIX = '/auth';

export const authApi = {
  login: (credentials: LoginCredentials) =>
    apiClient.post<ApiResponse<AuthResult>>(`${AUTH_PREFIX}/login`, credentials),

  register: (payload: RegisterPayload) =>
    apiClient.post<ApiResponse<OtpSendResult>>(`${AUTH_PREFIX}/register`, payload),

  sendOtp: (mobile: string) =>
    apiClient.post<ApiResponse<OtpSendResult>>(`${AUTH_PREFIX}/otp/send`, { mobile }),

  verifyOtp: (payload: OtpPayload) =>
    apiClient.post<ApiResponse<AuthResult>>(`${AUTH_PREFIX}/otp/verify`, payload),

  forgotPassword: (mobile: string) =>
    apiClient.post<ApiResponse<OtpSendResult>>(`${AUTH_PREFIX}/forgot-password`, { mobile }),

  resetPassword: (payload: { mobile: string; otp: string; newPassword: string }) =>
    apiClient.post<ApiResponse<{ message: string }>>(`${AUTH_PREFIX}/reset-password`, payload),
};
