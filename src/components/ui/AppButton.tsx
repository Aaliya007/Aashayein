import { Pressable, Text, ActivityIndicator } from 'react-native';

type AppButtonVariant = 'primary' | 'secondary' | 'outline';

interface AppButtonProps {
  title: string;
  onPress: () => void;
  variant?: AppButtonVariant;
  disabled?: boolean;
  loading?: boolean;
  accessibilityLabel?: string;
  className?: string;
}

const variantClasses: Record<AppButtonVariant, string> = {
  primary: 'bg-primary',
  secondary: 'bg-primary-light',
  outline: 'bg-surface border border-primary',
};

const textClasses: Record<AppButtonVariant, string> = {
  primary: 'text-white',
  secondary: 'text-primary',
  outline: 'text-primary',
};

export function AppButton({
  title,
  onPress,
  variant = 'primary',
  disabled = false,
  loading = false,
  accessibilityLabel,
  className = '',
}: AppButtonProps) {
  const isDisabled = disabled || loading;

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel ?? title}
      accessibilityState={{ disabled: isDisabled }}
      onPress={onPress}
      disabled={isDisabled}
      className={`min-h-[52px] items-center justify-center rounded-xl px-6 py-3 ${variantClasses[variant]} ${
        isDisabled ? 'opacity-50' : 'active:opacity-80'
      } ${className}`}>
      {loading ? (
        <ActivityIndicator color={variant === 'primary' ? '#FFFFFF' : '#2F7D6D'} />
      ) : (
        <Text className={`text-base font-semibold ${textClasses[variant]}`}>{title}</Text>
      )}
    </Pressable>
  );
}
