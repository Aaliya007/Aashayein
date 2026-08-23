import { AuthShell } from '@/components/common/AuthShell';
import { OtpInput } from '@/components/common/OtpInput';
import { AppButton } from '@/components/ui/AppButton';
import { AppInput } from '@/components/ui/AppInput';
import { AppText } from '@/components/ui/AppText';
import { Screen } from '@/components/ui/Screen';
import { TextLink } from '@/components/ui/TextLink';
import { MOCK_OTP } from '@/constants/appContent';
import { useCopy } from '@/hooks/useCopy';
import { useOtpCountdown } from '@/hooks/useOtpCountdown';
import { useResetPassword, useVerifyOtp } from '@/hooks/useAuthMutations';
import { sendOtp } from '@/services/auth';
import { useAuthStore } from '@/stores/authStore';
import { router, useLocalSearchParams } from 'expo-router';
import { KeyRound } from 'lucide-react-native';
import { useState } from 'react';
import { View } from 'react-native';

export default function OtpScreen() {
  const { t } = useCopy();
  const params = useLocalSearchParams<{ mode?: string }>();
  const isResetMode = params.mode === 'reset';

  const pendingOtpMobile = useAuthStore((s) => s.pendingOtpMobile);
  const otpPurpose = useAuthStore((s) => s.otpPurpose);
  const setPendingOtp = useAuthStore((s) => s.setPendingOtp);
  const countdown = useOtpCountdown(30);

  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [localError, setLocalError] = useState('');
  const [resendMessage, setResendMessage] = useState('');
  const [isResending, setIsResending] = useState(false);

  const verifyMutation = useVerifyOtp();
  const resetMutation = useResetPassword();

  const mobile = pendingOtpMobile ?? '';
  const isPasswordReset = isResetMode || otpPurpose === 'forgot_password';

  const handleVerify = () => {
    setLocalError('');

    if (!mobile) {
      setLocalError('Mobile number missing. Please restart the flow.');
      return;
    }

    if (isPasswordReset) {
      if (newPassword !== confirmPassword) {
        setLocalError('Passwords do not match.');
        return;
      }
      resetMutation.mutate({ mobile, otp, newPassword }, { onError: () => undefined });
      return;
    }

    verifyMutation.mutate({ mobile, otp }, { onError: () => undefined });
  };

  const handleResend = async () => {
    if (!mobile || !countdown.canResend) return;
    setIsResending(true);
    setResendMessage('');
    try {
      const result = await sendOtp(mobile);
      setPendingOtp(mobile, otpPurpose ?? 'login');
      countdown.restart();
    } catch (error) {
      setLocalError(error instanceof Error ? error.message : 'Failed to resend OTP.');
    } finally {
      setIsResending(false);
    }
  };

  const activeError =
    localError || verifyMutation.error?.message || resetMutation.error?.message || '';

  const subtitle = mobile ? `${t('otpBody')} +91 ${mobile}` : t('otpBodyFallback');

  return (
    <Screen scrollable>
      <AuthShell contextLabel={t('otpEyebrow')} title={t('otpTitle')} subtitle={subtitle}>
        <OtpInput
          value={otp}
          onChange={setOtp}
          label={t('otpLabel')}
          helperText={`${t('demoOtp')} (${MOCK_OTP})`}
          error={activeError && otp.length === 6 ? activeError : undefined}
        />

        {isPasswordReset ? (
          <>
            <AppInput
              label={t('newPassword')}
              placeholder={t('newPasswordPlaceholder')}
              value={newPassword}
              onChangeText={setNewPassword}
              secureTextEntry
              icon={KeyRound}
            />
            <AppInput
              label={t('confirmNewPassword')}
              placeholder={t('confirmPasswordPlaceholder')}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
              icon={KeyRound}
            />
          </>
        ) : null}

        {activeError && otp.length < 6 ? (
          <AppText variant="caption" className="text-critical">
            {activeError}
          </AppText>
        ) : null}

        {resendMessage ? (
          <AppText variant="caption" className="text-primary">
            {resendMessage}
          </AppText>
        ) : null}

        <AppButton
          title={isPasswordReset ? t('resetPassword') : t('verifyContinue')}
          onPress={handleVerify}
          loading={verifyMutation.isPending || resetMutation.isPending}
        />

        <View className="items-center">
          <TextLink
            label={
              isResending
                ? t('sending')
                : countdown.canResend
                  ? t('resendOtp')
                  : `${t('resendIn')} ${countdown.remaining}s`
            }
            tone="secondary"
            align="center"
            disabled={!countdown.canResend || isResending}
            onPress={handleResend}
          />
          <TextLink
            label={t('backToSignIn')}
            tone="muted"
            align="center"
            onPress={() => router.replace('/auth/login')}
          />
        </View>
      </AuthShell>
    </Screen>
  );
}
