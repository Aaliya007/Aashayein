import * as Linking from 'expo-linking';
import { Alert, View } from 'react-native';

import { AppButton } from '@/components/ui/AppButton';
import { AppText } from '@/components/ui/AppText';
import { BaseCard } from '@/components/ui/BaseCard';
import { Screen } from '@/components/ui/Screen';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { getFacility } from '@/services/api/facility.api';
import type { ApiFacility } from '@/types/api';
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';

export default function FacilityDetails() {
  const { id } = useLocalSearchParams<{ id?: string }>();
  const [facility, setFacility] = useState<ApiFacility | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const facilityId = Number(id);
    if (!Number.isInteger(facilityId) || facilityId <= 0) {
      setError('Facility information is not available.');
      return;
    }

    getFacility(facilityId).then(setFacility).catch((error: unknown) => {
      setError(error instanceof Error ? error.message : 'Unable to load facility.');
    });
  }, [id]);

  const handleDirections = async () => {
    if (facility?.latitude == null || facility.longitude == null) {
      Alert.alert('Directions unavailable', 'This facility does not have a location yet.');
      return;
    }
    const url =
      `https://www.google.com/maps/dir/?api=1` +
      `&destination=${facility.latitude},${facility.longitude}`;

    try {
      await Linking.openURL(url);
    } catch {
      Alert.alert(
        'Unable to open Maps',
        'Please try opening Google Maps manually.',
      );
    }
  };

  const handleContact = async () => {
    if (!facility?.phone) {
      Alert.alert('Contact unavailable', 'This facility does not have a phone number yet.');
      return;
    }
    const url = `tel:${facility.phone}`;

    try {
      await Linking.openURL(url);
    } catch {
      Alert.alert(
        'Unable to make call',
        'Calling is not available on this device.',
      );
    }
  };

  return (
    <Screen
      scrollable
      header={
        <ScreenHeader
          contextLabel="Citizen Portal"
          title="Facility Details"
        />
      }
    >
      {error ? <BaseCard><AppText variant="caption">{error}</AppText></BaseCard> : !facility ? <BaseCard><AppText variant="caption">Loading facility...</AppText></BaseCard> : <BaseCard>
        <AppText variant="title">
          {facility.name}
        </AppText>

        <View className="mt-5">
          <AppText variant="caption">
            Type
          </AppText>

          <AppText variant="body" className="mt-1">
            {facility.type}
          </AppText>
        </View>

        <View className="mt-5">
          <AppText variant="caption">
            Distance
          </AppText>

          <AppText variant="body" className="mt-1">
            {facility.address}, {facility.district}
          </AppText>
        </View>

        <View className="mt-5">
          <AppText variant="caption">
            Services
          </AppText>

          <AppText variant="body" className="mt-1">
            Contact the facility for available services.
          </AppText>
        </View>
      </BaseCard>}

      <AppButton
        title="Get Directions"
        onPress={handleDirections}
        disabled={facility?.latitude == null || facility.longitude == null}
      />

      <View className="mt-3">
        <AppButton
          title="Contact Facility"
          variant="outline"
          onPress={handleContact}
          disabled={!facility?.phone}
        />
      </View>
    </Screen>
  );
}
