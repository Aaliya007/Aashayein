import { AppText } from '@/components/ui/AppText';
import { useRef } from 'react';
import { Pressable, TextInput, View } from 'react-native';

interface OtpInputProps {
  value: string;
  onChange: (value: string) => void;
  length?: number;
  error?: string;
  label: string;
  helperText?: string;
}

export function OtpInput({
  value,
  onChange,
  length = 6,
  error,
  label,
  helperText,
}: OtpInputProps) {
  const inputRef = useRef<TextInput>(null);
  const digits = value.padEnd(length, ' ').slice(0, length).split('');

  const handleChange = (text: string) => {
    const sanitized = text.replace(/\D/g, '').slice(0, length);
    onChange(sanitized);
  };

  return (
    <View className="gap-2">
      <AppText variant="label">{label}</AppText>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={label}
        onPress={() => inputRef.current?.focus()}
        className="flex-row justify-between gap-2">
        {digits.map((digit, index) => {
          const isActive = value.length === index;
          return (
            <View
              key={index}
              className={`min-h-[56px] min-w-[44px] flex-1 items-center justify-center rounded-xl border bg-surface-subdued ${
                error
                  ? 'border-critical'
                  : isActive
                    ? 'border-primary bg-primary-soft'
                    : 'border-border'
              }`}>
              <AppText variant="title">{digit.trim()}</AppText>
            </View>
          );
        })}
      </Pressable>
      <TextInput
        ref={inputRef}
        value={value}
        onChangeText={handleChange}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        maxLength={length}
        autoFocus
        className="absolute h-px w-px opacity-0"
        accessibilityLabel="OTP digit entry"
      />
      {error ? (
        <AppText variant="caption" className="text-critical">
          {error}
        </AppText>
      ) : helperText ? (
        <AppText variant="caption">{helperText}</AppText>
      ) : null}
    </View>
  );
}
