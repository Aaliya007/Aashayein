import { AppText } from '@/components/ui/AppText';
import { View } from 'react-native';

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  centered?: boolean;
}

export function SectionHeader({ eyebrow, title, subtitle, centered = false }: SectionHeaderProps) {
  const alignment = centered ? 'items-center text-center' : '';
  return (
    <View className={alignment}>
      {eyebrow ? <AppText variant="subtitle" className="text-primary">{eyebrow}</AppText> : null}
      <AppText variant="display" className={`${eyebrow ? 'mt-2' : ''} ${centered ? 'text-center' : ''}`}>{title}</AppText>
      {subtitle ? <AppText variant="body" className={`mt-2 text-text-secondary ${centered ? 'text-center' : ''}`}>{subtitle}</AppText> : null}
    </View>
  );
}
