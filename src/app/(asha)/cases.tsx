import { EmptyState } from '@/components/asha/EmptyState';
import { FilterChip } from '@/components/asha/FilterChip';
import { StatusBadge } from '@/components/asha/StatusBadge';
import { BaseCard } from '@/components/ui/BaseCard';
import { PriorityChip, getPriorityFromScore, type PriorityLevel } from '@/components/ui/PriorityChip';
import { Screen } from '@/components/ui/Screen';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { AppText } from '@/components/ui/AppText';
import { useAshaStore } from '@/stores/ashaStore';
import { formatDate, patientName } from '@/utils/asha';
import { router } from 'expo-router';
import { ChevronRight, Search } from 'lucide-react-native';
import { useMemo, useState } from 'react';
import { FlatList, Pressable, TextInput, View } from 'react-native';

const priorities: Array<{ label: string; value: PriorityLevel | 'all' }> = [{ label: 'All', value: 'all' }, { label: 'High', value: 'high' }, { label: 'Moderate', value: 'medium' }, { label: 'Normal', value: 'low' }];
const statuses = [{ label: 'All', value: 'all' }, { label: 'Active', value: 'active' }, { label: 'Pending', value: 'pending' }, { label: 'In Progress', value: 'in_progress' }, { label: 'Referred', value: 'referred' }, { label: 'Resolved', value: 'resolved' }] as const;

export default function AshaCasesScreen() {
  const cases = useAshaStore((state) => state.cases); const patients = useAshaStore((state) => state.patients); const users = useAshaStore((state) => state.patientUsers);
  const [query, setQuery] = useState(''); const [priority, setPriority] = useState<PriorityLevel | 'all'>('all'); const [status, setStatus] = useState<(typeof statuses)[number]['value']>('all');
  const filtered = useMemo(() => cases.filter((item) => { const name = patientName(patients.find((patient) => patient.id === item.patientId), users); const text = `${name} ${item.id} ${item.symptoms}`.toLowerCase(); return (!query || text.includes(query.toLowerCase())) && (priority === 'all' || getPriorityFromScore(item.priorityScore) === priority) && (status === 'all' || item.status === status); }).sort((a, b) => b.priorityScore - a.priorityScore || new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()), [cases, patients, priority, query, status, users]);
  return <Screen header={<ScreenHeader contextLabel="ASHA Portal" title="Cases" />}><View className="mb-3"><AppText variant="body" className="text-text-secondary">Cases assigned to you</AppText></View><View className="mb-3 min-h-touch flex-row items-center rounded-xl border border-border bg-surface-subdued px-3"><Search size={18} color="#94A3B8" /><TextInput value={query} onChangeText={setQuery} placeholder="Search patient, case ID or symptom" placeholderTextColor="#94A3B8" className="ml-2 flex-1 py-3 text-base text-text-primary" style={{ fontFamily: 'Inter_400Regular' }} /></View><AppText variant="caption" className="mb-2">Priority</AppText><FlatList horizontal showsHorizontalScrollIndicator={false} contentContainerClassName="gap-2 pb-3" data={priorities} keyExtractor={(item) => item.value} renderItem={({ item }) => <FilterChip label={item.label} active={priority === item.value} onPress={() => setPriority(item.value)} />} /><AppText variant="caption" className="mb-2">Status</AppText><FlatList horizontal showsHorizontalScrollIndicator={false} contentContainerClassName="gap-2 pb-3" data={statuses} keyExtractor={(item) => item.value} renderItem={({ item }) => <FilterChip label={item.label} active={status === item.value} onPress={() => setStatus(item.value)} />} /><FlatList data={filtered} keyExtractor={(item) => String(item.id)} showsVerticalScrollIndicator={false} contentContainerClassName="pb-8" ListEmptyComponent={<EmptyState title="No cases found" message="Try changing your search or filters." />} renderItem={({ item }) => { const patient = patients.find((entry) => entry.id === item.patientId); return <Pressable onPress={() => router.push({ pathname: '/(asha)/cases/[id]', params: { id: String(item.id) } })} accessibilityRole="button" accessibilityLabel={`Open case ${item.id}`}><BaseCard><View className="flex-row justify-between gap-2"><View className="flex-1"><AppText variant="label">{patientName(patient, users)}</AppText><AppText variant="caption">Case #{item.id} Â· Updated {formatDate(item.updatedAt)}</AppText></View><ChevronRight size={20} color="#94A3B8" /></View><AppText variant="body" className="mt-2 text-text-secondary" numberOfLines={2}>{item.symptoms}</AppText><View className="mt-3 flex-row items-center justify-between"><PriorityChip level={getPriorityFromScore(item.priorityScore)} label={`${getPriorityFromScore(item.priorityScore)} Â· ${item.priorityScore}/10`} /><StatusBadge status={item.status} /></View></BaseCard></Pressable>; }} /></Screen>;
}
