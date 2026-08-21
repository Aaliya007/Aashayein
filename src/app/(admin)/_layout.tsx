import { useAuthStore } from '@/stores/authStore';
import { Redirect, Stack } from 'expo-router';

export default function AdminLayout() {
  const user = useAuthStore((s) => s.user);

  if (!user) {
    return <Redirect href="/welcome" />;
  }

  if (user.role !== 'admin') {
    return <Redirect href="/welcome" />;
  }

  return <Stack screenOptions={{ headerShown: false }} />;
}
