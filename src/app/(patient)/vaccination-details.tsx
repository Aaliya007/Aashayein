import { useLocalSearchParams } from 'expo-router';
import { View } from 'react-native';

import { AppButton } from '@/components/ui/AppButton';
import { AppText } from '@/components/ui/AppText';
import { BaseCard } from '@/components/ui/BaseCard';
import { Screen } from '@/components/ui/Screen';
import { ScreenHeader } from '@/components/ui/ScreenHeader';

const vaccinations = [
  {
    id: '1',
    name: 'Measles Vaccine',
    dose: 'Dose 1',
    date: '28 Aug 2026',
    status: 'Due',
  },
  {
    id: '2',
    name: 'Tetanus Vaccine',
    dose: 'Dose 1',
    date: '20 Jul 2026',
    status: 'Completed',
  },
  {
    id: '3',
    name: 'Influenza Vaccine',
    dose: 'Annual Dose',
    date: '15 Sep 2026',
    status: 'Upcoming',
  },
];

export default function VaccinationDetails() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const vaccination =
    vaccinations.find((item) => item.id === id) ?? vaccinations[0];

  return (
    <Screen
      scrollable
      header={
        <ScreenHeader
          contextLabel="Citizen Portal"
          title="Vaccination Details"
        />
      }
    >
      <BaseCard>
        <AppText variant="title">
          {vaccination.name}
        </AppText>

        <View className="mt-5">
          <AppText variant="caption">
            Dose
          </AppText>

          <AppText variant="body" className="mt-1">
            {vaccination.dose}
          </AppText>
        </View>

        <View className="mt-5">
          <AppText variant="caption">
            Status
          </AppText>

          <AppText
            variant="body"
            className={`mt-1 ${
              vaccination.status === 'Completed'
                ? 'text-green-700'
                : 'text-amber-700'
            }`}
          >
            {vaccination.status}
          </AppText>
        </View>

        <View className="mt-5">
          <AppText variant="caption">
            Scheduled Date
          </AppText>

          <AppText variant="body" className="mt-1">
            {vaccination.date}
          </AppText>
        </View>
      </BaseCard>

      {vaccination.status !== 'Completed' && (
        <AppButton
          title="Set Reminder"
          onPress={() => console.log('Reminder set')}
        />
      )}
    </Screen>
  );
}