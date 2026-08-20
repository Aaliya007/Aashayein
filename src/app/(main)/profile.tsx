import { AppButton } from '@/components/ui/AppButton';
import { AppText } from '@/components/ui/AppText';
import { Screen } from '@/components/ui/Screen';
import { mockPatient } from '@/data/mock/patient';
import { useAppContext } from '@/context/AppContext';
import { logout } from '@/services/auth';
import { router } from 'expo-router';
import { MapPin, Phone, User } from 'lucide-react-native';
import { View } from 'react-native';

export default function ProfileScreen() {
  const { user, setUser } = useAppContext();

  const handleLogout = async () => {
    await logout();
    setUser(null);
    router.replace('/');
  };

  if (!user) {
    return (
      <Screen contentClassName="justify-center">
        <AppText variant="body" className="text-center text-text-secondary">
          No user profile loaded
        </AppText>
      </Screen>
    );
  }

  return (
    <Screen scrollable>
      <View className="mb-6 mt-4 items-center">
        <View className="mb-4 h-20 w-20 items-center justify-center rounded-full bg-primary-light">
          <User size={36} color="#2F7D6D" accessibilityLabel="Profile icon" />
        </View>
        <AppText variant="title">{user.name}</AppText>
        <AppText variant="caption" className="mt-1 capitalize">
          {user.role.replace('_', ' ')}
        </AppText>
      </View>

      <View className="gap-3">
        <View className="flex-row items-center gap-3 rounded-2xl border border-border bg-surface p-4">
          <Phone size={20} color="#2F7D6D" />
          <View>
            <AppText variant="caption">Mobile</AppText>
            <AppText variant="label">{user.mobile}</AppText>
          </View>
        </View>

        <View className="flex-row items-center gap-3 rounded-2xl border border-border bg-surface p-4">
          <MapPin size={20} color="#2F7D6D" />
          <View>
            <AppText variant="caption">Location</AppText>
            <AppText variant="label">
              {user.village}, {user.district}
            </AppText>
          </View>
        </View>

        <View className="rounded-2xl border border-border bg-surface p-4">
          <AppText variant="caption">Patient Address</AppText>
          <AppText variant="label" className="mt-1">
            {mockPatient.address}
          </AppText>
        </View>
      </View>

      <View className="mt-8">
        <AppButton title="Log Out" onPress={handleLogout} variant="outline" />
      </View>
    </Screen>
  );
}
