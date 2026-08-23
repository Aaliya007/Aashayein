import { AppText } from '@/components/ui/AppText';
import { BaseCard } from '@/components/ui/BaseCard';
import { Screen } from '@/components/ui/Screen';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { getMockVaccinationsForPatients, getVaccinationStatusLabel } from '@/data/mockVaccinations';
import { useAuthStore } from '@/stores/authStore';
import { router } from 'expo-router';
import { Pressable, View } from 'react-native';

export default function Vaccinations() {
  const patientId = useAuthStore((state) => state.user?.patientId);
  const vaccinations = patientId ? getMockVaccinationsForPatients([patientId]) : [];
  const completedCount = vaccinations.filter((vaccination) => vaccination.status === 'completed').length;
  const upcomingCount = vaccinations.length - completedCount;

  return (
    <Screen
      scrollable
      header={<ScreenHeader contextLabel="Citizen Portal" title="Vaccination" />}>
      <AppText variant="caption">Track your vaccination records and upcoming doses.</AppText>

      {!patientId ? (
        <BaseCard className="mt-4">
          <AppText variant="caption">Patient information is not available.</AppText>
        </BaseCard>
      ) : (
        <>
          <BaseCard className="mt-4">
            <AppText variant="title">Vaccination Summary</AppText>
            <View className="mt-4 flex-row justify-between">
              <View>
                <AppText variant="caption">Completed</AppText>
                <AppText variant="display" className="mt-1">{completedCount}</AppText>
              </View>
              <View>
                <AppText variant="caption">Upcoming</AppText>
                <AppText variant="display" className="mt-1">{upcomingCount}</AppText>
              </View>
            </View>
          </BaseCard>

          <AppText variant="title" className="mt-4">Vaccination Records</AppText>
          {vaccinations.map((vaccination) => {
            const isCompleted = vaccination.status === 'completed';
            return (
              <Pressable
                key={vaccination.id}
                onPress={() => router.push({ pathname: '/(patient)/vaccination-details', params: { id: String(vaccination.id) } })}>
                <BaseCard className="mt-3">
                  <View className="flex-row items-start justify-between">
                    <View className="flex-1">
                      <AppText variant="title">{vaccination.name}</AppText>
                      {vaccination.dose ? <AppText variant="caption" className="mt-1">{vaccination.dose}</AppText> : null}
                      <AppText variant="caption" className="mt-2">
                        {isCompleted ? 'Completed' : 'Due'}: {vaccination.completedAt ?? vaccination.dueDate}
                      </AppText>
                    </View>
                    <View className={`rounded-full px-3 py-2 ${isCompleted ? 'bg-green-100' : 'bg-amber-100'}`}>
                      <AppText className={isCompleted ? 'text-green-800' : 'text-amber-800'}>
                        {getVaccinationStatusLabel(vaccination.status)}
                      </AppText>
                    </View>
                  </View>
                  <AppText variant="caption" className="mt-4 text-teal-700">View Details →</AppText>
                </BaseCard>
              </Pressable>
            );
          })}
        </>
      )}
    </Screen>
  );
}
