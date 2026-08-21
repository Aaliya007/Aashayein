import { Eye, EyeOff, type LucideIcon } from 'lucide-react-native';
import { useState } from 'react';
import { Pressable, TextInput, View, type KeyboardTypeOptions } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { AppText } from '@/components/ui/AppText';
import { colors } from '@/constants/colors';

interface AppInputProps {
  label: string;
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  keyboardType?: KeyboardTypeOptions;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  error?: string;
  helperText?: string;
  editable?: boolean;
  icon?: LucideIcon;
  maxLength?: number;
  autoComplete?: 'tel' | 'email' | 'password' | 'name' | 'off';
  returnKeyType?: 'done' | 'next';
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
  helperText,
  editable = true,
  icon: Icon,
  maxLength,
  autoComplete,
  returnKeyType,
}: AppInputProps) {
  const [hidden, setHidden] = useState(secureTextEntry);
  const focusProgress = useSharedValue(0);
  const focusStyle = useAnimatedStyle(() => ({
    borderColor: error ? colors.critical : focusProgress.value ? colors.primary : colors.border,
    transform: [{ scale: 1 + focusProgress.value * 0.005 }],
  }));

  return (
    <View className="gap-2">
      <AppText variant="label">{label}</AppText>
      <Animated.View
        className={`min-h-touch flex-row items-center rounded-xl border bg-surface-subdued px-3 ${
          error ? 'border-critical' : 'border-border'
        } ${!editable ? 'opacity-60' : ''}`}
        style={focusStyle}>
        {Icon ? (
          <View className="mr-2">
            <Icon size={18} color={error ? colors.critical : colors.textMuted} />
          </View>
        ) : null}
        <TextInput
          accessibilityLabel={label}
          placeholder={placeholder}
          placeholderTextColor={colors.textMuted}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={hidden}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          editable={editable}
          maxLength={maxLength}
          autoComplete={autoComplete}
          returnKeyType={returnKeyType}
          onFocus={() => { focusProgress.value = withTiming(1, { duration: 160 }); }}
          onBlur={() => { focusProgress.value = withTiming(0, { duration: 160 }); }}
          className="min-h-touch flex-1 py-3 text-base text-text-primary"
          style={{ fontFamily: 'Inter_400Regular' }}
        />
        {secureTextEntry ? (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={hidden ? 'Show password' : 'Hide password'}
            onPress={() => setHidden((value) => !value)}
            className="min-h-touch min-w-touch items-center justify-center">
            {hidden ? (
              <Eye size={18} color={colors.textMuted} />
            ) : (
              <EyeOff size={18} color={colors.textMuted} />
            )}
          </Pressable>
        ) : null}
      </Animated.View>
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
