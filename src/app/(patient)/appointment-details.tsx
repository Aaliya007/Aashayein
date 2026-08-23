import { View } from 'react-native';

import { AppButton } from '@/components/ui/AppButton';
import { AppText } from '@/components/ui/AppText';
import { BaseCard } from '@/components/ui/BaseCard';
import { Screen } from '@/components/ui/Screen';
import { ScreenHeader } from '@/components/ui/ScreenHeader';

export default function AppointmentDetails() {
  return (
    <Screen
      scrollable
      header={
        <ScreenHeader
          contextLabel="Citizen Portal"
          title="Appointment Details"
        />
      }
    >
      <BaseCard>
        <AppText variant="title">
          ASHA Home Visit
        </AppText>

        <View className="mt-4">
          <AppText variant="caption">
            Date
          </AppText>

          <AppText variant="body" className="mt-1">
            25 Aug 2026
          </AppText>
        </View>

        <View className="mt-4">
          <AppText variant="caption">
            Time
          </AppText>

          <AppText variant="body" className="mt-1">
            10:00 AM
          </AppText>
        </View>

        <View className="mt-4">
          <AppText variant="caption">
            Location
          </AppText>

          <AppText variant="body" className="mt-1">
            Your Home
          </AppText>
        </View>
      </BaseCard>

      <BaseCard>
        <AppText variant="title">
          Appointment Status
        </AppText>

        <View className="mt-4 rounded-xl bg-teal-50 p-4">
          <AppText className="text-teal-800">
            Upcoming
          </AppText>
        </View>
      </BaseCard>

      <AppButton
        title="Cancel Appointment"
        variant="outline"
        onPress={() =>
          console.log('Cancel appointment')
        }
      />
    </Screen>
  );
}