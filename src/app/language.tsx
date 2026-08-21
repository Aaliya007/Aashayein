import { GuestGuard } from '@/components/common/GuestGuard';
import { LanguageSelector } from '@/components/common/LanguageSelector';
import { AppButton } from '@/components/ui/AppButton';
import { Screen } from '@/components/ui/Screen';
import { AppLanguage } from '@/constants/appContent';
import { useCopy } from '@/hooks/useCopy';
import { useAppStore } from '@/stores/appStore';
import { router } from 'expo-router';
import { useState } from 'react';
import { View } from 'react-native';

export default function LanguageScreen() {
  const { t } = useCopy();
  const setLanguage = useAppStore((s) => s.setLanguage);
  const savedLanguage = useAppStore((s) => s.language);
  const [selected, setSelected] = useState<AppLanguage>(savedLanguage);

  const handleContinue = () => {
    setLanguage(selected);
    router.push('/auth/login');
  };

  return (
    <GuestGuard>
      <Screen scrollable>
        <LanguageSelector
          value={selected}
          onChange={setSelected}
          eyebrow={t('languageEyebrow')}
          title={t('languageTitle')}
          subtitle={t('languageBody')}
        />
        <View className="mt-8 pb-4">
          <AppButton title={t('continue')} onPress={handleContinue} />
        </View>
      </Screen>
    </GuestGuard>
  );
}
