import { AppText } from '@/components/ui/AppText';
import { Screen } from '@/components/ui/Screen';
import { ScreenHeader } from '@/components/ui/ScreenHeader';

export default function VoiceRequest() {
  return (
    <Screen
      scrollable
      header={
        <ScreenHeader
          contextLabel="Citizen Portal"
          title="Voice Request"
        />
      }
    >
      <AppText variant="body">
        Voice Request screen
      </AppText>
    </Screen>
  );
}