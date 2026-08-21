import { colors } from '@/constants/colors';
import { HeartPulse } from 'lucide-react-native';
import Animated, { FadeIn } from 'react-native-reanimated';

interface BrandMarkProps {
  size?: 'sm' | 'md' | 'lg';
}

const sizes = {
  sm: { box: 'h-14 w-14 rounded-2xl', icon: 28 },
  md: { box: 'h-20 w-20 rounded-3xl', icon: 40 },
  lg: { box: 'h-28 w-28 rounded-[28px]', icon: 56 },
};

export function BrandMark({ size = 'md' }: BrandMarkProps) {
  const selected = sizes[size];

  return (
    <Animated.View
      entering={FadeIn.duration(300).springify()}
      className={`items-center justify-center bg-primary-light ${selected.box}`}
      style={{
        borderWidth: 1,
        borderColor: '#99F6E4',
        shadowColor: colors.primary,
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.13,
        shadowRadius: 16,
        elevation: 3,
      }}
      accessibilityRole="image"
      accessibilityLabel="Aashayein">
      <HeartPulse size={selected.icon} color={colors.primary} />
    </Animated.View>
  );
}
