import { BaseCard } from '@/components/ui/BaseCard';
import { PriorityChip, getPriorityFromScore } from '@/components/ui/PriorityChip';
import { Screen } from '@/components/ui/Screen';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { AppText } from '@/components/ui/AppText';
import { mockHealthRequests } from '@/data/mock/healthRequests';
import { useAuthStore } from '@/stores/authStore';
import { getFirstName, getGreeting } from '@/utils/greeting';
import { AlertTriangle, ClipboardList, MapPin } from 'lucide-react-native';
import { View } from 'react-native';

const queuePreview = [
  { id: 1, name: 'Ram Kaur', village: 'Rampur', score: 9, issue: 'High fever, 3 days' },
  { id: 2, name: 'Baljit Singh', village: 'Dharampura', score: 6, issue: 'Persistent cough' },
  { id: 3, name: 'Meena Devi', village: 'Rampur', score: 2, issue: 'ANC follow-up due' },
];

export default function AshaHomeScreen() {
  const user = useAuthStore((s) => s.user);
  const firstName = getFirstName(user?.name ?? 'ASHA Worker');

  return (
    <Screen
      scrollable
      header={
        <ScreenHeader
          contextLabel="ASHA Portal"
          title={`${getGreeting()}, ${firstName}`}
        />
      }>
      <BaseCard className="border-primary/20 bg-primary-light">
        <AppText variant="subtitle" className="text-primary">
          Smart Daily Queue
        </AppText>
        <AppText variant="body" className="mt-1 text-text-secondary">
          {queuePreview.length} households prioritized for today
        </AppText>
      </BaseCard>

      <View className="mb-3 flex-row flex-wrap gap-3">
        <BaseCard className="mb-0 min-w-[46%] flex-1">
          <ClipboardList size={20} color="#0284C7" />
          <AppText variant="title" className="mt-2">
            {mockHealthRequests.length}
          </AppText>
          <AppText variant="caption">Open Requests</AppText>
        </BaseCard>
        <BaseCard className="mb-0 min-w-[46%] flex-1">
          <AlertTriangle size={20} color="#BE123C" />
          <AppText variant="title" className="mt-2">
            1
          </AppText>
          <AppText variant="caption">Critical Alerts</AppText>
        </BaseCard>
      </View>

      <AppText variant="subtitle" className="mb-3">
        Priority Queue
      </AppText>

      {queuePreview.map((item) => (
        <BaseCard key={item.id}>
          <View className="mb-2 flex-row items-start justify-between gap-2">
            <View className="flex-1">
              <AppText variant="label">{item.name}</AppText>
              <AppText variant="caption">{item.village}</AppText>
            </View>
            <PriorityChip level={getPriorityFromScore(item.score)} />
          </View>
          <AppText variant="body" className="text-text-secondary">
            {item.issue}
          </AppText>
        </BaseCard>
      ))}

      <BaseCard>
        <View className="flex-row items-center gap-2">
          <MapPin size={18} color="#0F766E" />
          <AppText variant="label">Offline mode ready</AppText>
        </View>
        <AppText variant="caption" className="mt-1">
          Visit records will sync automatically when connectivity returns.
        </AppText>
      </BaseCard>
    </Screen>
  );
}
