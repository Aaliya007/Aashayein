import { AppButton } from '@/components/ui/AppButton';
import { AppText } from '@/components/ui/AppText';
import { Screen } from '@/components/ui/Screen';
import { AppLanguage, languageOptions } from '@/constants/appContent';
import { useAppContext } from '@/context/AppContext';
import { router } from 'expo-router';
import { Check, Globe } from 'lucide-react-native';
import { useState } from 'react';
import { Pressable, View } from 'react-native';

export default function LanguageSelectionScreen() {
  const { language, setLanguage } = useAppContext();
  const [selected, setSelected] = useState<AppLanguage>(language);

  const handleContinue = () => {
    setLanguage(selected);
    router.push('/auth/login');
  };

  return (
    <Screen scrollable>
      <View className="mb-6 mt-4 items-center">
        <View className="mb-4 h-16 w-16 items-center justify-center rounded-full bg-primary-light">
          <Globe size={32} color="#2F7D6D" accessibilityLabel="Language selection" />
        </View>
        <AppText variant="title" className="text-center">
          Choose Your Language
        </AppText>
        <AppText variant="body" className="mt-2 text-center text-text-secondary">
          Select the language you&apos;re most comfortable with
        </AppText>
      </View>

      <View className="gap-3">
        {languageOptions.map((option) => {
          const isSelected = selected === option.code;
          return (
            <Pressable
              key={option.code}
              accessibilityRole="radio"
              accessibilityState={{ selected: isSelected }}
              accessibilityLabel={`Select ${option.label}`}
              onPress={() => setSelected(option.code)}
              className={`flex-row items-center justify-between rounded-2xl border p-4 ${
                isSelected ? 'border-primary bg-primary-light' : 'border-border bg-surface'
              }`}>
              <View>
                <AppText variant="label">{option.nativeLabel}</AppText>
                <AppText variant="caption">{option.label}</AppText>
              </View>
              {isSelected ? (
                <View className="h-6 w-6 items-center justify-center rounded-full bg-primary">
                  <Check size={14} color="#FFFFFF" />
                </View>
              ) : (
                <View className="h-6 w-6 rounded-full border-2 border-border" />
              )}
            </Pressable>
          );
        })}
      </View>

      <View className="mt-8">
        <AppButton title="Continue" onPress={handleContinue} />
      </View>
    </Screen>
  );
}
