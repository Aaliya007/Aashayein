import { View } from 'react-native';

import { AppButton } from '@/components/ui/AppButton';
import { AppText } from '@/components/ui/AppText';
import { BaseCard } from '@/components/ui/BaseCard';
import { Screen } from '@/components/ui/Screen';
import { ScreenHeader } from '@/components/ui/ScreenHeader';

export default function FacilityDetails() {
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
        onPress={() =>
          console.log('Open directions')
        }
      />

      <View className="mt-3">
        <AppButton
          title="Contact Facility"
          variant="outline"
          onPress={() =>
            console.log('Contact facility')
          }
        />
      </View>
    </Screen>
  );
}