import { Text, type TextProps } from 'react-native';

type AppTextVariant = 'display' | 'title' | 'subtitle' | 'body' | 'caption' | 'label';

interface AppTextProps extends TextProps {
  variant?: AppTextVariant;
  className?: string;
  children: React.ReactNode;
}

const variantClasses: Record<AppTextVariant, string> = {
  display: 'text-2xl font-bold text-text-primary',
  title: 'text-lg font-semibold text-text-primary',
  subtitle: 'text-sm font-semibold uppercase tracking-wider text-text-secondary',
  body: 'text-base font-normal text-slate-800',
  caption: 'text-xs font-medium text-text-secondary',
  label: 'text-sm font-medium text-text-primary',
};

const fontFamilies: Record<AppTextVariant, string> = {
  display: 'Poppins_700Bold',
  title: 'Poppins_600SemiBold',
  subtitle: 'Poppins_600SemiBold',
  body: 'Inter_400Regular',
  caption: 'Inter_500Medium',
  label: 'Inter_500Medium',
};

export function AppText({
  variant = 'body',
  className = '',
  children,
  style,
  ...props
}: AppTextProps) {
  return (
    <Text className={`${variantClasses[variant]} ${className}`} style={[{ fontFamily: fontFamilies[variant] }, style]} {...props}>
      {children}
    </Text>
  );
}
