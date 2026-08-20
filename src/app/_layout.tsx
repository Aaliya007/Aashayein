import { AppProvider } from '@/context/AppContext';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import '../../global.css';

export default function RootLayout() {
  return (
    <AppProvider>
      <Stack screenOptions={{ headerShown: false, animation: 'fade' }} />
      <StatusBar style="dark" />
    </AppProvider>
  );
}
