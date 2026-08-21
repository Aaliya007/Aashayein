import { type ReactNode } from 'react';
import { View, type ViewProps } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';

interface AnimatedCardProps extends ViewProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

/** A quiet entrance wrapper used for forms and onboarding content. */
export function AnimatedCard({ children, delay = 0, className = '', ...props }: AnimatedCardProps) {
  return (
    <Animated.View entering={FadeInDown.delay(delay).duration(420).springify()}>
      <View
        className={`rounded-3xl border border-border-subtle bg-surface p-5 ${className}`}
        style={{
          shadowColor: '#0F172A',
          shadowOffset: { width: 0, height: 10 },
          shadowOpacity: 0.06,
          shadowRadius: 18,
          elevation: 3,
        }}
        {...props}>
        {children}
      </View>
    </Animated.View>
  );
}
