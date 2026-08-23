import { useRouter } from 'expo-router';
import { Pressable, View } from 'react-native';

import { AppText } from '@/components/ui/AppText';
import { BaseCard } from '@/components/ui/BaseCard';
import { Screen } from '@/components/ui/Screen';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { listFacilities } from '@/services/api/facility.api';
import type { ApiFacility } from '@/types/api';
import { useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';

export default function NearbyFacilities() {
  const router = useRouter();
  const [facilities, setFacilities] = useState<ApiFacility[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadFacilities = async () => {
      try {
        setFacilities(await listFacilities());
      } catch (error: unknown) {
        setError(error instanceof Error ? error.message : 'Unable to load facilities.');
      } finally {
        setLoading(false);
      }
    };

    loadFacilities();
  }, []);

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

      {loading ? (
        <View className="items-center py-10"><ActivityIndicator /><AppText variant="caption" className="mt-3">Loading facilities...</AppText></View>
      ) : error ? (
        <BaseCard className="mt-4"><AppText variant="caption">{error}</AppText></BaseCard>
      ) : facilities.map((facility) => (
        <Pressable
          key={facility.id}
          onPress={() =>
            router.push({ pathname: '/facility-details', params: { id: String(facility.id) } })
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
                  {facility.address}, {facility.district}
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
