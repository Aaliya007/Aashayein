import { Text, type TextProps } from 'react-native';

type AppTextVariant = 'title' | 'subtitle' | 'body' | 'caption' | 'label';

interface AppTextProps extends TextProps {
  variant?: AppTextVariant;
  className?: string;
  children: React.ReactNode;
}

const variantClasses: Record<AppTextVariant, string> = {
  title: 'text-2xl font-bold text-text-primary',
  subtitle: 'text-lg font-semibold text-text-primary',
  body: 'text-base text-text-primary',
  caption: 'text-sm text-text-secondary',
  label: 'text-sm font-medium text-text-primary',
};

export function AppText({
  variant = 'body',
  className = '',
  children,
  ...props
}: AppTextProps) {
  return (
    <Text className={`${variantClasses[variant]} ${className}`} {...props}>
      {children}
    </Text>
  );
}
