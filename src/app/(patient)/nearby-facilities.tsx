import { useRouter } from 'expo-router';
import { Pressable, View } from 'react-native';

import { AppText } from '@/components/ui/AppText';
import { BaseCard } from '@/components/ui/BaseCard';
import { Screen } from '@/components/ui/Screen';
import { ScreenHeader } from '@/components/ui/ScreenHeader';

const facilities = [
  {
    id: '1',
    name: 'Primary Health Centre',
    distance: '1.2 km',
    type: 'PHC',
  },
  {
    id: '2',
    name: 'District Hospital',
    distance: '3.5 km',
    type: 'Hospital',
  },
  {
    id: '3',
    name: 'Community Health Centre',
    distance: '5.1 km',
    type: 'CHC',
  },
];

export default function NearbyFacilities() {
  const router = useRouter();

  return (
    <Screen
      scrollable
      header={
        <ScreenHeader
          contextLabel="Citizen Portal"
          title="Nearby Facilities"
        />
      }
    >
      <AppText variant="caption">
        Healthcare facilities near you
      </AppText>

      {facilities.map((facility) => (
        <Pressable
          key={facility.id}
          onPress={() =>
            router.push('/facility-details')
          }
        >
          <BaseCard className="mt-4">
            <View className="flex-row justify-between">
              <View className="flex-1">
                <AppText variant="title">
                  {facility.name}
                </AppText>

                <AppText
                  variant="caption"
                  className="mt-2"
                >
                  {facility.type}
                </AppText>

                <AppText
                  variant="caption"
                  className="mt-1"
                >
                  {facility.distance} away
                </AppText>
              </View>

              <AppText className="text-2xl">
                🏥
              </AppText>
            </View>

            <AppText
              variant="caption"
              className="mt-4 text-teal-700"
            >
              View Facility →
            </AppText>
          </BaseCard>
        </Pressable>
      ))}
    </Screen>
  );
}