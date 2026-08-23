import { StatusBadge } from '@/components/asha/StatusBadge';
import { AppButton } from '@/components/ui/AppButton';
import { AppText } from '@/components/ui/AppText';
import { BaseCard } from '@/components/ui/BaseCard';
import { getPriorityChipLevel, getPriorityLabel, PriorityChip } from '@/components/ui/PriorityChip';
import { Screen } from '@/components/ui/Screen';
import { useAshaCase } from '@/hooks/useAshaQueries';
import { ageFromDob, formatDate } from '@/utils/asha';
import { router, useLocalSearchParams } from 'expo-router';
import { ArrowLeft, ChevronRight } from 'lucide-react-native';
import { ActivityIndicator, Pressable, View } from 'react-native';

export default function CaseDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const caseId = Number(id);
  const { data: item, isLoading, error } = useAshaCase(caseId);

  if (isLoading) return <Screen header={<Header title="Case Details" />}><View className="flex-1 items-center justify-center"><ActivityIndicator color="#0F766E" /><AppText variant="caption" className="mt-3">Loading case details...</AppText></View></Screen>;
  if (error) return <Screen header={<Header title="Case Details" />}><AppText variant="title">Unable to load case details.</AppText><AppText variant="caption" className="mt-1">Please check your connection and try again.</AppText></Screen>;
  if (!item || !item.patient) return <Screen header={<Header title="Case Details" />}><AppText variant="title">Case not found</AppText></Screen>;

  const patient = item.patient;
  const visits = item.visits ?? [];
  return <Screen scrollable header={<Header title="Case Details" />}><BaseCard><View className="flex-row justify-between gap-2"><View className="flex-1"><AppText variant="title" className="mt-1">{item.patientName ?? patient.name}</AppText></View><PriorityChip level={getPriorityChipLevel(item.priorityLevel, item.priorityScore)} label={getPriorityLabel(item.priorityLevel, item.priorityScore)} /></View><View className="mt-3"><StatusBadge status={item.status} /></View><AppText variant="caption" className="mt-3">Created {formatDate(item.createdAt)} - Updated {formatDate(item.updatedAt)}</AppText></BaseCard><Section title="Symptoms"><AppText variant="body">{item.symptoms}</AppText><AppText variant="caption" className="mt-2">Duration: {item.duration}</AppText></Section><Section title="Case Summary"><AppText variant="body" className="text-text-secondary">{item.summary}</AppText></Section><Pressable onPress={() => router.push({ pathname: '/(asha)/patients/[id]', params: { id: String(patient.id) } })}><BaseCard><View className="flex-row items-center justify-between"><View className="flex-1"><AppText variant="subtitle" className="text-primary">Patient Information</AppText><AppText variant="label" className="mt-1">{patient.name}</AppText><AppText variant="caption">{ageFromDob(patient.dateOfBirth)} years - {patient.gender} - {patient.village}, {patient.district}</AppText></View><ChevronRight size={20} color="#94A3B8" /></View></BaseCard></Pressable><AppText variant="title" className="mb-3 mt-2">Visit History</AppText>{visits.length ? visits.map((visit) => <Pressable key={visit.id} onPress={() => router.push({ pathname: '/(asha)/visits/[id]', params: { id: String(visit.id) } })}><BaseCard><AppText variant="label">{formatDate(visit.visitedAt)}</AppText><AppText variant="caption">{visit.condition} - {visit.temperature ? `${visit.temperature} F` : 'Temperature not recorded'}</AppText></BaseCard></Pressable>) : <BaseCard><AppText variant="caption">No visits recorded for this case.</AppText></BaseCard>}<View className="mt-2 gap-3"><AppButton title="Add Visit" onPress={() => router.push({ pathname: '/(asha)/visits/new', params: { caseId: String(item.id) } })} disabled={item.status === 'REFERRED' || item.status === 'CLOSED'} /><AppButton title="View Patient" variant="outline" onPress={() => router.push({ pathname: '/(asha)/patients/[id]', params: { id: String(patient.id) } })} /></View></Screen>;
}

function Header({ title }: { title: string }) { return <View className="flex-row items-center border-b border-border bg-surface px-4 py-4"><Pressable onPress={() => router.back()} className="mr-3 min-h-touch min-w-touch items-center justify-center"><ArrowLeft size={21} color="#0F172A" /></Pressable><AppText variant="display" className="text-xl">{title}</AppText></View>; }
function Section({ title, children }: { title: string; children: React.ReactNode }) { return <><AppText variant="title" className="mb-3 mt-2">{title}</AppText><BaseCard>{children}</BaseCard></>; }
