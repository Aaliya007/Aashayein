import { getAsha, login as loginRequest, registerAsha, registerCitizen } from '@/services/api';
import { mapAshaToUser, mapLoginToUser, mapRegisterToUser } from '@/services/api/mappers';
import type { Gender } from '@/types/api';
import { User, UserRole } from '@/types/user';

export interface LoginCredentials {
  identifier: string;
  password: string;
}

export interface RegisterPayload {
  name: string;
  mobile: string;
  email?: string;
  password: string;
  role: UserRole;
  village?: string;
  district?: string;
  address?: string;
  dateOfBirth?: string;
  gender?: string;
  emergencyContact?: string;
}

function isValidMobile(mobile: string): boolean {
  return /^[0-9]{10}$/.test(mobile.trim());
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

function extractMobile(identifier: string): string {
  const digits = identifier.replace(/\D/g, '');
  return digits.length === 10 ? digits : identifier.trim();
}

function mapGender(value?: string): Gender {
  const normalized = (value ?? '').trim().toUpperCase();
  if (normalized === 'MALE' || normalized === 'M') return 'MALE';
  if (normalized === 'OTHER' || normalized === 'O') return 'OTHER';
  return 'FEMALE';
}

export async function login(credentials: LoginCredentials): Promise<{ user: User }> {
  const { identifier, password } = credentials;

  if (!identifier.trim() || !password.trim()) {
    throw new Error('Please enter your mobile number and password.');
  }

  const mobile = extractMobile(identifier);
  if (!isValidMobile(mobile)) {
    throw new Error('Enter a valid 10-digit mobile number. Email sign-in is not supported by the backend.');
  }

  const result = await loginRequest({ mobile, password });
  let user = mapLoginToUser(result, { mobile });

  if (user.role === 'asha') {
    try {
      const asha = await getAsha(result.id);
      user = { ...mapAshaToUser(asha), patientId: result.patientId ?? undefined };
    } catch {
      user = { ...user, ashaId: result.id };
    }
  }

  return { user };
}

export async function register(payload: RegisterPayload): Promise<{ user: User }> {
  if (!payload.name.trim()) {
    throw new Error('Please enter your full name.');
  }
  if (!isValidMobile(payload.mobile)) {
    throw new Error('Enter a valid 10-digit mobile number.');
  }
  if (payload.email && !isValidEmail(payload.email)) {
    throw new Error('Enter a valid email address.');
  }
  if (payload.password.length < 6) {
    throw new Error('Password must be at least 6 characters.');
  }
  if (payload.role === 'admin') {
    throw new Error('Admin accounts cannot be created through self-registration.');
  }

  if (payload.role === 'asha') {
    const result = await registerAsha({
      name: payload.name.trim(),
      mobile: payload.mobile.trim(),
      email: payload.email?.trim() || `${payload.mobile.trim()}@aashayein.local`,
      password: payload.password,
      village: payload.village?.trim() || '',
      district: payload.district?.trim() || '',
    });
    return {
      user: mapRegisterToUser(result, {
        mobile: payload.mobile.trim(),
        role: 'asha',
        village: payload.village,
        district: payload.district,
      }),
    };
  }

  const result = await registerCitizen({
    name: payload.name.trim(),
    mobile: payload.mobile.trim(),
    email: payload.email?.trim() || `${payload.mobile.trim()}@aashayein.local`,
    password: payload.password,
    village: payload.village?.trim() || '',
    district: payload.district?.trim() || '',
    address: payload.address?.trim() || payload.village?.trim() || '',
    dateOfBirth: payload.dateOfBirth?.trim() || '1990-01-01',
    gender: mapGender(payload.gender),
    emergencyContact: payload.emergencyContact?.trim() || payload.mobile.trim(),
  });

  return {
    user: mapRegisterToUser(result, {
      mobile: payload.mobile.trim(),
      role: 'patient',
      village: payload.village,
      district: payload.district,
    }),
  };
}

export async function sendOtp(_mobile: string): Promise<never> {
  throw new Error('OTP sign-in is not available. Please sign in with your mobile number and password.');
}

export async function verifyOtp(_payload: { mobile: string; otp: string }): Promise<never> {
  throw new Error('OTP verification is not available. Please sign in with your mobile number and password.');
}

export async function requestPasswordReset(_mobile: string): Promise<never> {
  throw new Error('Password reset is not available on this backend yet. Please sign in with your mobile number.');
}

export async function resetPassword(
  _mobile: string,
  _otp: string,
  _newPassword: string,
): Promise<never> {
  throw new Error('Password reset is not available on this backend yet.');
}

export async function logout(): Promise<void> {
  return Promise.resolve();
}
