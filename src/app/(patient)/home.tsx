import { BaseCard } from '@/components/ui/BaseCard';
import { AppButton } from '@/components/ui/AppButton';
import { Screen } from '@/components/ui/Screen';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { AppText } from '@/components/ui/AppText';
import { useLogout } from '@/hooks/useAuthMutations';
import { useAuthStore } from '@/stores/authStore';
import { HeartPulse } from 'lucide-react-native';
import { View } from 'react-native';

export default function PatientHomePlaceholder() {
  const user = useAuthStore((s) => s.user);
  const logoutMutation = useLogout();

  return (
    <Screen
      scrollable
      header={<ScreenHeader contextLabel="Citizen Portal" title="Patient Home" />}>
      <BaseCard className="items-center py-8">
        <View className="mb-4 rounded-full bg-secondary-light p-4">
          <HeartPulse size={32} color="#0284C7" />
        </View>
        <AppText variant="title" className="text-center">
          Patient Portal Placeholder
        </AppText>
        <AppText variant="caption" className="mt-2 text-center">
          Frontend Person 2 will build health requests, voice input, family timeline and nearby
          facilities here.
        </AppText>
        {user ? (
          <AppText variant="label" className="mt-4">
            Signed in as {user.name}
          </AppText>
        ) : null}
      </BaseCard>

      <AppButton
        title="Log Out"
        variant="outline"
        onPress={() => logoutMutation.mutate()}
        loading={logoutMutation.isPending}
      />
    </Screen>
  );
}
