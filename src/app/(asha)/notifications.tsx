import { BaseCard } from '@/components/ui/BaseCard';
import { PriorityChip } from '@/components/ui/PriorityChip';
import { Screen } from '@/components/ui/Screen';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { AppText } from '@/components/ui/AppText';
import { View } from 'react-native';

const alerts = [
  { id: 1, title: 'Critical fever case in Rampur', level: 'high' as const },
  { id: 2, title: '3 households pending sync', level: 'medium' as const },
  { id: 3, title: 'Vaccination camp tomorrow', level: 'low' as const },
];

export default function AshaNotificationsScreen() {
  return (
    <Screen
      scrollable
      header={<ScreenHeader contextLabel="ASHA Portal" title="Alerts" />}>
      {alerts.map((alert) => (
        <BaseCard key={alert.id}>
          <View className="flex-row items-start justify-between gap-2">
            <AppText variant="label" className="flex-1">
              {alert.title}
            </AppText>
            <PriorityChip level={alert.level} />
          </View>
        </BaseCard>
      ))}
    </Screen>
  );
}
