import { AppText } from '@/components/ui/AppText';
import { Screen } from '@/components/ui/Screen';
import { ScreenHeader } from '@/components/ui/ScreenHeader';

export default function Appointments() {
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
      <AppText variant="body">
        Appointments screen
      </AppText>
    </Screen>
  );
}