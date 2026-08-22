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
    },
  });
}

export function useRegister() {
  const setPendingOtp = useAuthStore((s) => s.setPendingOtp);
  const setPendingRegistration = useAuthStore((s) => s.setPendingRegistration);

  return useMutation({
    mutationFn: register,
    onSuccess: (_result, variables) => {
      setPendingRegistration(variables);
      setPendingOtp(variables.mobile, 'register');
      router.push('/auth/otp');
    },
  });
}

export function useVerifyOtp() {
  const setAuth = useAuthStore((s) => s.setAuth);
  const clearPendingOtp = useAuthStore((s) => s.clearPendingOtp);
  const clearPendingRegistration = useAuthStore((s) => s.clearPendingRegistration);
  const pendingRegistration = useAuthStore((s) => s.pendingRegistration);
  const otpPurpose = useAuthStore((s) => s.otpPurpose);

  return useMutation({
    mutationFn: async ({ mobile, otp }: { mobile: string; otp: string }) => {
      if (otpPurpose === 'register' && pendingRegistration) {
        return verifyRegistrationOtp({ mobile, otp }, pendingRegistration);
      }
      return verifyOtp({ mobile, otp });
    },
    onSuccess: (result) => {
      setAuthToken(result.token);
      setAuth(result.user, result.token);
      clearPendingOtp();
      clearPendingRegistration();
      router.replace(getHomeRouteForRole(result.user.role));
    },
  });
}

export function useForgotPassword() {
  const setPendingOtp = useAuthStore((s) => s.setPendingOtp);

  return useMutation({
    mutationFn: requestPasswordReset,
    onSuccess: (_result, mobile) => {
      setPendingOtp(mobile, 'forgot_password');
      router.push({ pathname: '/auth/otp', params: { mode: 'reset' } });
    },
  });
}

export function useResetPassword() {
  const clearPendingOtp = useAuthStore((s) => s.clearPendingOtp);

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
    onSuccess: () => {
      clearPendingOtp();
      router.replace('/auth/login');
    },
  });
}

export function useSendLoginOtp() {
  const setPendingOtp = useAuthStore((s) => s.setPendingOtp);

  return useMutation({
    mutationFn: sendOtp,
    onSuccess: (_result, mobile) => {
      setPendingOtp(mobile, 'login');
      router.push('/auth/otp');
    },
  });
}

export function useLogout() {
  const clearAuth = useAuthStore((s) => s.clearAuth);

  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      setAuthToken(null);
      clearAuth();
      router.replace('/welcome');
    },
  });
}
