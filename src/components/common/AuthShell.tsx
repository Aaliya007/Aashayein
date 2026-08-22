import { BrandMark } from '@/components/common/BrandMark';
import { AnimatedCard } from '@/components/ui/AnimatedCard';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface AuthShellProps {
  contextLabel?: string;
  title: string;
  subtitle?: string;
  children: ReactNode;
  footer?: ReactNode;
}

export function AuthShell({
  contextLabel = 'Aashayein',
  title,
  subtitle,
  children,
  footer,
}: AuthShellProps) {
  const insets = useSafeAreaInsets();
  const footerBottomInset = Math.max(insets.bottom, 16);

  return (
    <View className="flex-1">
      <Animated.View
        entering={FadeInDown.duration(380).springify()}
        className="mb-7 mt-2 w-full items-center"
        style={styles.header}>
        <BrandMark size="sm" />
        <View className="mt-4 max-w-[350px]" style={styles.headerCopy}>
          <SectionHeader eyebrow={contextLabel} title={title} subtitle={subtitle} centered />
        </View>
      </Animated.View>

      <AnimatedCard delay={100} className="gap-4">{children}</AnimatedCard>

      {footer ? <View className="mt-6" style={{ paddingBottom: footerBottomInset }}>{footer}</View> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    alignSelf: 'stretch',
    alignItems: 'center',
  },
  headerCopy: {
    width: '100%',
    alignItems: 'center',
  },
});
