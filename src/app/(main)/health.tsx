import { AppText } from '@/components/ui/AppText';
import { Screen } from '@/components/ui/Screen';
import { mockHealthRequests } from '@/data/mock/healthRequests';
import { ClipboardList } from 'lucide-react-native';
import { View } from 'react-native';

export default function HealthScreen() {
  return (
    <Screen scrollable>
      <View className="mb-6 mt-4 flex-row items-center gap-3">
        <View className="rounded-full bg-primary-light p-3">
          <ClipboardList size={24} color="#2F7D6D" accessibilityLabel="Health records icon" />
        </View>
        <View>
          <AppText variant="title">Health</AppText>
          <AppText variant="caption">Your health requests and records</AppText>
        </View>
      </View>

      <View className="gap-3">
        {mockHealthRequests.map((request) => (
          <View key={request.id} className="rounded-2xl border border-border bg-surface p-4">
            <AppText variant="label">{request.message}</AppText>
            <View className="mt-2 flex-row items-center justify-between">
              <AppText variant="caption">Status: {request.status.replace('_', ' ')}</AppText>
              <AppText variant="caption">Lang: {request.lang.toUpperCase()}</AppText>
            </View>
          </View>
        ))}
      </View>
    </Screen>
  );
}
