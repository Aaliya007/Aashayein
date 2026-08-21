import { UserRole } from '@/types/user';
import { Href } from 'expo-router';

export function getHomeRouteForRole(role: UserRole): Href {
  switch (role) {
    case 'asha':
      return '/(asha)/(tabs)/home';
    case 'patient':
      return '/(patient)/home';
    case 'admin':
      return '/(admin)/dashboard';
    default:
      return '/welcome';
  }
}

export function getRoleLabel(role: UserRole): string {
  switch (role) {
    case 'asha':
      return 'ASHA Worker';
    case 'patient':
      return 'Rural Citizen';
    case 'admin':
      return 'System Admin';
  }
}
