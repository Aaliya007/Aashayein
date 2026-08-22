import { AppText } from '@/components/ui/AppText';
import { Screen } from '@/components/ui/Screen';
import { ScreenHeader } from '@/components/ui/ScreenHeader';

export default function NearbyFacilities() {
  return (
    <Screen
      scrollable
      header={
        <ScreenHeader
          contextLabel="Citizen Portal"
          title="Nearby Facilities"
        />
      }
    >
      <AppText variant="body">
        Nearby Facilities screen
      </AppText>
    </Screen>
  );
}