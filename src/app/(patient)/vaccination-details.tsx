import { AppButton } from '@/components/ui/AppButton';
import { AppText } from '@/components/ui/AppText';
import { BaseCard } from '@/components/ui/BaseCard';
import { Screen } from '@/components/ui/Screen';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { getMockVaccinationsForPatients, getVaccinationStatusLabel } from '@/data/mockVaccinations';
import { useAuthStore } from '@/stores/authStore';
import { useLocalSearchParams } from 'expo-router';
import { View } from 'react-native';

export default function VaccinationDetails() {
  const { id } = useLocalSearchParams<{ id?: string }>();
  const patientId = useAuthStore((state) => state.user?.patientId);
  const vaccination = patientId
    ? getMockVaccinationsForPatients([patientId]).find((item) => item.id === Number(id))
    : undefined;

  if (!vaccination) {
    return (
      <Screen scrollable header={<ScreenHeader contextLabel="Citizen Portal" title="Vaccination Details" />}>
        <BaseCard><AppText variant="caption">Vaccination record not found.</AppText></BaseCard>
      </Screen>
    );
  }

  const isCompleted = vaccination.status === 'completed';

  return (
    <Screen scrollable header={<ScreenHeader contextLabel="Citizen Portal" title="Vaccination Details" />}>
      <BaseCard>
        <AppText variant="title">{vaccination.name}</AppText>
        {vaccination.dose ? <Detail label="Dose" value={vaccination.dose} /> : null}
        <View className="mt-5">
          <AppText variant="caption">Status</AppText>
          <AppText variant="body" className={`mt-1 ${isCompleted ? 'text-green-700' : 'text-amber-700'}`}>
            {getVaccinationStatusLabel(vaccination.status)}
          </AppText>
        </View>
        <Detail label={isCompleted ? 'Vaccination Date' : 'Due Date'} value={vaccination.completedAt ?? vaccination.dueDate} />
      </BaseCard>
      {!isCompleted ? <AppButton title="Set Reminder" onPress={() => console.log('Reminder set')} /> : null}
    </Screen>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <View className="mt-5">
      <AppText variant="caption">{label}</AppText>
      <AppText variant="body" className="mt-1">{value}</AppText>
    </View>
  );
}
