import { AppText } from '@/components/ui/AppText';
import { Inbox } from 'lucide-react-native';
import { View } from 'react-native';

export function EmptyState({ title, message }: { title: string; message: string }) {
  return <View className="items-center rounded-2xl border border-border bg-surface px-6 py-10"><Inbox size={30} color="#94A3B8" /><AppText variant="title" className="mt-3 text-center">{title}</AppText><AppText variant="caption" className="mt-1 text-center">{message}</AppText></View>;
}
