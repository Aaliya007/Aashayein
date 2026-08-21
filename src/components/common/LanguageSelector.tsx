import { AppText } from '@/components/ui/AppText';
import { colors } from '@/constants/colors';
import { languageOptions, type AppLanguage } from '@/constants/appContent';
import { Check, Globe } from 'lucide-react-native';
import { Pressable, View } from 'react-native';

interface LanguageSelectorProps {
  value: AppLanguage;
  onChange: (language: AppLanguage) => void;
  title: string;
  subtitle: string;
  eyebrow: string;
}

export function LanguageSelector({
  value,
  onChange,
  title,
  subtitle,
  eyebrow,
}: LanguageSelectorProps) {
  return (
    <View className="gap-3">
      <View className="mb-3 items-center">
        <View className="mb-4 h-16 w-16 items-center justify-center rounded-2xl bg-secondary-light">
          <Globe size={30} color={colors.secondary} accessibilityLabel="Language selection" />
        </View>
        <AppText variant="subtitle" className="text-primary">
          {eyebrow}
        </AppText>
        <AppText variant="display" className="mt-1 text-center">
          {title}
        </AppText>
        <AppText variant="body" className="mt-2 text-center text-text-secondary">
          {subtitle}
        </AppText>
      </View>

      {languageOptions.map((option) => {
        const isSelected = value === option.code;
        return (
          <Pressable
            key={option.code}
            accessibilityRole="radio"
            accessibilityState={{ selected: isSelected, disabled: !option.available }}
            accessibilityLabel={`Select ${option.label}`}
            onPress={() => option.available && onChange(option.code)}
            className={`min-h-touch flex-row items-center justify-between rounded-2xl border p-4 ${
              isSelected ? 'border-primary bg-primary-soft' : 'border-border bg-surface'
            }`}>
            <View className="flex-1 pr-3">
              <AppText variant="label">{option.nativeLabel}</AppText>
              <AppText variant="caption" className="mt-0.5">
                {option.label}
              </AppText>
              <AppText variant="caption" className="mt-1 text-text-muted">
                {option.sample}
              </AppText>
            </View>
            {isSelected ? (
              <View className="h-7 w-7 items-center justify-center rounded-full bg-primary">
                <Check size={16} color="#FFFFFF" />
              </View>
            ) : (
              <View className="h-7 w-7 rounded-full border-2 border-border" />
            )}
          </Pressable>
        );
      })}
    </View>
  );
}