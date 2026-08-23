import { StatusBadge } from '@/components/asha/StatusBadge';
import { AppButton } from '@/components/ui/AppButton';
import { AppText } from '@/components/ui/AppText';
import { BaseCard } from '@/components/ui/BaseCard';
import { getPriorityChipLevel, PriorityChip } from '@/components/ui/PriorityChip';
import { Screen } from '@/components/ui/Screen';
import { usePatientHistory } from '@/hooks/useAshaQueries';
import { ageFromDob, formatDate } from '@/utils/asha';
import { router, useLocalSearchParams } from 'expo-router';
import { ArrowLeft, ChevronRight, MapPin, Phone } from 'lucide-react-native';
import { ActivityIndicator, Pressable, View } from 'react-native';

export default function PatientDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const patientId = Number(id);
  const { data: history, isLoading, error } = usePatientHistory(patientId);

  if (isLoading) return <Screen header={<Header title="Patient Details" />}><View className="flex-1 items-center justify-center"><ActivityIndicator color="#0F766E" /><AppText variant="caption" className="mt-3">Loading patient details...</AppText></View></Screen>;
  if (error) return <Screen header={<Header title="Patient Details" />}><AppText variant="title">Unable to load patient details.</AppText><AppText variant="caption" className="mt-1">Please check your connection and try again.</AppText></Screen>;
  if (!history) return <Screen header={<Header title="Patient Details" />}><AppText variant="title">Patient not found</AppText></Screen>;

  const { patient, cases, visits } = history;
  return <Screen scrollable header={<Header title="Patient Details" />}><BaseCard><AppText variant="title">{patient.name}</AppText><AppText variant="body" className="mt-1 text-text-secondary">{ageFromDob(patient.dateOfBirth)} years - {patient.gender}</AppText><View className="mt-4 gap-2"><View className="flex-row items-center gap-2"><Phone size={14} color="#0F766E" /><AppText variant="caption">{patient.mobile}</AppText></View><AppText variant="caption">{patient.address}</AppText>{patient.emergencyContact ? <AppText variant="caption">Emergency contact: {patient.emergencyContact}</AppText> : null}</View></BaseCard><BaseCard><View className="flex-row items-center gap-2"><MapPin size={18} color="#0284C7" /><View className="flex-1"><AppText variant="label">Location</AppText><AppText variant="caption">{patient.village}, {patient.district} - {patient.latitude ? 'Location available' : 'Location unavailable'}</AppText></View></View></BaseCard><View className="mb-3 gap-3"><AppButton title="View Vaccinations" variant="outline" onPress={() => router.push({ pathname: '/vaccinations', params: { patientId: String(patient.id) } })} /><AppButton title="View Referrals" variant="outline" onPress={() => router.push({ pathname: '/referrals', params: { patientId: String(patient.id) } })} /></View><AppText variant="title" className="mb-3 mt-2">Active Cases</AppText>{cases.length ? cases.map((item) => <Pressable key={item.id} onPress={() => router.push({ pathname: '/(asha)/cases/[id]', params: { id: String(item.id) } })}><BaseCard><View className="flex-row justify-between"><View className="flex-1"><AppText variant="label">{item.symptoms}</AppText><AppText variant="caption">{item.summary}</AppText></View><ChevronRight size={20} color="#94A3B8" /></View><View className="mt-3 flex-row justify-between"><PriorityChip level={getPriorityChipLevel(item.priorityLevel, item.priorityScore)} /><StatusBadge status={item.status} /></View></BaseCard></Pressable>) : <BaseCard><AppText variant="caption">No cases recorded for this patient.</AppText></BaseCard>}<AppText variant="title" className="mb-3 mt-2">Visit History</AppText>{visits.length ? visits.map((visit) => <Pressable key={visit.id} onPress={() => router.push({ pathname: '/(asha)/visits/[id]', params: { id: String(visit.id) } })}><BaseCard><AppText variant="label">{formatDate(visit.visitedAt)}</AppText><AppText variant="caption">{visit.condition}</AppText></BaseCard></Pressable>) : <BaseCard><AppText variant="caption">No visits recorded for this patient.</AppText></BaseCard>}</Screen>;
}

function Header({ title }: { title: string }) { return <View className="flex-row items-center border-b border-border bg-surface px-4 py-4"><Pressable onPress={() => router.back()} className="mr-3 min-h-touch min-w-touch items-center justify-center"><ArrowLeft size={21} color="#0F172A" /></Pressable><AppText variant="display" className="text-xl">{title}</AppText></View>; }
