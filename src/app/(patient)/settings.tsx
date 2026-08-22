import { View } from 'react-native';

import { AppText } from '@/components/ui/AppText';
import { BaseCard } from '@/components/ui/BaseCard';
import { Screen } from '@/components/ui/Screen';
import { ScreenHeader } from '@/components/ui/ScreenHeader';

export default function Settings() {
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
        <View className="py-2">
          <AppText variant="title">
            Language
          </AppText>

          <AppText variant="caption" className="mt-1">
            Hindi / English
          </AppText>
        </View>

        <View className="mt-5 border-t border-slate-100 pt-5">
          <AppText variant="title">
            Notifications
          </AppText>

          <AppText variant="caption" className="mt-1">
            Manage health reminders and updates
          </AppText>
        </View>

        <View className="mt-5 border-t border-slate-100 pt-5">
          <AppText variant="title">
            Offline Mode
          </AppText>

          <AppText variant="caption" className="mt-1">
            Access saved health information without
            internet
          </AppText>
        </View>

        <View className="mt-5 border-t border-slate-100 pt-5">
          <AppText variant="title">
            Privacy
          </AppText>

          <AppText variant="caption" className="mt-1">
            Manage your health data and permissions
          </AppText>
        </View>
      </BaseCard>
    </Screen>
  );
}