import { EmptyState } from '@/components/asha/EmptyState';
import { AppButton } from '@/components/ui/AppButton';
import { AppText } from '@/components/ui/AppText';
import { BaseCard } from '@/components/ui/BaseCard';
import { Screen } from '@/components/ui/Screen';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { useAshaStore } from '@/stores/ashaStore';
import { formatDate, patientName } from '@/utils/asha';
import { router } from 'expo-router';
import { ChevronRight } from 'lucide-react-native';
import { useMemo, useState } from 'react';
import { FlatList, Pressable, View } from 'react-native';

const filters = ['Today', 'Recent', 'All'] as const;

export default function VisitsScreen() {
  const visits = useAshaStore((state) => state.visits);
  const cases = useAshaStore((state) => state.cases);
  const patients = useAshaStore((state) => state.patients);
  const users = useAshaStore((state) => state.patientUsers);
  const facilities = useAshaStore((state) => state.facilities);
  const [filter, setFilter] = useState<(typeof filters)[number]>('Recent');
  const visible = useMemo(
    () => visits.filter((visit) => filter !== 'Today' || formatDate(visit.visitedAt) === formatDate(new Date().toISOString())).sort((a, b) => b.visitedAt.localeCompare(a.visitedAt)),
    [filter, visits],
  );

  return (
    <Screen header={<ScreenHeader contextLabel="ASHA Portal" title="Visits" />}>
      <View className="mb-3"><AppButton title="New Visit" onPress={() => router.push('/(asha)/visits/new')} /></View>
      <View className="mb-3 flex-row gap-2">
        {filters.map((item) => <Pressable key={item} onPress={() => setFilter(item)} accessibilityRole="tab" accessibilityState={{ selected: filter === item }} className={`min-h-touch flex-1 items-center justify-center rounded-xl border px-2 ${filter === item ? 'border-primary bg-primary-light' : 'border-border bg-surface'}`}><AppText variant="caption" className={filter === item ? 'text-primary' : 'text-text-secondary'}>{item}</AppText></Pressable>)}
      </View>
      <FlatList className="flex-1" data={visible} keyExtractor={(item) => String(item.id)} contentContainerClassName="pb-4" ListEmptyComponent={<EmptyState title="No visits match your filters" message="Try a different time period." />} renderItem={({ item }) => {
        const caseItem = cases.find((entry) => entry.id === item.caseId);
        const patient = patients.find((entry) => entry.id === caseItem?.patientId);
        const facility = item.facilityId ? facilities.find((entry) => entry.id === item.facilityId)?.name : undefined;
        return <Pressable onPress={() => router.push({ pathname: '/(asha)/visits/[id]', params: { id: String(item.id) } })}><BaseCard><View className="flex-row justify-between"><View className="flex-1"><AppText variant="label">{patientName(patient, users)}</AppText><AppText variant="caption">Case #{item.caseId} · {formatDate(item.visitedAt)}</AppText><AppText variant="caption">{item.condition}{item.temperature ? ` · ${item.temperature}°F` : ''}</AppText></View><ChevronRight size={20} color="#94A3B8" /></View>{item.notes ? <AppText variant="caption" className="mt-2">{item.notes}{facility ? ` · ${facility}` : ''}</AppText> : null}</BaseCard></Pressable>;
      }} />
    </Screen>
  );
}
