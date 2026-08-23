import { router } from 'expo-router';
import { useState } from 'react';
import { Alert, TextInput, View } from 'react-native';

import { AppButton } from '@/components/ui/AppButton';
import { AppText } from '@/components/ui/AppText';
import { BaseCard } from '@/components/ui/BaseCard';
import { Screen } from '@/components/ui/Screen';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { MOCK_ADMIN } from '@/data/mock/users';
import { useAuthStore } from '@/stores/authStore';

export default function AdminLogin() {
  const setAuth = useAuthStore((s) => s.setAuth);

  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (phone.trim() === MOCK_ADMIN.user.mobile && password === MOCK_ADMIN.password) {
      setAuth(MOCK_ADMIN.user);

      router.replace('/admin/dashboard');

      return;
    }

    Alert.alert(
      'Invalid Login',
      'Use phone: 9999999999 and password: Admin@123',
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
            Phone
          </AppText>

          <TextInput
            value={phone}
            onChangeText={setPhone}
            placeholder="Enter phone number"
            keyboardType="phone-pad"
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
          Demo credentials: 9999999999 / Admin@123
        </AppText>
      </BaseCard>
    </Screen>
  );
}
