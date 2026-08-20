import { AppText } from '@/components/ui/AppText';
import { Activity, Heart } from 'lucide-react-native';
import { View } from 'react-native';

export function HealthStatusCard() {
  return (
    <View className="mb-6 rounded-2xl bg-primary p-5">
      <View className="mb-3 flex-row items-center gap-2">
        <View className="rounded-full bg-white/20 p-2">
          <Heart size={20} color="#FFFFFF" accessibilityLabel="Health icon" />
        </View>
        <AppText variant="subtitle" className="text-white">
          Your Health
        </AppText>
      </View>
      <AppText variant="body" className="mb-4 text-white/90">
        Let&apos;s take care of your health today.
      </AppText>
      <View className="flex-row items-center gap-2 rounded-xl bg-white/15 px-3 py-2">
        <Activity size={16} color="#FFFFFF" />
        <AppText variant="caption" className="text-white">
          Status: Stable — No urgent concerns reported
        </AppText>
      </View>
    </View>
  );
}
