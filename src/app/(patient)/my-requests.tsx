import { useRouter } from 'expo-router';
import { Pressable, View } from 'react-native';

import { AppText } from '@/components/ui/AppText';
import { BaseCard } from '@/components/ui/BaseCard';
import { Screen } from '@/components/ui/Screen';
import { ScreenHeader } from '@/components/ui/ScreenHeader';

const requests = [
  {
    id: '1',
    title: 'Fever',
    description: 'Fever since yesterday',
    date: '22 Aug 2026',
    status: 'Pending',
  },
  {
    id: '2',
    title: 'Child Vaccination',
    description: 'Vaccination appointment request',
    date: '20 Aug 2026',
    status: 'Completed',
  },
  {
    id: '3',
    title: 'Body Pain',
    description: 'General body pain',
    date: '18 Aug 2026',
    status: 'Assigned',
  },
];

export default function MyRequests() {
  const router = useRouter();

  return (
    <Screen
      scrollable
      header={
        <ScreenHeader
          contextLabel="Citizen Portal"
          title="My Requests"
        />
      }
    >
      <AppText variant="caption">
        Your submitted health requests
      </AppText>

      {requests.map((request) => (
        <Pressable
          key={request.id}
          onPress={() => router.push('/request-details')}
        >
          <BaseCard className="mt-4">
            <View className="flex-row items-start justify-between">
              <View className="flex-1">
                <AppText variant="title">
                  {request.title}
                </AppText>

                <AppText
                  variant="caption"
                  className="mt-1"
                >
                  {request.description}
                </AppText>

                <AppText
                  variant="caption"
                  className="mt-2"
                >
                  Submitted {request.date}
                </AppText>
              </View>

              <View className="rounded-full bg-amber-100 px-3 py-2">
                <AppText className="text-amber-800">
                  {request.status}
                </AppText>
              </View>
            </View>

            <AppText
              variant="caption"
              className="mt-4 text-teal-700"
            >
              View Details →
            </AppText>
          </BaseCard>
        </Pressable>
      ))}
    </Screen>
  );
}