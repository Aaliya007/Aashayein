import { authApi } from '@/services/api/auth.api';
import { setAuthToken } from '@/services/api/client';
import {
  logout,
  register,
  requestPasswordReset,
  resetPassword,
  sendOtp,
  verifyOtp,
  verifyRegistrationOtp
} from '@/services/auth';
import { useAuthStore } from '@/stores/authStore';
import { getHomeRouteForRole } from '@/utils/routing';
import { useMutation } from '@tanstack/react-query';
import { router } from 'expo-router';

export function useLogin() {
  const setAuth = useAuthStore((s) => s.setAuth);

  return useMutation({
    mutationFn: async (credentials: {
      identifier: string;
      password: string;
    }) => {
      const response = await authApi.login(credentials);

      console.log('LOGIN RESULT:', response.data);

      return response.data;
    },

    onSuccess: (result) => {
      const role =
        result.role === 'CITIZEN'
          ? 'patient'
          : result.role === 'ASHA'
            ? 'asha'
            : 'admin';

      const user = {
        id: result.id,
        name: result.name,
        mobile: '',
        email: '',
        role,
        village: '',
        district: '',
        createdAt: new Date().toISOString(),
        patientId: result.patientId,
      };

      console.log('USER BEING STORED:', user);

      // No backend token is required.
      setAuth(user, '');

      router.replace(getHomeRouteForRole(role));
      setAuth(result.user);
      router.replace(getHomeRouteForRole(result.user.role));
    },
  });
}

export function useRegister() {
  const setAuth = useAuthStore((s) => s.setAuth);

  return useMutation({
    mutationFn: register,
    onSuccess: (result) => {
      setAuth(result.user);
      router.replace(getHomeRouteForRole(result.user.role));
    },
  });
}

export function useVerifyOtp() {
  return useMutation({
    mutationFn: async ({ mobile, otp }: { mobile: string; otp: string }) => {
      return verifyOtp({ mobile, otp });
    },
  });
}

export function useForgotPassword() {
  return useMutation({
    mutationFn: requestPasswordReset,
  });
}

export function useResetPassword() {
  return useMutation({
    mutationFn: ({
      mobile,
      otp,
      newPassword,
    }: {
      mobile: string;
      otp: string;
      newPassword: string;
    }) => resetPassword(mobile, otp, newPassword),
  });
}

export function useSendLoginOtp() {
  return useMutation({
    mutationFn: sendOtp,
  });
}

export function useLogout() {
  const clearAuth = useAuthStore((s) => s.clearAuth);

  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      clearAuth();
      router.replace('/welcome');
    },
  });
}
