import { User } from '@/types/user';
import { create } from 'zustand';

export type OtpPurpose = 'register' | 'login' | 'forgot_password';

interface AuthState {
  user: User | null;
  token: string | null;
  isHydrated: boolean;
  pendingOtpMobile: string | null;
  otpPurpose: OtpPurpose | null;
  pendingRegistration: {
    name: string;
    mobile: string;
    email?: string;
    role: User['role'];
    password: string;
    village?: string;
    district?: string;
  } | null;

  setAuth: (user: User, token: string) => void;
  clearAuth: () => void;
  setHydrated: (value: boolean) => void;
  setPendingOtp: (mobile: string, purpose: OtpPurpose) => void;
  clearPendingOtp: () => void;
  setPendingRegistration: (data: AuthState['pendingRegistration']) => void;
  clearPendingRegistration: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  isHydrated: false,
  pendingOtpMobile: null,
  otpPurpose: null,
  pendingRegistration: null,

  setAuth: (user, token) => set({ user, token }),
  clearAuth: () =>
    set({
      user: null,
      token: null,
      pendingOtpMobile: null,
      otpPurpose: null,
      pendingRegistration: null,
    }),
  setHydrated: (value) => set({ isHydrated: value }),
  setPendingOtp: (mobile, purpose) => set({ pendingOtpMobile: mobile, otpPurpose: purpose }),
  clearPendingOtp: () => set({ pendingOtpMobile: null, otpPurpose: null }),
  setPendingRegistration: (data) => set({ pendingRegistration: data }),
  clearPendingRegistration: () => set({ pendingRegistration: null }),
}));
