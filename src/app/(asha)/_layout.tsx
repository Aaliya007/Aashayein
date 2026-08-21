import { useAuthStore } from '@/stores/authStore';
import { Redirect, Stack } from 'expo-router';

export default function AshaLayout() {
  const user = useAuthStore((state) => state.user);

  if (!user || user.role !== 'asha') {
    return <Redirect href="/welcome" />;
  }

  return (
    <Stack screenOptions={{ headerShown: false, animation: 'slide_from_right' }}>
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="cases/[id]" />
      <Stack.Screen name="patients/index" />
      <Stack.Screen name="patients/[id]" />
      <Stack.Screen name="visits/index" />
      <Stack.Screen name="visits/new" />
      <Stack.Screen name="visits/[id]" />
      <Stack.Screen name="vaccinations/index" />
      <Stack.Screen name="vaccinations/[id]" />
      <Stack.Screen name="referrals/index" />
      <Stack.Screen name="referrals/[id]" />
    </Stack>
  );
}
