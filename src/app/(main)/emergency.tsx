import { AppButton } from '@/components/ui/AppButton';
import { AppText } from '@/components/ui/AppText';
import { Screen } from '@/components/ui/Screen';
import { AlertCircle, Phone } from 'lucide-react-native';
import { View } from 'react-native';

export default function EmergencyScreen() {
  return (
    <Screen contentClassName="justify-center">
      <View className="items-center">
        <View className="mb-6 h-20 w-20 items-center justify-center rounded-full bg-red-50">
          <AlertCircle size={40} color="#D9534F" accessibilityLabel="Emergency icon" />
        </View>
        <AppText variant="title" className="text-center">
          Emergency Help
        </AppText>
        <AppText variant="body" className="mt-3 max-w-[300px] text-center text-text-secondary">
          If you are experiencing a medical emergency, contact emergency services immediately.
        </AppText>
      </View>

      <View className="mt-10 gap-3">
        <AppButton
          title="Call Emergency (108)"
          onPress={() => {}}
          variant="primary"
          accessibilityLabel="Call emergency number 108"
        />
        <View className="flex-row items-center justify-center gap-2 py-2">
          <Phone size={16} color="#6B7280" />
          <AppText variant="caption">Emergency services: 108 / 102</AppText>
        </View>
      </View>
    </Screen>
  );
}
