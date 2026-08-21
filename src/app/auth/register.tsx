import { AuthShell } from '@/components/common/AuthShell';
import { RoleSelector } from '@/components/common/RoleSelector';
import { AppButton } from '@/components/ui/AppButton';
import { AppInput } from '@/components/ui/AppInput';
import { AppText } from '@/components/ui/AppText';
import { Screen } from '@/components/ui/Screen';
import { ScreenBackground } from '@/components/ui/ScreenBackground';
import { TextLink } from '@/components/ui/TextLink';
import { useCopy } from '@/hooks/useCopy';
import { useRegister } from '@/hooks/useAuthMutations';
import { UserRole } from '@/types/user';
import { router } from 'expo-router';
import { KeyRound, Mail, MapPin, Smartphone, UserRound } from 'lucide-react-native';
import { useState } from 'react';
import { View } from 'react-native';

export default function RegisterScreen() {
  const { t } = useCopy();
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [village, setVillage] = useState('');
  const [district, setDistrict] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState<UserRole>('asha');
  const [localError, setLocalError] = useState('');

  const registerMutation = useRegister();

  const handleRegister = () => {
    setLocalError('');

    if (password !== confirmPassword) {
      setLocalError('Passwords do not match.');
      return;
    }

    registerMutation.mutate(
      {
        name,
        mobile,
        email: email.trim() || undefined,
        password,
        role,
        village: village.trim() || undefined,
        district: district.trim() || undefined,
      },
      { onError: () => undefined },
    );
  };

  return (
    <ScreenBackground>
      <Screen scrollable className="bg-transparent" contentClassName="py-7">
        <AuthShell
        contextLabel={t('registerEyebrow')}
        title={t('registerTitle')}
        subtitle={t('registerBody')}
        footer={
          <View className="flex-row items-center justify-center gap-1 pb-4">
            <AppText variant="caption">{t('hasAccount')}</AppText>
            <TextLink label={t('signInLink')} onPress={() => router.replace('/auth/login')} />
          </View>
        }>
        <AppInput
          label={t('fullName')}
          placeholder={t('fullNamePlaceholder')}
          value={name}
          onChangeText={setName}
          autoCapitalize="words"
          autoComplete="name"
          icon={UserRound}
        />
        <AppInput
          label={t('mobile')}
          placeholder={t('mobilePlaceholderShort')}
          value={mobile}
          onChangeText={setMobile}
          keyboardType="phone-pad"
          maxLength={10}
          autoComplete="tel"
          icon={Smartphone}
        />
        <AppInput
          label={t('emailOptional')}
          placeholder={t('emailPlaceholder')}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoComplete="email"
          icon={Mail}
        />

        <View className="flex-row gap-3">
          <View className="flex-1">
            <AppInput
              label={t('village')}
              placeholder={t('villagePlaceholder')}
              value={village}
              onChangeText={setVillage}
              autoCapitalize="words"
              icon={MapPin}
            />
          </View>
          <View className="flex-1">
            <AppInput
              label={t('district')}
              placeholder={t('districtPlaceholder')}
              value={district}
              onChangeText={setDistrict}
              autoCapitalize="words"
            />
          </View>
        </View>

        <RoleSelector value={role} onChange={setRole} registerableOnly label={t('roleLabel')} />

        <AppInput
          label={t('password')}
          placeholder={t('passwordPlaceholder')}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          autoComplete="password"
          icon={KeyRound}
        />
        <AppInput
          label={t('confirmPassword')}
          placeholder={t('confirmPasswordPlaceholder')}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
          icon={KeyRound}
        />

        {localError ? (
          <View className="rounded-xl bg-critical-light px-3 py-2">
            <AppText variant="caption" className="text-critical">{localError}</AppText>
          </View>
        ) : null}
        {registerMutation.error ? (
          <View className="rounded-xl bg-critical-light px-3 py-2">
            <AppText variant="caption" className="text-critical">{registerMutation.error.message}</AppText>
          </View>
        ) : null}

        <AppButton
          title={t('continueOtp')}
          onPress={handleRegister}
          loading={registerMutation.isPending}
        />
        </AuthShell>
      </Screen>
    </ScreenBackground>
  );
}
