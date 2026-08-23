import { useRouter } from 'expo-router';
import { Pressable, View } from 'react-native';

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

export default function Vaccination() {
  const router = useRouter();

  return (
    <Screen
      scrollable
      header={
        <ScreenHeader
          contextLabel="Citizen Portal"
          title="Vaccination"
        />
      }
    >
      <AppText variant="caption">
        Track your vaccination records and upcoming doses.
      </AppText>

      <BaseCard className="mt-4">
        <AppText variant="title">
          Vaccination Summary
        </AppText>

        <View className="mt-4 flex-row justify-between">
          <View>
            <AppText variant="caption">
              Completed
            </AppText>

            <AppText variant="display" className="mt-1">
              1
            </AppText>
          </View>

          <View>
            <AppText variant="caption">
              Upcoming
            </AppText>

            <AppText variant="display" className="mt-1">
              2
            </AppText>
          </View>
        </View>
      </BaseCard>

      <AppText variant="title" className="mt-4">
        Vaccination Records
      </AppText>

      {vaccinations.map((vaccination) => (
        <Pressable
  key={vaccination.id}
  onPress={() =>
    router.push({
      pathname: '/vaccination-details',
      params: { id: vaccination.id },
    })
  }
>
          <BaseCard className="mt-3">
            <View className="flex-row items-start justify-between">
              <View className="flex-1">
                <AppText variant="title">
                  {vaccination.name}
                </AppText>

                <AppText variant="caption" className="mt-1">
                  {vaccination.dose}
                </AppText>

                <AppText variant="caption" className="mt-2">
                  Date: {vaccination.date}
                </AppText>
              </View>

              <View
                className={`rounded-full px-3 py-2 ${
                  vaccination.status === 'Completed'
                    ? 'bg-green-100'
                    : 'bg-amber-100'
                }`}
              >
                <AppText
                  className={
                    vaccination.status === 'Completed'
                      ? 'text-green-800'
                      : 'text-amber-800'
                  }
                >
                  {vaccination.status}
                </AppText>
              </View>
            </View>

            <AppText
              variant="caption"
              className="mt-4 text-teal-700"
            >
              View Details →
            </AppText>
          </BaseCard>
        </Pressable>
      ))}
    </Screen>
  );
}