import { QueryProvider } from '@/providers/QueryProvider';
import { useAuthStore } from '@/stores/authStore';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Inter_400Regular, Inter_500Medium, useFonts as useInterFonts } from '@expo-google-fonts/inter';
import { Poppins_600SemiBold, Poppins_700Bold, useFonts as usePoppinsFonts } from '@expo-google-fonts/poppins';
import { useEffect } from 'react';
import '../../global.css';

function AuthBootstrap() {
  const setHydrated = useAuthStore((s) => s.setHydrated);

  useEffect(() => {
    setHydrated(true);
  }, [setHydrated]);

  return null;
}

export default function RootLayout() {
  useInterFonts({ Inter_400Regular, Inter_500Medium });
  usePoppinsFonts({ Poppins_600SemiBold, Poppins_700Bold });

  return (
    <QueryProvider>
      <AuthBootstrap />
      <Stack screenOptions={{ headerShown: false, animation: 'fade' }} />
      <StatusBar style="dark" />
    </QueryProvider>
  );
}
