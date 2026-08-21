import { BrandMark } from '@/components/common/BrandMark';
import { AppText } from '@/components/ui/AppText';
import { colors } from '@/constants/colors';
import { useCopy } from '@/hooks/useCopy';
import { useAuthStore } from '@/stores/authStore';
import { getHomeRouteForRole } from '@/utils/routing';
import { router } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useRef } from 'react';
import { HeartHandshake, Stethoscope } from 'lucide-react-native';
import Animated, { FadeIn, FadeInDown, useAnimatedStyle, useSharedValue, withRepeat, withTiming } from 'react-native-reanimated';
import { View } from 'react-native';

SplashScreen.preventAutoHideAsync().catch(() => undefined);

export default function SplashScreenRoute() {
  const { t } = useCopy();
  const isHydrated = useAuthStore((s) => s.isHydrated);
  const user = useAuthStore((s) => s.user);
  const hasNavigated = useRef(false);
  const breathe = useSharedValue(1);

  useEffect(() => {
    breathe.value = withRepeat(withTiming(1.06, { duration: 1500 }), -1, true);
  }, [breathe]);

  const motifStyle = useAnimatedStyle(() => ({ transform: [{ scale: breathe.value }] }));

  useEffect(() => {
    if (!isHydrated || hasNavigated.current) return;

    const timer = setTimeout(async () => {
      hasNavigated.current = true;
      await SplashScreen.hideAsync().catch(() => undefined);

      if (user) {
        router.replace(getHomeRouteForRole(user.role));
      } else {
        router.replace('/welcome');
      }
    }, 1600);

    return () => clearTimeout(timer);
  }, [isHydrated, user]);

  return (
    <View className="flex-1 items-center justify-center overflow-hidden bg-[#F8FCFA] px-6">
      <View className="absolute -left-24 -top-16 h-72 w-72 rounded-full bg-primary-light opacity-70" />
      <View className="absolute -right-28 bottom-10 h-64 w-64 rounded-full bg-secondary-light opacity-60" />
      <Animated.View entering={FadeIn.duration(450)} style={motifStyle} className="absolute top-[20%] right-[18%] rounded-full bg-[#FFF3E3] p-3">
        <Stethoscope size={19} color={colors.warning} />
      </Animated.View>
      <Animated.View entering={FadeInDown.duration(520).springify()} className="items-center">
        <View className="rounded-full border border-white bg-white/80 p-4" style={{ shadowColor: colors.primary, shadowOpacity: 0.1, shadowRadius: 24, shadowOffset: { width: 0, height: 12 }, elevation: 4 }}>
          <BrandMark size="lg" />
        </View>
        <AppText variant="display" className="mt-7 text-3xl tracking-tight text-primary">
          {t('brand')}
        </AppText>
        <View className="mt-4 flex-row items-center gap-2 rounded-full bg-white/80 px-4 py-2">
          <HeartHandshake size={17} color={colors.primary} />
          <AppText variant="caption" className="text-text-secondary">{t('splashSubtitle')}</AppText>
        </View>
      </Animated.View>
      <View className="absolute bottom-16 h-1.5 w-24 overflow-hidden rounded-full bg-primary-light">
        <Animated.View entering={FadeIn.delay(250).duration(600)} className="h-full w-2/3 rounded-full" style={{ backgroundColor: colors.primary }} />
      </View>
    </View>
  );
}
