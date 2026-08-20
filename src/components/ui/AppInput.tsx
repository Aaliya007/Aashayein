import { AppText } from '@/components/ui/AppText';
import { TextInput, View, type KeyboardTypeOptions } from 'react-native';

interface AppInputProps {
  label: string;
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  keyboardType?: KeyboardTypeOptions;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  error?: string;
}

export function AppInput({
  label,
  placeholder,
  value,
  onChangeText,
  secureTextEntry = false,
  keyboardType = 'default',
  autoCapitalize = 'none',
  error,
}: AppInputProps) {
  return (
    <View className="gap-2">
      <AppText variant="label">{label}</AppText>
      <TextInput
        accessibilityLabel={label}
        placeholder={placeholder}
        placeholderTextColor="#9CA3AF"
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
        className={`min-h-[52px] rounded-xl border bg-surface px-4 text-base text-text-primary ${
          error ? 'border-danger' : 'border-border'
        }`}
      />
      {error ? <AppText variant="caption" className="text-danger">{error}</AppText> : null}
    </View>
  );
}
