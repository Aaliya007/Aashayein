import { AppButton } from '@/components/ui/AppButton';
import { AppText } from '@/components/ui/AppText';
import { BaseCard } from '@/components/ui/BaseCard';
import { Screen } from '@/components/ui/Screen';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { patientsApi } from '@/services/api/patients.api';
import { useAuthStore } from '@/stores/authStore';
import { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';

export default function Profile() {
  const user = useAuthStore((s) => s.user);

  const [profile, setProfile] =
    useState<
      Awaited<ReturnType<typeof patientsApi.getById>>['data'] | null
    >(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadProfile = async () => {
      if (!user?.patientId) {
        setLoading(false);
        setError('Patient information not found.');
        return;
      }

      try {
        setError('');

        const response = await patientsApi.getById(
          user.patientId,
        );

        console.log('PATIENT PROFILE:', response.data);

        setProfile(response.data);
      } catch (err: any) {
        console.log('PATIENT PROFILE ERROR:', err?.message);

        setError(
          err?.message ?? 'Unable to load your profile.',
        );
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, [user?.patientId]);

  if (loading) {
    return (
      <Screen
        scrollable
        header={
          <ScreenHeader
            contextLabel="Citizen Portal"
            title="My Profile"
          />
        }
      >
        <View className="items-center py-12">
          <ActivityIndicator />

          <AppText variant="caption" className="mt-3">
            Loading your profile...
          </AppText>
        </View>
      </Screen>
    );
  }

  if (error || !profile) {
    return (
      <Screen
        scrollable
        header={
          <ScreenHeader
            contextLabel="Citizen Portal"
            title="My Profile"
          />
        }
      >
        <BaseCard className="mt-4">
          <AppText variant="title">
            Unable to load profile
          </AppText>

          <AppText variant="caption" className="mt-2">
            {error || 'Profile not found.'}
          </AppText>
        </BaseCard>
      </Screen>
    );
  }

  return (
    <Screen
      scrollable
      header={
        <ScreenHeader
          contextLabel="Citizen Portal"
          title="My Profile"
        />
      }
    >
      {/* Profile Header */}
      <BaseCard className="items-center py-8">
        <View className="h-20 w-20 items-center justify-center rounded-full bg-teal-100">
          <AppText className="text-3xl">
            👤
          </AppText>
        </View>

        <AppText variant="title" className="mt-4">
          {profile.name || 'Citizen'}
        </AppText>

        <AppText variant="caption" className="mt-1">
          Rural Citizen
        </AppText>
      </BaseCard>

      {/* Personal Information */}
      <BaseCard>
        <AppText variant="title">
          Personal Information
        </AppText>

        <View className="mt-4">
          <AppText variant="caption">
            Name
          </AppText>

          <AppText variant="body" className="mt-1">
            {profile.name || 'Not available'}
          </AppText>
        </View>

        <View className="mt-5">
          <AppText variant="caption">
            Phone
          </AppText>

          <AppText variant="body" className="mt-1">
            {profile.mobile || 'Not available'}
          </AppText>
        </View>

        <View className="mt-5">
          <AppText variant="caption">
            Email
          </AppText>

          <AppText variant="body" className="mt-1">
            {profile.email || 'Not available'}
          </AppText>
        </View>

        <View className="mt-5">
          <AppText variant="caption">
            Gender
          </AppText>

          <AppText variant="body" className="mt-1">
            {profile.gender || 'Not available'}
          </AppText>
        </View>

        <View className="mt-5">
          <AppText variant="caption">
            Date of Birth
          </AppText>

          <AppText variant="body" className="mt-1">
            {profile.dateOfBirth || 'Not available'}
          </AppText>
        </View>
      </BaseCard>

      {/* Location */}
      <BaseCard>
        <AppText variant="title">
          Location
        </AppText>

        <View className="mt-4">
          <AppText variant="caption">
            Village
          </AppText>

          <AppText variant="body" className="mt-1">
            {profile.village || 'Not available'}
          </AppText>
        </View>

        <View className="mt-5">
          <AppText variant="caption">
            District
          </AppText>

          <AppText variant="body" className="mt-1">
            {profile.district || 'Not available'}
          </AppText>
        </View>

        <View className="mt-5">
          <AppText variant="caption">
            Address
          </AppText>

          <AppText variant="body" className="mt-1">
            {profile.address || 'Not available'}
          </AppText>
        </View>
      </BaseCard>

      {/* Emergency Contact */}
      <BaseCard>
        <AppText variant="title">
          Emergency Contact
        </AppText>

        <AppText variant="body" className="mt-4">
          {profile.emergencyContact || 'Not available'}
        </AppText>
      </BaseCard>

      <AppButton
        title="Edit Profile"
        onPress={() =>
          console.log('Edit profile')
        }
      />
    </Screen>
  );
}