import { AppText } from '@/components/ui/AppText';
import { Pressable } from 'react-native';

interface TextLinkProps {
  label: string;
  onPress: () => void;
  accessibilityLabel?: string;
  disabled?: boolean;
  tone?: 'primary' | 'secondary' | 'muted';
  align?: 'left' | 'center' | 'right';
}

const toneClasses = {
  primary: 'text-primary',
  secondary: 'text-secondary',
  muted: 'text-text-secondary',
};

const alignClasses = {
  left: 'self-start',
  center: 'self-center',
  right: 'self-end',
};

export function TextLink({
  label,
  onPress,
  accessibilityLabel,
  disabled = false,
  tone = 'primary',
  align = 'left',
}: TextLinkProps) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel ?? label}
      accessibilityState={{ disabled }}
      onPress={onPress}
      disabled={disabled}
      hitSlop={8}
      className={`min-h-touch justify-center px-1 ${alignClasses[align]} ${
        disabled ? 'opacity-50' : 'active:opacity-70'
      }`}>
      <AppText variant="label" className={toneClasses[tone]}>
        {label}
      </AppText>
    </Pressable>
  );
}
