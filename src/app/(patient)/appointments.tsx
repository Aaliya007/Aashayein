import { useRouter } from 'expo-router';
import { Pressable, View } from 'react-native';

import { AppText } from '@/components/ui/AppText';
import { BaseCard } from '@/components/ui/BaseCard';
import { Screen } from '@/components/ui/Screen';
import { ScreenHeader } from '@/components/ui/ScreenHeader';

const appointments = [
  {
    id: '1',
    type: 'ASHA Home Visit',
    date: '25 Aug 2026',
    time: '10:00 AM',
    location: 'Your Home',
    status: 'Upcoming',
  },
  {
    id: '2',
    type: 'PHC Consultation',
    date: '28 Aug 2026',
    time: '11:30 AM',
    location: 'Primary Health Centre',
    status: 'Upcoming',
  },
];

export default function Appointments() {
  const router = useRouter();

  return (
    <Screen
      scrollable
      header={
        <ScreenHeader
          contextLabel="Citizen Portal"
          title="Appointments"
        />
      }
    >
      <AppText variant="caption">
        Your upcoming healthcare appointments
      </AppText>

      {appointments.map((appointment) => (
        <Pressable
          key={appointment.id}
          onPress={() =>
            router.push('/appointment-details')
          }
        >
          <BaseCard className="mt-4">
            <View className="flex-row justify-between">
              <View className="flex-1">
                <AppText variant="title">
                  {appointment.type}
                </AppText>

                <AppText
                  variant="body"
                  className="mt-2"
                >
                  {appointment.date}
                </AppText>

                <AppText variant="caption">
                  {appointment.time}
                </AppText>

                <AppText
                  variant="caption"
                  className="mt-2"
                >
                  {appointment.location}
                </AppText>
              </View>

              <View className="rounded-full bg-teal-100 px-3 py-2">
                <AppText className="text-teal-800">
                  {appointment.status}
                </AppText>
              </View>
            </View>

            <AppText
              variant="caption"
              className="mt-4 text-teal-700"
            >
              View Appointment →
            </AppText>
          </BaseCard>
        </Pressable>
      ))}
    </Screen>
  );
}

