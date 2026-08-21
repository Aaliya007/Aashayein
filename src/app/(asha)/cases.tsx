import { BaseCard } from '@/components/ui/BaseCard';
import { PriorityChip, getPriorityFromScore } from '@/components/ui/PriorityChip';
import { Screen } from '@/components/ui/Screen';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { AppText } from '@/components/ui/AppText';
import { View } from 'react-native';

const cases = [
  { id: 1, patient: 'Ram Kaur', symptoms: 'Fever, headache', score: 9, status: 'open' },
  { id: 2, patient: 'Baljit Singh', symptoms: 'Cough, fatigue', score: 6, status: 'in_progress' },
  { id: 3, patient: 'Sukhdev Kaur', symptoms: 'Joint pain', score: 3, status: 'open' },
];

export default function AshaCasesScreen() {
  return (
    <Screen
      scrollable
      header={<ScreenHeader contextLabel="ASHA Portal" title="Cases" />}>
      {cases.map((item) => (
        <BaseCard key={item.id}>
          <View className="mb-2 flex-row items-start justify-between gap-2">
            <View className="flex-1">
              <AppText variant="label">{item.patient}</AppText>
              <AppText variant="caption" className="capitalize">
                Status: {item.status.replace('_', ' ')}
              </AppText>
            </View>
            <PriorityChip level={getPriorityFromScore(item.score)} />
          </View>
          <AppText variant="body" className="text-text-secondary">
            {item.symptoms}
          </AppText>
        </BaseCard>
      ))}
    </Screen>
  );
}
