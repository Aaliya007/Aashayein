import { View } from 'react-native';

import { AppButton } from '@/components/ui/AppButton';
import { AppText } from '@/components/ui/AppText';
import { BaseCard } from '@/components/ui/BaseCard';
import { Screen } from '@/components/ui/Screen';
import { ScreenHeader } from '@/components/ui/ScreenHeader';

export default function RequestDetails() {
  return (
    <Screen
      scrollable
      header={
        <ScreenHeader
          contextLabel="Citizen Portal"
          title="Request Details"
        />
      }
    >
      {/* Request Summary */}
      <BaseCard>
        <View className="flex-row items-center justify-between">
          <AppText variant="title">
            Fever
          </AppText>

          <View className="rounded-full bg-amber-100 px-3 py-2">
            <AppText className="text-amber-800">
              Pending
            </AppText>
          </View>
        </View>

        <AppText variant="caption" className="mt-4">
          Health Concern
        </AppText>

        <AppText variant="body" className="mt-1">
          Fever since yesterday
        </AppText>
      </BaseCard>

      {/* Request Information */}
      <BaseCard>
        <AppText variant="title">
          Request Information
        </AppText>

        <View className="mt-4">
          <AppText variant="caption">
            Request Type
          </AppText>

          <AppText variant="body" className="mt-1">
            Text Request
          </AppText>
        </View>

        <View className="mt-4">
          <AppText variant="caption">
            Submitted
          </AppText>

          <AppText variant="body" className="mt-1">
            22 Aug 2026
          </AppText>
        </View>

        <View className="mt-4">
          <AppText variant="caption">
            Priority
          </AppText>

          <AppText variant="body" className="mt-1">
            Medium
          </AppText>
        </View>

        <View className="mt-4">
          <AppText variant="caption">
            Assigned ASHA Worker
          </AppText>

          <AppText variant="body" className="mt-1">
            Not assigned yet
          </AppText>
        </View>
      </BaseCard>

      {/* Request Timeline */}
      <BaseCard>
        <AppText variant="title">
          Request Updates
        </AppText>

        <View className="mt-4">
          <AppText variant="label">
            22 Aug 2026
          </AppText>

          <AppText variant="body" className="mt-1">
            Health request submitted
          </AppText>
        </View>

        <View className="mt-4">
          <AppText variant="label">
            Current Status
          </AppText>

          <AppText variant="body" className="mt-1">
            Waiting for ASHA worker assignment
          </AppText>
        </View>
      </BaseCard>

      {/* Cancel */}
      <AppButton
        title="Cancel Request"
        variant="outline"
        onPress={() => console.log('Cancel request')}
      />
    </Screen>
  );
}