import { useRouter } from 'expo-router';
import { Pressable, View } from 'react-native';

import { AppText } from '@/components/ui/AppText';
import { BaseCard } from '@/components/ui/BaseCard';
import { Screen } from '@/components/ui/Screen';
import { ScreenHeader } from '@/components/ui/ScreenHeader';

const vaccinations = [
  {
    id: '1',
    name: 'BCG',
    status: 'Completed',
    date: '10 Jan 2026',
  },
  {
    id: '2',
    name: 'Polio',
    status: 'Completed',
    date: '15 Feb 2026',
  },
  {
    id: '3',
    name: 'Measles',
    status: 'Due',
    date: '28 Aug 2026',
  },
];

export default function Vaccinations() {
  const router = useRouter();

  return (
    <Screen
      scrollable
      header={
        <ScreenHeader
          contextLabel="Citizen Portal"
          title="Vaccinations"
        />
      }
    >
      <AppText variant="caption">
        Vaccination schedule and records
      </AppText>

      {vaccinations.map((vaccination) => (
        <Pressable
          key={vaccination.id}
          onPress={() =>
            router.push('/(patient)/vaccination-details')
          }
        >
          <BaseCard className="mt-4">
            <View className="flex-row justify-between">
              <View>
                <AppText variant="title">
                  {vaccination.name}
                </AppText>

                <AppText
                  variant="caption"
                  className="mt-1"
                >
                  {vaccination.date}
                </AppText>
              </View>

              <View
                className={`rounded-full px-3 py-2 ${
                  vaccination.status === 'Due'
                    ? 'bg-amber-100'
                    : 'bg-teal-100'
                }`}
              >
                <AppText
                  className={
                    vaccination.status === 'Due'
                      ? 'text-amber-800'
                      : 'text-teal-800'
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