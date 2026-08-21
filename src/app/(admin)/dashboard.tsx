import { BaseCard } from '@/components/ui/BaseCard';
import { AppButton } from '@/components/ui/AppButton';
import { Screen } from '@/components/ui/Screen';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { AppText } from '@/components/ui/AppText';
import { useLogout } from '@/hooks/useAuthMutations';
import { useAuthStore } from '@/stores/authStore';
import { ShieldCheck } from 'lucide-react-native';
import { View } from 'react-native';

export default function AdminDashboardPlaceholder() {
  const user = useAuthStore((s) => s.user);
  const logoutMutation = useLogout();

  return (
    <Screen
      scrollable
      header={<ScreenHeader contextLabel="Admin Portal" title="Dashboard" />}>
      <BaseCard className="items-center py-8">
        <View className="mb-4 rounded-full bg-critical-light p-4">
          <ShieldCheck size={32} color="#BE123C" />
        </View>
        <AppText variant="title" className="text-center">
          Admin Dashboard Placeholder
        </AppText>
        <AppText variant="caption" className="mt-2 text-center">
          Frontend Person 2 will build analytics, disease intelligence, user management and
          facility oversight here.
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
