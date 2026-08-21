import { View } from 'react-native';
import { colors } from '@/constants/colors';

interface ProgressIndicatorProps {
  total: number;
  activeIndex: number;
}

export function ProgressIndicator({ total, activeIndex }: ProgressIndicatorProps) {
  return (
    <View className="flex-row items-center justify-center gap-2" accessibilityRole="progressbar" accessibilityValue={{ min: 1, max: total, now: activeIndex + 1 }}>
      {Array.from({ length: total }).map((_, index) => (
        <View
          key={index}
          className={`h-2 rounded-full ${index === activeIndex ? 'w-7 bg-primary' : 'w-2 bg-border'}`}
          style={index === activeIndex ? { backgroundColor: colors.primary } : undefined}
        />
      ))}
    </View>
  );
}
