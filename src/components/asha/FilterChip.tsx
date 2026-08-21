import { AppText } from '@/components/ui/AppText';
import { Pressable } from 'react-native';

export function FilterChip({ label, active, onPress }: { label: string; active: boolean; onPress: () => void }) {
  return <Pressable accessibilityRole="button" accessibilityState={{ selected: active }} onPress={onPress} className={`min-h-[36px] justify-center rounded-full border px-3 ${active ? 'border-primary bg-primary-light' : 'border-border bg-surface'}`}><AppText variant="caption" className={active ? 'text-primary' : 'text-text-secondary'}>{label}</AppText></Pressable>;
}
