import { AppText } from '@/components/ui/AppText';
import { getFirstName, getGreeting } from '@/utils/greeting';
import { View } from 'react-native';

interface HomeHeaderProps {
  patientName: string;
}

export function HomeHeader({ patientName }: HomeHeaderProps) {
  const greeting = getGreeting();
  const firstName = getFirstName(patientName);

  return (
    <View className="mb-6 mt-2">
      <AppText variant="title">
        {greeting} 👋
      </AppText>
      <AppText variant="subtitle" className="mt-1 font-normal text-text-secondary">
        {firstName}, how are you feeling today?
      </AppText>
    </View>
  );
}
