import {
  login,
  logout,
  register,
  requestPasswordReset,
  resetPassword,
  sendOtp,
  verifyOtp,
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
