import { AppText } from '@/components/ui/AppText';
import { router } from 'expo-router';
import { ArrowLeft } from 'lucide-react-native';
import { Pressable, View } from 'react-native';

export function AshaBackHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return <View className="border-b border-border bg-surface px-4 py-4"><View className="flex-row items-center"><Pressable accessibilityRole="button" accessibilityLabel="Go back" onPress={() => router.back()} className="mr-3 min-h-touch min-w-touch items-center justify-center"><ArrowLeft size={21} color="#0F172A" /></Pressable><View className="flex-1"><AppText variant="display" className="text-xl">{title}</AppText>{subtitle ? <AppText variant="caption" className="mt-0.5">{subtitle}</AppText> : null}</View></View></View>;
}
