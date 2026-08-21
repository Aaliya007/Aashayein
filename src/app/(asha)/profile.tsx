import { BaseCard } from '@/components/ui/BaseCard';
import { AppButton } from '@/components/ui/AppButton';
import { Screen } from '@/components/ui/Screen';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { AppText } from '@/components/ui/AppText';
import { useLogout } from '@/hooks/useAuthMutations';
import { useAuthStore } from '@/stores/authStore';
import { getRoleLabel } from '@/utils/routing';
import { MapPin, Phone, User } from 'lucide-react-native';
import { View } from 'react-native';

export default function AshaProfileScreen() {
  const user = useAuthStore((s) => s.user);
  const logoutMutation = useLogout();

  if (!user) return null;

  return (
    <Screen
      scrollable
      header={<ScreenHeader contextLabel="ASHA Portal" title="Profile" />}>
      <View className="mb-4 items-center">
        <View className="mb-3 h-20 w-20 items-center justify-center rounded-full bg-primary-light">
          <User size={36} color="#0F766E" />
        </View>
        <AppText variant="title">{user.name}</AppText>
        <AppText variant="caption">{getRoleLabel(user.role)}</AppText>
      </View>

      <BaseCard>
        <View className="flex-row items-center gap-3">
          <Phone size={20} color="#0F766E" />
          <View>
            <AppText variant="caption">Mobile</AppText>
            <AppText variant="label">{user.mobile}</AppText>
          </View>
        </View>
      </BaseCard>

      <BaseCard>
        <View className="flex-row items-center gap-3">
          <MapPin size={20} color="#0F766E" />
          <View>
            <AppText variant="caption">Assigned Area</AppText>
            <AppText variant="label">
              {user.village}, {user.district}
            </AppText>
          </View>
        </View>
      </BaseCard>

      <AppButton
        title="Log Out"
        variant="outline"
        onPress={() => logoutMutation.mutate()}
        loading={logoutMutation.isPending}
        className="mt-4"
      />
    </Screen>
  );
}
