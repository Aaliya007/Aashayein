import { mockUser } from '@/data/mock/users';
import { User } from '@/types/user';

export interface LoginCredentials {
  identifier: string;
  password: string;
}

export interface AuthResult {
  user: User;
  token: string;
}

function isValidIdentifier(identifier: string): boolean {
  const trimmed = identifier.trim();
  if (trimmed.length < 3) return false;

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const mobilePattern = /^[0-9]{10}$/;

  return emailPattern.test(trimmed) || mobilePattern.test(trimmed);
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

  await new Promise((resolve) => setTimeout(resolve, 600));

  return {
    user: {
      ...mockUser,
      email: identifier.includes('@') ? identifier.trim() : mockUser.email,
      mobile: /^[0-9]{10}$/.test(identifier.trim()) ? identifier.trim() : mockUser.mobile,
    },
    token: 'mock-jwt-token',
  };
}

export async function logout(): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, 200));
}
