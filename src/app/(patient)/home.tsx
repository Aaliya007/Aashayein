import { BrandMark } from '@/components/common/BrandMark';
import { AppButton } from '@/components/ui/AppButton';
import { AppText } from '@/components/ui/AppText';
import { BaseCard } from '@/components/ui/BaseCard';
import { Screen } from '@/components/ui/Screen';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { useAuthStore } from '@/stores/authStore';
import { useRouter } from 'expo-router';
import { HeartPulse, Hospital, Mic } from 'lucide-react-native';
import { View } from 'react-native';

export default function PatientHome() {
  const user = useAuthStore((s) => s.user);
  const router = useRouter();

  return (
    <Screen
      scrollable
      header={<ScreenHeader contextLabel="Citizen Portal" title="Patient Home" />}>
      <BaseCard className="items-center py-8">
        <View className="mb-4">
          <BrandMark size="sm" />
        </View>
        <AppText variant="title" className="text-center">
          Patient Portal
        </AppText>

        <AppText variant="caption" className="mt-1">
          How can we help you today?
        </AppText>
      </BaseCard>

      {/* Main Health Request */}
      <BaseCard className="mb-4">
        <View className="mb-3 flex-row items-center">
          <View className="mr-3 rounded-full bg-teal-50 p-3">
            <HeartPulse size={26} color="#0D9488" />
          </View>

          <View className="flex-1">
            <AppText variant="title">
              Need Healthcare?
            </AppText>

            <AppText variant="caption" className="mt-1">
              Tell us about your health problem.
            </AppText>
          </View>
        </View>

        <AppButton
          title="Request Healthcare"
          onPress={() => router.push('/health-request')}
        />
      </BaseCard>

      {/* Voice Request */}
      <BaseCard className="mb-4">
        <View className="mb-3 flex-row items-center">
          <View className="mr-3 rounded-full bg-rose-50 p-3">
            <Mic size={26} color="#BE123C" />
          </View>

          <View className="flex-1">
            <AppText variant="title">
              Speak Your Problem
            </AppText>

            <AppText variant="caption" className="mt-1">
              Describe your health problem using your voice.
            </AppText>
          </View>
        </View>

        <AppButton
          title="Voice Request"
          variant="outline"
          onPress={() => router.push('/voice-request')}
        />
      </BaseCard>

      
        {/* Quick Actions */}
       
<AppText variant="label" className="mb-3">
  QUICK ACTIONS
</AppText>

<BaseCard className="mb-4">
  <View className="flex-row flex-wrap justify-between">

    {/* My Requests */}
    <View className="mb-3 w-[48%]">
      <AppButton
        title="My Requests"
        variant="outline"
        onPress={() => router.push('/my-requests')}
      />
    </View>

    {/* Appointments */}
    <View className="mb-3 w-[48%]">
      <AppButton
        title="Appointments"
        variant="outline"
        onPress={() => router.push('/appointments')}
      />
    </View>

    {/* Vaccinations */}
    <View className="mb-3 w-[48%]">
      <AppButton
        title="Vaccinations"
        variant="outline"
        onPress={() => router.push('/(patient)/vaccinations')}
      />
    </View>

    {/* Health History */}
    <View className="mb-3 w-[48%]">
      <AppButton
        title="Health History"
        variant="outline"
        onPress={() => router.push('/health-history')}
      />
    </View>

    {/* Profile */}
    <View className="mb-3 w-[48%]">
      <AppButton
        title="Profile"
        variant="outline"
        onPress={() => router.push('/profile')}
      />
    </View>

    {/* Settings */}
    <View className="mb-3 w-[48%]">
      <AppButton
        title="Settings"
        variant="outline"
        onPress={() => router.push('/settings')}
      />
    </View>

  </View>
</BaseCard>

      {/* Nearby Facilities */}
      <BaseCard className="mb-4">
        <View className="flex-row items-center">
          <View className="mr-3 rounded-full bg-sky-50 p-3">
            <Hospital size={26} color="#0284C7" />
          </View>

          <View className="flex-1">
            <AppText variant="title">
              Nearby Healthcare
            </AppText>

            <AppText variant="caption" className="mt-1">
              Find nearby hospitals, PHCs and healthcare facilities.
            </AppText>
          </View>
        </View>

        <View className="mt-3">
          <AppButton
            title="Find Facilities"
            variant="outline"
            onPress={() => router.push('/nearby-facilities')}
          />
        </View>
      </BaseCard>

    </Screen>
  );
}
