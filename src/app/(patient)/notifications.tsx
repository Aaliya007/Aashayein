import { View } from 'react-native';

import { AppText } from '@/components/ui/AppText';
import { BaseCard } from '@/components/ui/BaseCard';
import { Screen } from '@/components/ui/Screen';
import { ScreenHeader } from '@/components/ui/ScreenHeader';

const notifications = [
  {
    id: '1',
    title: 'Health Request Submitted',
    message: 'Your fever-related health request has been submitted successfully.',
    time: 'Today',
    type: 'Health Request',
  },
  {
    id: '2',
    title: 'ASHA Worker Assigned',
    message: 'An ASHA worker has been assigned to your health case.',
    time: 'Yesterday',
    type: 'Case Update',
  },
  {
    id: '3',
    title: 'Vaccination Reminder',
    message: 'Your upcoming vaccination is due on 28 Aug 2026.',
    time: '2 days ago',
    type: 'Vaccination',
  },
];

export default function Notifications() {
  return (
    <Screen
      scrollable
      header={
        <ScreenHeader
          contextLabel="Citizen Portal"
          title="Notifications"
        />
      }
    >
      <AppText variant="caption">
        Updates and important health information
      </AppText>

      {notifications.map((notification) => (
        <BaseCard key={notification.id} className="mt-4">
          <View className="flex-row items-start">
            <View className="mr-3 h-10 w-10 items-center justify-center rounded-full bg-teal-100">
              <AppText>🔔</AppText>
            </View>

            <View className="flex-1">
              <AppText variant="title">
                {notification.title}
              </AppText>

              <AppText variant="body" className="mt-2">
                {notification.message}
              </AppText>

              <View className="mt-3 flex-row items-center justify-between">
                <AppText variant="caption">
                  {notification.type}
                </AppText>

                <AppText variant="caption">
                  {notification.time}
                </AppText>
              </View>
            </View>
          </View>
        </BaseCard>
      ))}
    </Screen>
  );
}