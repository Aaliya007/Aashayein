import { AppText } from '@/components/ui/AppText';
import { Screen } from '@/components/ui/Screen';
import { ScreenHeader } from '@/components/ui/ScreenHeader';

export default function HealthRequest() {
  return (
    <Screen
      scrollable
      header={
        <ScreenHeader
          contextLabel="Citizen Portal"
          title="Health Request"
        />
      }
    >
      <AppText variant="body">
        Health Request screen
      </AppText>
    </Screen>
  );
}