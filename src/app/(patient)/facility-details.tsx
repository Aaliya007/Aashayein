import * as Linking from 'expo-linking';
import { Alert, View } from 'react-native';

import { AppButton } from '@/components/ui/AppButton';
import { AppText } from '@/components/ui/AppText';
import { BaseCard } from '@/components/ui/BaseCard';
import { Screen } from '@/components/ui/Screen';
import { ScreenHeader } from '@/components/ui/ScreenHeader';

const FACILITY_LATITUDE = 26.1001;
const FACILITY_LONGITUDE = 83.2001;
const FACILITY_PHONE = '9876543210';

export default function FacilityDetails() {
  const handleDirections = async () => {
    const url =
      `https://www.google.com/maps/dir/?api=1` +
      `&destination=${FACILITY_LATITUDE},${FACILITY_LONGITUDE}`;

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
    const url = `tel:${FACILITY_PHONE}`;

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
      <BaseCard>
        <AppText variant="title">
          Primary Health Centre
        </AppText>

        <View className="mt-5">
          <AppText variant="caption">
            Type
          </AppText>

          <AppText variant="body" className="mt-1">
            PHC
          </AppText>
        </View>

        <View className="mt-5">
          <AppText variant="caption">
            Distance
          </AppText>

          <AppText variant="body" className="mt-1">
            1.2 km
          </AppText>
        </View>

        <View className="mt-5">
          <AppText variant="caption">
            Services
          </AppText>

          <AppText variant="body" className="mt-1">
            General consultation, maternal care,
            vaccination and basic medicines
          </AppText>
        </View>
      </BaseCard>

      <AppButton
        title="Get Directions"
        onPress={handleDirections}
      />

      <View className="mt-3">
        <AppButton
          title="Contact Facility"
          variant="outline"
          onPress={handleContact}
        />
      </View>
    </Screen>
  );
}