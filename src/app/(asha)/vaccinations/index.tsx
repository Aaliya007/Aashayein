import { AshaBackHeader } from '@/components/asha/AshaBackHeader';
import { EmptyState } from '@/components/asha/EmptyState';
import { SemanticStatusBadge, type SemanticStatusTone } from '@/components/asha/SemanticStatusBadge';
import { AppText } from '@/components/ui/AppText';
import { BaseCard } from '@/components/ui/BaseCard';
import { Screen } from '@/components/ui/Screen';
import { useAshaStore } from '@/stores/ashaStore';
import type { Vaccination, VaccinationStatus } from '@/types/vaccination';
import { formatDate, patientName } from '@/utils/asha';
import { router, useLocalSearchParams } from 'expo-router';
import { ChevronRight, Search } from 'lucide-react-native';
import { useMemo, useState } from 'react';
import { FlatList, Pressable, TextInput, View } from 'react-native';

const statusPresentation: Record<VaccinationStatus, { label: string; tone: SemanticStatusTone }> = { completed: { label: 'Completed', tone: 'success' }, upcoming: { label: 'Upcoming', tone: 'info' }, due: { label: 'Due', tone: 'warning' }, overdue: { label: 'Overdue', tone: 'critical' } };

export default function VaccinationsScreen() {
  const { patientId } = useLocalSearchParams<{ patientId?: string }>();
  const vaccinations = useAshaStore((state) => state.vaccinations);
  const patients = useAshaStore((state) => state.patients);
  const users = useAshaStore((state) => state.patientUsers);
  const [query, setQuery] = useState('');
  const records = useMemo(() => vaccinations.filter((item) => { const matchesPatient = !patientId || item.patientId === Number(patientId); return matchesPatient && `${patientName(patients.find((patient) => patient.id === item.patientId), users)} ${item.name}`.toLowerCase().includes(query.toLowerCase()); }), [patientId, patients, query, users, vaccinations]);

  return <Screen header={<AshaBackHeader title="Vaccinations" subtitle="Review vaccination tasks for your patients" />}><View className="mb-3 min-h-touch flex-row items-center rounded-xl border border-border bg-surface-subdued px-3"><Search size={18} color="#94A3B8" /><TextInput value={query} onChangeText={setQuery} placeholder="Search patient or vaccine" placeholderTextColor="#94A3B8" className="ml-2 flex-1 py-3 text-base text-text-primary" style={{ fontFamily: 'Inter_400Regular' }} /></View><FlatList className="flex-1" data={records} keyExtractor={(item) => String(item.id)} contentContainerClassName="pb-4" ListEmptyComponent={<EmptyState title="No vaccination records found." message="Try a different search term." />} renderItem={({ item }) => <VaccinationCard item={item} name={patientName(patients.find((patient) => patient.id === item.patientId), users)} />} /></Screen>;
}

function VaccinationCard({ item, name }: { item: Vaccination; name: string }) { const status = statusPresentation[item.status]; return <Pressable accessibilityRole="button" accessibilityLabel={`Open vaccination for ${name}`} onPress={() => router.push({ pathname: '/(asha)/vaccinations/[id]', params: { id: String(item.id) } })}><BaseCard><View className="flex-row justify-between gap-3"><View className="flex-1"><AppText variant="label">{name}</AppText><AppText variant="body" className="mt-1 text-text-secondary">{item.name}</AppText></View><SemanticStatusBadge label={status.label} tone={status.tone} /></View><View className="mt-3 flex-row items-center justify-between"><AppText variant="caption">{item.completedAt ? `Completed ${formatDate(item.completedAt)}` : `Due ${formatDate(item.dueDate)}`}</AppText><ChevronRight size={20} color="#94A3B8" /></View></BaseCard></Pressable>; }
