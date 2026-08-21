import { BaseCard } from '@/components/ui/BaseCard';
import { Screen } from '@/components/ui/Screen';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { AppText } from '@/components/ui/AppText';
import { Map } from 'lucide-react-native';
import { View } from 'react-native';

export default function AshaMapScreen() {
  return (
    <Screen
      scrollable
      header={<ScreenHeader contextLabel="ASHA Portal" title="Health Heatmap" />}>
      <BaseCard className="items-center py-10">
        <View className="mb-4 rounded-full bg-secondary-light p-4">
          <Map size={32} color="#0284C7" />
        </View>
        <AppText variant="title" className="text-center">
          Map Coming Soon
        </AppText>
        <AppText variant="caption" className="mt-2 text-center">
          Disease clusters, severity zones and vulnerable households will appear here.
        </AppText>
      </BaseCard>
    </Screen>
  );
}
