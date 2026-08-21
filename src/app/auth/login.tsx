import { AuthShell } from '@/components/common/AuthShell';
import { DemoAccounts } from '@/components/common/DemoAccounts';
import { AppButton } from '@/components/ui/AppButton';
import { AppInput } from '@/components/ui/AppInput';
import { AppText } from '@/components/ui/AppText';
import { Screen } from '@/components/ui/Screen';
import { ScreenBackground } from '@/components/ui/ScreenBackground';
import { TextLink } from '@/components/ui/TextLink';
import { useCopy } from '@/hooks/useCopy';
import { useLogin, useSendLoginOtp } from '@/hooks/useAuthMutations';
import { router } from 'expo-router';
import { KeyRound, Smartphone } from 'lucide-react-native';
import { useState } from 'react';
import { View } from 'react-native';

export default function LoginScreen() {
  const { t } = useCopy();
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const loginMutation = useLogin();
  const otpMutation = useSendLoginOtp();

  const handleLogin = () => {
    loginMutation.mutate({ identifier, password }, { onError: () => undefined });
  };

  const handleOtpLogin = () => {
    otpMutation.mutate(identifier, { onError: () => undefined });
  };

  const errorMessage = loginMutation.error?.message || otpMutation.error?.message;

  return (
    <ScreenBackground>
      <Screen scrollable className="bg-transparent" contentClassName="py-7">
        <AuthShell
        contextLabel={t('loginEyebrow')}
        title={t('loginTitle')}
        subtitle={t('loginBody')}
        footer={
          <View className="flex-row items-center justify-center gap-1 pb-4">
            <AppText variant="caption">{t('noAccount')}</AppText>
            <TextLink label={t('register')} onPress={() => router.push('/auth/register')} />
          </View>
        }>
        <DemoAccounts
          hint={t('demoHint')}
          onSelect={(account) => {
            setIdentifier(account.identifier);
            setPassword(account.password);
          }}
        />

        <AppInput
          label={t('mobileOrEmail')}
          placeholder={t('mobilePlaceholder')}
          value={identifier}
          onChangeText={setIdentifier}
          keyboardType="email-address"
          autoComplete="tel"
          icon={Smartphone}
        />
        <AppInput
          label={t('password')}
          placeholder={t('passwordPlaceholder')}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          autoComplete="password"
          icon={KeyRound}
        />

        {errorMessage ? (
          <View className="rounded-xl bg-critical-light px-3 py-2">
            <AppText variant="caption" className="text-critical">{errorMessage}</AppText>
          </View>
        ) : null}

        <TextLink
          label={t('forgotPassword')}
          tone="secondary"
          align="right"
          onPress={() => router.push('/auth/forgot-password')}
        />

        <AppButton
          title={t('signIn')}
          onPress={handleLogin}
          loading={loginMutation.isPending}
        />
        <AppButton
          title={t('signInWithOtp')}
          variant="outline"
          onPress={handleOtpLogin}
          loading={otpMutation.isPending}
        />
        </AuthShell>
      </Screen>
    </ScreenBackground>
  );
}
