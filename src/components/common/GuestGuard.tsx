import { useAuthStore } from '@/stores/authStore';
import { getHomeRouteForRole } from '@/utils/routing';
import { Redirect } from 'expo-router';
import { ReactNode } from 'react';

interface GuestGuardProps {
  children: ReactNode;
}

export function GuestGuard({ children }: GuestGuardProps) {
  const user = useAuthStore((s) => s.user);

  if (user) {
    return <Redirect href={getHomeRouteForRole(user.role)} />;
  }

  return <>{children}</>;
}
