import { View } from 'react-native';

import { AppButton } from '@/components/ui/AppButton';
import { AppText } from '@/components/ui/AppText';
import { BaseCard } from '@/components/ui/BaseCard';
import { Screen } from '@/components/ui/Screen';
import { ScreenHeader } from '@/components/ui/ScreenHeader';

export default function Profile() {
  return (
    <Screen
      scrollable
      header={
        <ScreenHeader
          contextLabel="Citizen Portal"
          title="My Profile"
        />
      }
    >
      <BaseCard className="items-center py-8">
        <View className="h-20 w-20 items-center justify-center rounded-full bg-teal-100">
          <AppText className="text-3xl">
            👤
          </AppText>
        </View>

        <AppText variant="title" className="mt-4">
          Citizen User
        </AppText>

        <AppText variant="caption" className="mt-1">
          Rural Citizen
        </AppText>
      </BaseCard>

      <BaseCard>
        <AppText variant="caption">
          Name
        </AppText>

        <AppText variant="body" className="mt-1">
          Citizen User
        </AppText>

        <View className="mt-5">
          <AppText variant="caption">
            Phone
          </AppText>

          <AppText variant="body" className="mt-1">
            +91 XXXXX XXXXX
          </AppText>
        </View>

        <View className="mt-5">
          <AppText variant="caption">
            Location
          </AppText>

          <AppText variant="body" className="mt-1">
            Your Village
          </AppText>
        </View>
      </BaseCard>

      <AppButton
        title="Edit Profile"
        onPress={() =>
          console.log('Edit profile')
        }
      />
    </Screen>
  );
}