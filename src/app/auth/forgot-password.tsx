import { AuthShell } from '@/components/common/AuthShell';
import { AppButton } from '@/components/ui/AppButton';
import { AppInput } from '@/components/ui/AppInput';
import { AppText } from '@/components/ui/AppText';
import { Screen } from '@/components/ui/Screen';
import { TextLink } from '@/components/ui/TextLink';
import { useCopy } from '@/hooks/useCopy';
import { useForgotPassword } from '@/hooks/useAuthMutations';
import { router } from 'expo-router';
import { Smartphone } from 'lucide-react-native';
import { useState } from 'react';
import { View } from 'react-native';

export default function ForgotPasswordScreen() {
  const { t } = useCopy();
  const [mobile, setMobile] = useState('');
  const forgotMutation = useForgotPassword();

  const handleSubmit = () => {
    forgotMutation.mutate(mobile, { onError: () => undefined });
  };

  return (
    <Screen scrollable>
      <AuthShell
        contextLabel={t('forgotEyebrow')}
        title={t('forgotTitle')}
        subtitle={t('forgotBody')}
        footer={
          <View className="items-center pb-4">
            <TextLink
              label={t('backToSignIn')}
              align="center"
              onPress={() => router.replace('/auth/login')}
            />
          </View>
        }>
        <AppInput
          label={t('mobile')}
          placeholder={t('mobilePlaceholderShort')}
          value={mobile}
          onChangeText={setMobile}
          keyboardType="phone-pad"
          maxLength={10}
          autoComplete="tel"
          icon={Smartphone}
          helperText={t('demoOtp')}
        />

        {forgotMutation.error ? (
          <AppText variant="caption" className="text-critical">
            {forgotMutation.error.message}
          </AppText>
        ) : null}

        <AppButton
          title={t('sendResetOtp')}
          onPress={handleSubmit}
          loading={forgotMutation.isPending}
        />
      </AuthShell>
    </Screen>
  );
}
