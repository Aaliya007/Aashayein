import { AppButton } from '@/components/ui/AppButton';
import { AppText } from '@/components/ui/AppText';
import { Screen } from '@/components/ui/Screen';
import { router } from 'expo-router';
import { HeartPulse } from 'lucide-react-native';
import { View } from 'react-native';

export default function WelcomeScreen() {
  return (
    <Screen contentClassName="justify-center">
      <View className="items-center">
        <View className="mb-8 h-24 w-24 items-center justify-center rounded-full bg-primary-light">
          <HeartPulse size={48} color="#2F7D6D" accessibilityLabel="Aashayein healthcare icon" />
        </View>

        <AppText variant="title" className="text-center text-3xl text-primary">
          Aashayein
        </AppText>
        <AppText variant="body" className="mt-3 max-w-[280px] text-center text-text-secondary">
          Compassionate healthcare assistance for every community
        </AppText>
      </View>

      <View className="mt-12">
        <AppButton title="Get Started" onPress={() => router.push('/onboarding')} />
      </View>
    </Screen>
  );
}
