import { GuestGuard } from '@/components/common/GuestGuard';
import { Stack } from 'expo-router';

export default function AuthLayout() {
  return (
    <GuestGuard>
      <Stack
        screenOptions={{
          headerShown: false,
          animation: 'slide_from_right',
          contentStyle: { backgroundColor: '#F8FAFC' },
        }}
      />
    </GuestGuard>
  );
}
