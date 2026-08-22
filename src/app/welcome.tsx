import { GuestGuard } from '@/components/common/GuestGuard';
import { AppButton } from '@/components/ui/AppButton';
import { AppText } from '@/components/ui/AppText';
import { ProgressIndicator } from '@/components/ui/ProgressIndicator';
import { Screen } from '@/components/ui/Screen';
import { ScreenBackground } from '@/components/ui/ScreenBackground';
import { useCopy } from '@/hooks/useCopy';
import { router } from 'expo-router';
import { HeartHandshake, Languages, Mic, type LucideIcon } from 'lucide-react-native';
import { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import Animated, { FadeInRight } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface OnboardingSlide {
  title: string;
  body: string;
  icon: LucideIcon;
  accent: 'teal' | 'blue' | 'warm';
}

export default function WelcomeScreen() {
  const { t } = useCopy();
  const insets = useSafeAreaInsets();
  const actionBottomInset = Math.max(insets.bottom, 16);
  const [activeSlide, setActiveSlide] = useState(0);
  const slides: OnboardingSlide[] = [
    { title: t('welcomeTitle'), body: t('welcomeBody'), icon: HeartHandshake, accent: 'teal' },
    { title: 'A caring connection, close to home', body: 'Stay connected with trusted ASHA workers for everyday guidance and follow-up.', icon: Languages, accent: 'blue' },
    { title: 'Support in the language you know', body: 'Simple, voice-friendly health support helps every family take the next step with confidence.', icon: Mic, accent: 'warm' },
  ];
  const slide = slides[activeSlide];
  const Icon = slide.icon;
  const isLast = activeSlide === slides.length - 1;

  const advance = () => {
    if (isLast) {
      router.push('/language');
      return;
    }
    setActiveSlide((current) => current + 1);
  };

  const accentClasses = {
    teal: { visual: 'bg-primary-light', circle: 'bg-primary', badge: 'bg-white/85', icon: '#0F766E' },
    blue: { visual: 'bg-secondary-light', circle: 'bg-secondary', badge: 'bg-white/85', icon: '#0284C7' },
    warm: { visual: 'bg-[#FFF3E3]', circle: 'bg-warning', badge: 'bg-white/85', icon: '#D97706' },
  } as const;
  const accent = accentClasses[slide.accent];

  return (
    <GuestGuard>
      <ScreenBackground>
        <Screen className="bg-transparent" contentClassName="py-2">
          <View className="flex-1 justify-between pt-6">
            <View className="flex-row items-center justify-between px-1">
              <AppText variant="title" className="text-primary">{t('brand')}</AppText>
              <Pressable accessibilityRole="button" accessibilityLabel="Skip onboarding" onPress={() => router.push('/language')} hitSlop={10}>
                <AppText variant="label" className="text-text-secondary">Skip</AppText>
              </Pressable>
            </View>

            <Animated.View
              key={activeSlide}
              entering={FadeInRight.duration(360)}
              className="w-full items-center"
              style={styles.slideContent}>
              <View className={`h-72 w-full max-w-[360px] items-center justify-center overflow-hidden rounded-[48px] ${accent.visual}`}>
                <View className="absolute -left-10 -top-12 h-40 w-40 rounded-full bg-white opacity-55" />
                <View className={`absolute -bottom-9 -right-4 h-40 w-40 rounded-full ${accent.circle} opacity-15`} />
                <View className={`h-28 w-28 items-center justify-center rounded-[38px] ${accent.circle}`} style={{ shadowColor: accent.icon, shadowOffset: { width: 0, height: 12 }, shadowOpacity: 0.2, shadowRadius: 16, elevation: 4 }}>
                  <Icon size={52} color="#FFFFFF" strokeWidth={1.8} />
                </View>
                <View className={`absolute bottom-6 left-7 flex-row items-center gap-2 rounded-full px-3 py-2 ${accent.badge}`}>
                  <View className={`h-2 w-2 rounded-full ${accent.circle}`} />
                  <AppText variant="caption" className="text-text-secondary">Care made simpler</AppText>
                </View>
              </View>
              <View className="mt-9 max-w-[350px] items-center" style={styles.slideCopy}>
                <AppText variant="display" className="text-center text-[28px] leading-9">{slide.title}</AppText>
                <AppText variant="body" className="mt-4 text-center leading-6 text-text-secondary">{slide.body}</AppText>
              </View>
            </Animated.View>

            <View className="gap-6" style={{ paddingBottom: actionBottomInset }}>
              <ProgressIndicator total={slides.length} activeIndex={activeSlide} />
              <AppButton title={isLast ? t('getStarted') : 'Next'} onPress={advance} />
              {activeSlide === 0 ? (
                <Pressable accessibilityRole="button" onPress={() => router.push('/auth/login')} className="items-center py-1">
                  <AppText variant="label" className="text-primary">{t('haveAccount')}</AppText>
                </Pressable>
              ) : <View className="h-6" />}
            </View>
          </View>
        </Screen>
      </ScreenBackground>
    </GuestGuard>
  );
}

const styles = StyleSheet.create({
  slideContent: {
    alignSelf: 'stretch',
    alignItems: 'center',
  },
  slideCopy: {
    width: '100%',
    alignItems: 'center',
  },
});
