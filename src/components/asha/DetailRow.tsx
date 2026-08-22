import { AppText } from '@/components/ui/AppText';
import { View } from 'react-native';

interface DetailRowProps {
  label: string;
  value: string;
}

/** Shared key/value row for ASHA record detail cards. */
export function DetailRow({ label, value }: DetailRowProps) {
  return (
    <View className="mb-3">
      <AppText variant="caption">{label}</AppText>
      <AppText variant="body" className="mt-0.5 text-text-secondary">
        {value}
      </AppText>
    </View>
  );
}
