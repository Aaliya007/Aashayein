import { router } from 'expo-router';
import { useState } from 'react';
import { Alert, TextInput, View } from 'react-native';

import { AppButton } from '@/components/ui/AppButton';
import { AppText } from '@/components/ui/AppText';
import { BaseCard } from '@/components/ui/BaseCard';
import { Screen } from '@/components/ui/Screen';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { useAuthStore } from '@/stores/authStore';

export default function AdminLogin() {
  const setAuth = useAuthStore((s) => s.setAuth);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
  if (
    username.trim().toLowerCase() === 'admin' &&
    password === 'admin123'
  ) {
    const adminUser = {
      id: 999,
      name: 'Administrator',
      mobile: '0000000000',
      email: 'admin@aashayein.com',
      role: 'admin' as const,
      village: '',
      district: '',
      createdAt: new Date().toISOString(),
    };

    setAuth(adminUser, '');

    router.replace('/admin/dashboard');

    return;
  }

  Alert.alert(
    'Invalid Login',
    'Use username: admin and password: admin123'
  );
};

  return (
    <Screen
      scrollable
      header={
        <ScreenHeader
          contextLabel="AASHAYEN"
          title="Admin Login"
        />
      }
    >
      <BaseCard className="mt-6">
        <AppText variant="title">
          Administrator Access
        </AppText>

        <AppText variant="caption" className="mt-2">
          Sign in to monitor AASHAYEN healthcare activity.
        </AppText>

        <View className="mt-6">
          <AppText variant="caption">
            Username
          </AppText>

          <TextInput
            value={username}
            onChangeText={setUsername}
            placeholder="Enter username"
            autoCapitalize="none"
            className="mt-2 rounded-xl border border-slate-200 px-4 py-3"
          />
        </View>

        <View className="mt-4">
          <AppText variant="caption">
            Password
          </AppText>

          <TextInput
            value={password}
            onChangeText={setPassword}
            placeholder="Enter password"
            secureTextEntry
            autoCapitalize="none"
            className="mt-2 rounded-xl border border-slate-200 px-4 py-3"
          />
        </View>

        <View className="mt-6">
          <AppButton
            title="Login as Admin"
            onPress={handleLogin}
          />
        </View>

        <AppText variant="caption" className="mt-4 text-center">
          Demo credentials: admin / admin123
        </AppText>
      </BaseCard>
    </Screen>
  );
}