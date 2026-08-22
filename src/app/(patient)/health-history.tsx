import { View } from 'react-native';

import { AppText } from '@/components/ui/AppText';
import { BaseCard } from '@/components/ui/BaseCard';
import { Screen } from '@/components/ui/Screen';
import { ScreenHeader } from '@/components/ui/ScreenHeader';

export default function HealthHistory() {
  return (
    <Screen
      scrollable
      header={
        <ScreenHeader
          contextLabel="Citizen Portal"
          title="Health History"
        />
      }
    >
      <BaseCard>
        <AppText variant="title">
          Health Summary
        </AppText>

        <View className="mt-5 flex-row justify-between">
          <View>
            <AppText variant="caption">
              Weight
            </AppText>

            <AppText variant="body" className="mt-1">
              52 kg
            </AppText>
          </View>

          <View>
            <AppText variant="caption">
              Blood Group
            </AppText>

            <AppText variant="body" className="mt-1">
              B+
            </AppText>
          </View>
        </View>
      </BaseCard>

      <BaseCard>
        <AppText variant="title">
          Recent Visits
        </AppText>

        <View className="mt-5">
          <AppText variant="label">
            20 Aug 2026
          </AppText>

          <AppText variant="body" className="mt-1">
            General health checkup
          </AppText>
        </View>

        <View className="mt-5">
          <AppText variant="label">
            15 Jul 2026
          </AppText>

          <AppText variant="body" className="mt-1">
            Routine health visit
          </AppText>
        </View>

        <View className="mt-5">
          <AppText variant="label">
            10 Jun 2026
          </AppText>

          <AppText variant="body" className="mt-1">
            Vaccination follow-up
          </AppText>
        </View>
      </BaseCard>
    </Screen>
  );
}