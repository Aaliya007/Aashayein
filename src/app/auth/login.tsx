import { AppButton } from '@/components/ui/AppButton';
import { AppInput } from '@/components/ui/AppInput';
import { AppText } from '@/components/ui/AppText';
import { Screen } from '@/components/ui/Screen';
import { useAppContext } from '@/context/AppContext';
import { login } from '@/services/auth';
import { setAuthToken } from '@/services/api';
import { router } from 'expo-router';
import { HeartPulse } from 'lucide-react-native';
import { useState } from 'react';
import { Pressable, View } from 'react-native';

export default function LoginScreen() {
  const { setUser } = useAppContext();
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setError('');
    setLoading(true);

    try {
      const result = await login({ identifier, password });
      setAuthToken(result.token);
      setUser(result.user);
      router.replace('/home');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Screen scrollable>
      <View className="mb-8 mt-6 items-center">
        <View className="mb-4 h-16 w-16 items-center justify-center rounded-full bg-primary-light">
          <HeartPulse size={32} color="#2F7D6D" accessibilityLabel="Aashayein logo" />
        </View>
        <AppText variant="title" className="text-primary">
          Welcome Back
        </AppText>
        <AppText variant="body" className="mt-2 text-center text-text-secondary">
          Sign in to continue your healthcare journey
        </AppText>
      </View>

      <View className="gap-4">
        <AppInput
          label="Mobile or Email"
          placeholder="Enter mobile number or email"
          value={identifier}
          onChangeText={setIdentifier}
          keyboardType="email-address"
        />
        <AppInput
          label="Password"
          placeholder="Enter your password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        {error ? (
          <AppText variant="caption" className="text-danger">
            {error}
          </AppText>
        ) : null}
      </View>

      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Forgot password"
        className="mt-4 min-h-[44px] justify-center self-end active:opacity-70">
        <AppText variant="label" className="text-primary">
          Forgot password?
        </AppText>
      </Pressable>

      <View className="mt-6">
        <AppButton title="Login" onPress={handleLogin} loading={loading} />
      </View>

      <View className="mt-6 flex-row items-center justify-center gap-1 pb-4">
        <AppText variant="caption">Don&apos;t have an account?</AppText>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Create account"
          className="min-h-[44px] justify-center active:opacity-70">
          <AppText variant="label" className="text-primary">
            Register
          </AppText>
        </Pressable>
      </View>
    </Screen>
  );
}
