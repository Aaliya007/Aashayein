import { setAuthToken } from '@/services/api/client';
import {
  login,
  logout,
  register,
  requestPasswordReset,
  resetPassword,
  sendOtp,
  verifyOtp,
  verifyRegistrationOtp,
} from '@/services/auth';
import { useAuthStore } from '@/stores/authStore';
import { getHomeRouteForRole } from '@/utils/routing';
import { useMutation } from '@tanstack/react-query';
import { router } from 'expo-router';

export function useLogin() {
  const setAuth = useAuthStore((s) => s.setAuth);

  return useMutation({
    mutationFn: login,
    onSuccess: (result) => {
      setAuthToken(result.token);
      setAuth(result.user, result.token);
      router.replace(getHomeRouteForRole(result.user.role));
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
