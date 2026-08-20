import { AppButton } from '@/components/ui/AppButton';
import { AppText } from '@/components/ui/AppText';
import { Screen } from '@/components/ui/Screen';
import { onboardingSlides } from '@/constants/appContent';
import { router } from 'expo-router';
import { Building2, HeartPulse, Languages } from 'lucide-react-native';
import { useState } from 'react';
import { Pressable, View } from 'react-native';

const iconMap = {
  HeartPulse,
  Languages,
  Building2,
};

export default function OnboardingScreen() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const slide = onboardingSlides[currentIndex];
  const Icon = iconMap[slide.icon];
  const isLastSlide = currentIndex === onboardingSlides.length - 1;

  const goToLanguage = () => router.push('/onboarding/language');

  const handleNext = () => {
    if (isLastSlide) {
      goToLanguage();
      return;
    }
    setCurrentIndex((prev) => prev + 1);
  };

  return (
    <Screen>
      <View className="flex-row justify-end pt-2">
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Skip onboarding"
          onPress={goToLanguage}
          className="min-h-[44px] justify-center px-2 active:opacity-70">
          <AppText variant="label" className="text-text-secondary">
            Skip
          </AppText>
        </Pressable>
      </View>

      <View className="flex-1 items-center justify-center">
        <View className="mb-8 h-28 w-28 items-center justify-center rounded-full bg-primary-light">
          <Icon size={52} color="#2F7D6D" accessibilityLabel={slide.title} />
        </View>

        <AppText variant="title" className="mb-3 max-w-[320px] text-center">
          {slide.title}
        </AppText>
        <AppText variant="body" className="max-w-[320px] text-center text-text-secondary">
          {slide.description}
        </AppText>

        <View className="mt-10 flex-row gap-2">
          {onboardingSlides.map((item, index) => (
            <View
              key={item.id}
              className={`h-2 rounded-full ${
                index === currentIndex ? 'w-6 bg-primary' : 'w-2 bg-border'
              }`}
            />
          ))}
        </View>
      </View>

      <View className="gap-3 pb-4">
        {!isLastSlide ? (
          <AppButton title="Next" onPress={handleNext} />
        ) : (
          <AppButton title="Get Started" onPress={handleNext} />
        )}
      </View>
    </Screen>
  );
}
