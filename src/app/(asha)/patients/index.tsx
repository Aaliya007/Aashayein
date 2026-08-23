import { EmptyState } from '@/components/asha/EmptyState';
import { AppText } from '@/components/ui/AppText';
import { BaseCard } from '@/components/ui/BaseCard';
import { Screen } from '@/components/ui/Screen';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { useAshaWorkspace } from '@/hooks/useAshaQueries';
import { ageFromDob, formatDate } from '@/utils/asha';
import { router } from 'expo-router';
import { ChevronRight, Search } from 'lucide-react-native';
import { useMemo, useState } from 'react';
import { ActivityIndicator, FlatList, Pressable, TextInput, View } from 'react-native';

export default function PatientsScreen() {
  const { patients, cases, visits, isLoading, error } = useAshaWorkspace();
  const [query, setQuery] = useState('');
  const filtered = useMemo(() => patients.filter((patient) => `${patient.name} ${patient.mobile} ${patient.village ?? ''} ${patient.district ?? ''}`.toLowerCase().includes(query.toLowerCase())), [patients, query]);

  return <Screen header={<ScreenHeader contextLabel="ASHA Portal" title="Patients" />}><AppText variant="body" className="mb-3 text-text-secondary">Patients in your care</AppText><View className="mb-3 min-h-touch flex-row items-center rounded-xl border border-border bg-surface-subdued px-3"><Search size={18} color="#94A3B8" /><TextInput value={query} onChangeText={setQuery} placeholder="Search name, mobile or village" placeholderTextColor="#94A3B8" className="ml-2 flex-1 py-3 text-base text-text-primary" style={{ fontFamily: 'Inter_400Regular' }} /></View>{isLoading ? <View className="flex-1 items-center justify-center"><ActivityIndicator color="#0F766E" /><AppText variant="caption" className="mt-3">Loading patients...</AppText></View> : error ? <EmptyState title="Unable to load patients." message="Please check your connection and try again." /> : <FlatList className="flex-1" data={filtered} keyExtractor={(item) => String(item.id)} ListEmptyComponent={<EmptyState title="No patients found" message="Try another search term." />} renderItem={({ item }) => { const patientCases = cases.filter((entry) => entry.patientId === item.id); const active = patientCases.some((entry) => entry.status !== 'CLOSED'); const last = visits.filter((entry) => patientCases.some((caseItem) => caseItem.id === entry.caseId)).sort((a, b) => b.visitedAt.localeCompare(a.visitedAt))[0]; return <Pressable onPress={() => router.push({ pathname: '/(asha)/patients/[id]', params: { id: String(item.id) } })}><BaseCard><View className="flex-row items-start justify-between"><View className="flex-1"><AppText variant="label">{item.name}</AppText><AppText variant="caption">{ageFromDob(item.dateOfBirth)} years - {item.gender}</AppText><AppText variant="caption">{item.village}, {item.district}</AppText></View><ChevronRight size={20} color="#94A3B8" /></View><AppText variant="caption" className={`mt-3 ${active ? 'text-critical' : ''}`}>{active ? 'Active case needs attention' : `Last visit: ${last ? formatDate(last.visitedAt) : 'No visits yet'}`}</AppText></BaseCard></Pressable>; }} />}</Screen>;
}
