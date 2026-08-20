export type AppLanguage = 'en' | 'hi' | 'pa';

export interface LanguageOption {
  code: AppLanguage;
  label: string;
  nativeLabel: string;
}

export const languageOptions: LanguageOption[] = [
  { code: 'en', label: 'English', nativeLabel: 'English' },
  { code: 'hi', label: 'Hindi', nativeLabel: 'हिन्दी' },
  { code: 'pa', label: 'Punjabi', nativeLabel: 'ਪੰਜਾਬੀ' },
];

export const onboardingSlides = [
  {
    id: '1',
    title: 'Accessible Healthcare Assistance',
    description:
      'Get reliable health guidance and support whenever you need it, right from your phone.',
    icon: 'HeartPulse' as const,
  },
  {
    id: '2',
    title: 'Support in Regional Languages',
    description:
      'Communicate comfortably in English, Hindi, or Punjabi for clearer understanding.',
    icon: 'Languages' as const,
  },
  {
    id: '3',
    title: 'Connect to Care Resources',
    description:
      'Find nearby healthcare facilities and get help connecting with the right care.',
    icon: 'Building2' as const,
  },
];
