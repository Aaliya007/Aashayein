import { router } from 'expo-router';
import { View } from 'react-native';

import { AppButton } from '@/components/ui/AppButton';
import { AppText } from '@/components/ui/AppText';
import { BaseCard } from '@/components/ui/BaseCard';
import { Screen } from '@/components/ui/Screen';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { useLogout } from '@/hooks/useAuthMutations';

export default function Settings() {
  const logoutMutation = useLogout();

  return (
    <Screen
      scrollable
      header={
        <ScreenHeader
          contextLabel="Citizen Portal"
          title="Settings"
        />
      }
    >
      <BaseCard>
        <AppText variant="title">
          Account
        </AppText>

        <View className="mt-5">
          <AppText variant="label">
            Profile
          </AppText>

          <AppText variant="caption" className="mt-1">
            Manage your personal information
          </AppText>
        </View>

        <AppButton
          title="View Profile"
          variant="outline"
          onPress={() => router.push('/profile')}
        />
      </BaseCard>

      <BaseCard>
        <AppText variant="title">
          Language
        </AppText>

        <AppText variant="caption" className="mt-2">
          Current language: English
        </AppText>

        <AppButton
          title="Hindi / English"
          variant="outline"
          onPress={() => console.log('Language selection')}
        />
      </BaseCard>

      <BaseCard>
        <AppText variant="title">
          App Information
        </AppText>

        <AppText variant="caption" className="mt-2">
          AASHAYEN — Rural Citizen Healthcare Support
        </AppText>

        <AppText variant="caption" className="mt-1">
          Hackathon Prototype
        </AppText>
      </BaseCard>

      <AppButton
        title="Log Out"
        variant="outline"
        onPress={() => logoutMutation.mutate()}
        loading={logoutMutation.isPending}
      />
    </Screen>
  );
}