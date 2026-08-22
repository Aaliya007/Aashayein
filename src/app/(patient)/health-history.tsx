import { AppText } from '@/components/ui/AppText';
import { Screen } from '@/components/ui/Screen';
import { ScreenHeader } from '@/components/ui/ScreenHeader';

export default function HealthHistory() {
  return (
    <Screen
      scrollable
      header={
        <ScreenHeader
          contextLabel="Citizen Portal"
          title="Health History"
        />
      }
    >
      <AppText variant="body">
        Health History screen
      </AppText>
    </Screen>
  );
}