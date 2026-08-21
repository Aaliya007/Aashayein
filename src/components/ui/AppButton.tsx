import { Pressable, Text, ActivityIndicator } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

type AppButtonVariant = 'primary' | 'secondary' | 'outline' | 'critical';

interface AppButtonProps {
  title: string;
  onPress: () => void;
  variant?: AppButtonVariant;
  disabled?: boolean;
  loading?: boolean;
  accessibilityLabel?: string;
  className?: string;
}

const containerClasses: Record<AppButtonVariant, string> = {
  primary: 'bg-primary active:bg-teal-800',
  secondary: 'bg-secondary active:bg-secondary-dark',
  outline: 'bg-transparent border border-primary',
  critical: 'bg-critical active:bg-rose-700 shadow-md',
};

const textClasses: Record<AppButtonVariant, string> = {
  primary: 'text-white',
  secondary: 'text-white',
  outline: 'text-primary',
  critical: 'text-white',
};

const spinnerColors: Record<AppButtonVariant, string> = {
  primary: '#FFFFFF',
  secondary: '#FFFFFF',
  outline: '#0F766E',
  critical: '#FFFFFF',
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
  const scale = useSharedValue(1);
  const animatedStyle = useAnimatedStyle(() => ({ transform: [{ scale: scale.value }] }));

  return (
    <Animated.View style={animatedStyle}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={accessibilityLabel ?? title}
        accessibilityState={{ disabled: isDisabled }}
        onPress={onPress}
        onPressIn={() => { if (!isDisabled) scale.value = withSpring(0.97); }}
        onPressOut={() => { scale.value = withSpring(1); }}
        disabled={isDisabled}
        className={`min-h-touch items-center justify-center rounded-2xl px-6 py-3.5 ${containerClasses[variant]} ${
          isDisabled ? 'opacity-50' : ''
        } ${className}`}
        style={variant === 'primary' ? { shadowColor: '#0F766E', shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.18, shadowRadius: 12, elevation: 3 } : undefined}>
        {loading ? (
          <ActivityIndicator color={spinnerColors[variant]} />
        ) : (
          <Text className={`text-base font-bold ${textClasses[variant]}`} style={{ fontFamily: 'Poppins_600SemiBold' }}>{title}</Text>
        )}
      </Pressable>
    </Animated.View>
  );
}
