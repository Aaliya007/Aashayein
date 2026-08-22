import { StatusBadge } from '@/components/asha/StatusBadge';
import { AppButton } from '@/components/ui/AppButton';
import { AppText } from '@/components/ui/AppText';
import { BaseCard } from '@/components/ui/BaseCard';
import { PriorityChip, getPriorityFromScore } from '@/components/ui/PriorityChip';
import { Screen } from '@/components/ui/Screen';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { useAshaStore } from '@/stores/ashaStore';
import { formatDate, patientName } from '@/utils/asha';
import { getFirstName, getGreeting } from '@/utils/greeting';
import { router } from 'expo-router';
import { AlertTriangle, ClipboardList, PlusCircle } from 'lucide-react-native';
import { Pressable, View } from 'react-native';

export default function AshaHomeScreen() {
  const cases = useAshaStore((state) => state.cases);
  const patients = useAshaStore((state) => state.patients);
  const users = useAshaStore((state) => state.patientUsers);
  const visits = useAshaStore((state) => state.visits);
  const attention = [...cases].filter((item) => item.status !== 'resolved').sort((a, b) => b.priorityScore - a.priorityScore).slice(0, 3);
  const activeCount = cases.filter((item) => ['active', 'in_progress'].includes(item.status)).length;
  const highCount = cases.filter((item) => item.priorityScore >= 8 && item.status !== 'resolved').length;

  return <Screen scrollable header={<ScreenHeader contextLabel="ASHA Portal" title={`${getGreeting()}, ${getFirstName('Sunita Devi')}`} />}>
    <AppText variant="body" className="mb-4 text-text-secondary">Here&apos;s what needs your attention today.</AppText>
    <View className="mb-4 flex-row flex-wrap gap-3">
      <Stat title="Active Cases" value={String(activeCount)} icon={<ClipboardList size={19} color="#0284C7" />} onPress={() => router.push('/cases')} />
      <Stat title="High Priority" value={String(highCount)} icon={<AlertTriangle size={19} color="#BE123C" />} onPress={() => router.push('/cases')} />
      <Stat title="Patients" value={String(patients.length)} icon={<PlusCircle size={19} color="#0F766E" />} onPress={() => router.push('/(asha)/patients')} />
      <Stat title="Visits Today" value={String(visits.filter((item) => formatDate(item.visitedAt) === formatDate(new Date().toISOString())).length)} icon={<PlusCircle size={19} color="#0F766E" />} onPress={() => router.push('/(asha)/visits')} />
    </View>
    <View className="mb-3 flex-row items-center justify-between"><AppText variant="title">Needs Attention</AppText><Pressable onPress={() => router.push('/cases')}><AppText variant="label" className="text-primary">View all</AppText></Pressable></View>
    {attention.map((item) => { const patient = patients.find((entry) => entry.id === item.patientId); return <Pressable key={item.id} onPress={() => router.push({ pathname: '/(asha)/cases/[id]', params: { id: String(item.id) } })}><BaseCard><View className="flex-row justify-between"><View className="flex-1"><AppText variant="label">{patientName(patient, users)}</AppText><AppText variant="caption">Case #{item.id} · {formatDate(item.updatedAt)}</AppText></View><PriorityChip level={getPriorityFromScore(item.priorityScore)} /></View><AppText variant="body" className="mt-2 text-text-secondary">{item.symptoms}</AppText><View className="mt-3"><StatusBadge status={item.status} /></View></BaseCard></Pressable>; })}
    <AppText variant="title" className="mb-3 mt-2">Quick Actions</AppText><View className="gap-3"><AppButton title="View Cases" onPress={() => router.push('/cases')} /><AppButton title="View Patients" variant="outline" onPress={() => router.push('/patients')} /><AppButton title="Vaccinations" variant="outline" onPress={() => router.push('/vaccinations')} /><AppButton title="Referrals" variant="outline" onPress={() => router.push('/referrals')} /><AppButton title="New Visit" variant="outline" onPress={() => router.push('/visits/new')} /></View>
  </Screen>;
}
function Stat({ title, value, icon, onPress }: { title: string; value: string; icon: React.ReactNode; onPress: () => void }) { return <Pressable onPress={onPress} className="min-w-[46%] flex-1"><BaseCard className="mb-0"><View className="flex-row items-center justify-between">{icon}<AppText variant="title">{value}</AppText></View><AppText variant="caption" className="mt-2">{title}</AppText></BaseCard></Pressable>; }
