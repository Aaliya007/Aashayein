import { EmptyState } from '@/components/asha/EmptyState';
import { FilterChip } from '@/components/asha/FilterChip';
import { StatusBadge } from '@/components/asha/StatusBadge';
import { AppText } from '@/components/ui/AppText';
import { BaseCard } from '@/components/ui/BaseCard';
import { getPriorityChipLevel, getPriorityLabel, PriorityChip } from '@/components/ui/PriorityChip';
import { Screen } from '@/components/ui/Screen';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { useAshaCases } from '@/hooks/useAshaQueries';
import type { CaseStatus, PriorityLevel } from '@/types/api';
import { formatDate } from '@/utils/asha';
import { router } from 'expo-router';
import { ChevronRight, Search } from 'lucide-react-native';
import { useMemo, useState } from 'react';
import { ActivityIndicator, FlatList, Pressable, TextInput, View } from 'react-native';

const priorities: { label: string; value: PriorityLevel | 'all' }[] = [
  { label: 'All', value: 'all' },
  { label: 'High', value: 'HIGH' },
  { label: 'Moderate', value: 'MEDIUM' },
  { label: 'Normal', value: 'LOW' },
];
const statuses: { label: string; value: CaseStatus | 'all' }[] = [
  { label: 'All', value: 'all' },
  { label: 'Pending', value: 'PENDING' },
  { label: 'Assigned', value: 'ASSIGNED' },
  { label: 'Visited', value: 'VISITED' },
  { label: 'Referred', value: 'REFERRED' },
  { label: 'Closed', value: 'CLOSED' },
];

export default function AshaCasesScreen() {
  const { data: cases = [], isLoading, error } = useAshaCases();
  const [query, setQuery] = useState('');
  const [priority, setPriority] = useState<PriorityLevel | 'all'>('all');
  const [status, setStatus] = useState<CaseStatus | 'all'>('all');
  const filtered = useMemo(() => cases.filter((item) => (!query || `${item.patientName ?? ''} ${item.symptoms}`.toLowerCase().includes(query.toLowerCase())) && (priority === 'all' || item.priorityLevel === priority) && (status === 'all' || item.status === status)).sort((a, b) => b.priorityScore - a.priorityScore), [cases, priority, query, status]);

  return <Screen header={<ScreenHeader contextLabel="ASHA Portal" title="Cases" />}><AppText variant="body" className="mb-3 text-text-secondary">Cases assigned to you</AppText><View className="mb-3 min-h-touch flex-row items-center rounded-xl border border-border bg-surface-subdued px-3"><Search size={18} color="#94A3B8" /><TextInput value={query} onChangeText={setQuery} placeholder="Search patient or symptom" placeholderTextColor="#94A3B8" className="ml-2 flex-1 py-3 text-base text-text-primary" style={{ fontFamily: 'Inter_400Regular' }} /></View><AppText variant="caption" className="mb-2">Priority</AppText><FlatList horizontal showsHorizontalScrollIndicator={false} contentContainerClassName="gap-2 pb-3" data={priorities} keyExtractor={(item) => item.value} renderItem={({ item }) => <FilterChip label={item.label} active={priority === item.value} onPress={() => setPriority(item.value)} />} /><AppText variant="caption" className="mb-2">Status</AppText><FlatList horizontal showsHorizontalScrollIndicator={false} contentContainerClassName="gap-2 pb-3" data={statuses} keyExtractor={(item) => item.value} renderItem={({ item }) => <FilterChip label={item.label} active={status === item.value} onPress={() => setStatus(item.value)} />} />{isLoading ? <View className="flex-1 items-center justify-center"><ActivityIndicator color="#0F766E" /><AppText variant="caption" className="mt-3">Loading cases...</AppText></View> : error ? <EmptyState title="Unable to load cases." message="Please check your connection and try again." /> : <FlatList data={filtered} keyExtractor={(item) => String(item.id)} showsVerticalScrollIndicator={false} contentContainerClassName="pb-8" ListEmptyComponent={<EmptyState title="No cases found" message="Try changing your search or filters." />} renderItem={({ item }) => <Pressable onPress={() => router.push({ pathname: '/(asha)/cases/[id]', params: { id: String(item.id) } })}><BaseCard><View className="flex-row justify-between gap-2"><View className="flex-1"><AppText variant="label">{item.patientName ?? 'Patient'}</AppText><AppText variant="caption">Updated {formatDate(item.updatedAt)}</AppText></View><ChevronRight size={20} color="#94A3B8" /></View><AppText variant="body" className="mt-2 text-text-secondary" numberOfLines={2}>{item.symptoms}</AppText><View className="mt-3 flex-row items-center justify-between"><PriorityChip level={getPriorityChipLevel(item.priorityLevel, item.priorityScore)} label={getPriorityLabel(item.priorityLevel, item.priorityScore)} /><StatusBadge status={item.status} /></View></BaseCard></Pressable>} />}</Screen>;
}
