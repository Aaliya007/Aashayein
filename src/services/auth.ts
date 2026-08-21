import { MOCK_OTP } from '@/constants/appContent';
import {
  mockAdminUser,
  mockAshaUser,
  mockPatientUser,
} from '@/data/mock/users';
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
}

export interface OtpPayload {
  mobile: string;
  otp: string;
}

export interface AuthResult {
  user: User;
  token: string;
}

export interface OtpSendResult {
  message: string;
  expiresInSeconds: number;
}


function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function isValidMobile(mobile: string): boolean {
  return /^[0-9]{10}$/.test(mobile.trim());
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

function isValidIdentifier(identifier: string): boolean {
  const trimmed = identifier.trim();
  return isValidMobile(trimmed) || isValidEmail(trimmed);
}

function resolveMockUser(identifier: string): User {
  const trimmed = identifier.trim();

  if (trimmed === 'admin@aashayein.org' || trimmed === '9876543212') {
    return mockAdminUser;
  }
  if (trimmed === '9876543211' || trimmed === 'priya.sharma@example.com') {
    return mockPatientUser;
  }
  if (trimmed === '9876543210' || trimmed === 'sunita.asha@example.com') {
    return mockAshaUser;
  }

  if (trimmed.includes('@')) {
    return { ...mockPatientUser, email: trimmed };
  }

  return { ...mockAshaUser, mobile: trimmed };
}

export async function login(credentials: LoginCredentials): Promise<AuthResult> {
  const { identifier, password } = credentials;

  if (!identifier.trim() || !password.trim()) {
    throw new Error('Please enter your mobile/email and password.');
  }

  if (!isValidIdentifier(identifier)) {
    throw new Error('Enter a valid 10-digit mobile number or email address.');
  }

  if (password.length < 4) {
    throw new Error('Password must be at least 4 characters.');
  }

  await delay(700);

  const user = resolveMockUser(identifier);

  return {
    user,
    token: `mock-jwt-${user.role}-${user.id}`,
  };
}

export async function register(payload: RegisterPayload): Promise<OtpSendResult> {
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

  await delay(600);

  return {
    message: `OTP sent to +91 ${payload.mobile}. Use ${MOCK_OTP} for demo.`,
    expiresInSeconds: 300,
  };
}

export async function sendOtp(mobile: string): Promise<OtpSendResult> {
  if (!isValidMobile(mobile)) {
    throw new Error('Enter a valid 10-digit mobile number.');
  }

  await delay(500);

  return {
    message: `OTP sent to +91 ${mobile}. Use ${MOCK_OTP} for demo.`,
    expiresInSeconds: 300,
  };
}

export async function verifyOtp(payload: OtpPayload): Promise<AuthResult> {
  if (!isValidMobile(payload.mobile)) {
    throw new Error('Invalid mobile number.');
  }
  if (payload.otp.trim().length !== 6) {
    throw new Error('Enter the 6-digit OTP.');
  }
  if (payload.otp.trim() !== MOCK_OTP) {
    throw new Error('Invalid OTP. Use 123456 for demo.');
  }

  await delay(700);

  return {
    user: resolveMockUser(payload.mobile),
    token: `mock-jwt-verified-${payload.mobile}`,
  };
}

export async function verifyRegistrationOtp(
  payload: OtpPayload,
  registration: RegisterPayload,
): Promise<AuthResult> {
  if (payload.otp.trim() !== MOCK_OTP) {
    throw new Error('Invalid OTP. Use 123456 for demo.');
  }

  await delay(700);

  const user: User = {
    id: Date.now(),
    name: registration.name.trim(),
    mobile: registration.mobile.trim(),
    email: registration.email?.trim() ?? `${registration.mobile}@aashayein.local`,
    role: registration.role,
    village: registration.village?.trim() || 'Rampur',
    district: registration.district?.trim() || 'Amritsar',
    createdAt: new Date().toISOString(),
  };

  return {
    user,
    token: `mock-jwt-register-${user.role}-${user.id}`,
  };
}

export async function requestPasswordReset(mobile: string): Promise<OtpSendResult> {
  if (!isValidMobile(mobile)) {
    throw new Error('Enter a valid 10-digit mobile number.');
  }

  await delay(500);

  return {
    message: `Reset OTP sent to +91 ${mobile}. Use ${MOCK_OTP} for demo.`,
    expiresInSeconds: 300,
  };
}

export async function resetPassword(
  mobile: string,
  otp: string,
  newPassword: string,
): Promise<{ message: string }> {
  if (!isValidMobile(mobile)) {
    throw new Error('Enter a valid 10-digit mobile number.');
  }
  if (otp.trim() !== MOCK_OTP) {
    throw new Error('Invalid OTP. Use 123456 for demo.');
  }
  if (newPassword.length < 6) {
    throw new Error('Password must be at least 6 characters.');
  }

  await delay(600);

  return { message: 'Password updated successfully. You can now sign in.' };
}

export async function logout(): Promise<void> {
  await delay(200);
}
