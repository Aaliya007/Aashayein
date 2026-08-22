import { View } from 'react-native';

import { AppButton } from '@/components/ui/AppButton';
import { AppText } from '@/components/ui/AppText';
import { BaseCard } from '@/components/ui/BaseCard';
import { Screen } from '@/components/ui/Screen';
import { ScreenHeader } from '@/components/ui/ScreenHeader';

export default function VaccinationDetails() {
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
          Measles Vaccine
        </AppText>

        <View className="mt-5">
          <AppText variant="caption">
            Status
          </AppText>

          <AppText
            variant="body"
            className="mt-1 text-amber-700"
          >
            Due
          </AppText>
        </View>

        <View className="mt-5">
          <AppText variant="caption">
            Scheduled Date
          </AppText>

          <AppText variant="body" className="mt-1">
            28 Aug 2026
          </AppText>
        </View>
      </BaseCard>

      <AppButton
        title="Set Reminder"
        onPress={() =>
          console.log('Reminder set')
        }
      />
    </Screen>
  );
}