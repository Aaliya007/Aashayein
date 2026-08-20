import { AppText } from '@/components/ui/AppText';
import { HealthTip } from '@/data/mock/healthTips';
import { Lightbulb } from 'lucide-react-native';
import { View } from 'react-native';

interface HealthTipCardProps {
  tip: HealthTip;
}

export function HealthTipCard({ tip }: HealthTipCardProps) {
  return (
    <View className="rounded-2xl border border-border bg-surface p-5">
      <View className="mb-3 flex-row items-center gap-2">
        <View className="rounded-full bg-primary-light p-2">
          <Lightbulb size={18} color="#2F7D6D" accessibilityLabel="Health tip icon" />
        </View>
        <AppText variant="subtitle">Daily Health Tip</AppText>
      </View>
      <AppText variant="label" className="mb-1 text-primary">
        {tip.title}
      </AppText>
      <AppText variant="body" className="text-text-secondary">
        {tip.message}
      </AppText>
    </View>
  );
}
