import { EmptyState } from '@/components/asha/EmptyState';
import { AppText } from '@/components/ui/AppText';
import { BaseCard } from '@/components/ui/BaseCard';
import { ActivityIndicator, View } from 'react-native';

interface RecordListStateProps {
  emptyTitle: string;
  emptyMessage: string;
  error?: string | null;
  loading?: boolean;
}

/** Consistent loading, empty, and error feedback for ASHA record lists. */
export function RecordListState({ emptyTitle, emptyMessage, error, loading = false }: RecordListStateProps) {
  if (loading) {
    return (
      <View className="items-center px-6 py-10">
        <ActivityIndicator color="#0F766E" />
        <AppText variant="caption" className="mt-3 text-center">Loading records...</AppText>
      </View>
    );
  }

  if (error) {
    return (
      <BaseCard className="items-center border-critical bg-critical-light py-8">
        <AppText variant="title" className="text-center">Unable to load records</AppText>
        <AppText variant="caption" className="mt-1 text-center">{error}</AppText>
      </BaseCard>
    );
  }

  return <EmptyState title={emptyTitle} message={emptyMessage} />;
}
