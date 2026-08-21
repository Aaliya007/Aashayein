import { AshaBackHeader } from '@/components/asha/AshaBackHeader';
import { SemanticStatusBadge, type SemanticStatusTone } from '@/components/asha/SemanticStatusBadge';
import { AppButton } from '@/components/ui/AppButton';
import { AppText } from '@/components/ui/AppText';
import { BaseCard } from '@/components/ui/BaseCard';
import { Screen } from '@/components/ui/Screen';
import { useAshaStore } from '@/stores/ashaStore';
import type { VaccinationStatus } from '@/types/vaccination';
import { ageFromDob, formatDate, patientName } from '@/utils/asha';
import { router, useLocalSearchParams } from 'expo-router';
import { View } from 'react-native';

const statusPresentation: Record<VaccinationStatus, { label: string; tone: SemanticStatusTone }> = { completed: { label: 'Completed', tone: 'success' }, upcoming: { label: 'Upcoming', tone: 'info' }, due: { label: 'Due', tone: 'warning' }, overdue: { label: 'Overdue', tone: 'critical' } };
export default function VaccinationDetailsScreen() { const { id } = useLocalSearchParams<{ id: string }>(); const vaccinations = useAshaStore((state) => state.vaccinations); const patients = useAshaStore((state) => state.patients); const users = useAshaStore((state) => state.patientUsers); const vaccination = vaccinations.find((item) => item.id === Number(id)); const patient = patients.find((item) => item.id === vaccination?.patientId); if (!vaccination || !patient) return <Screen header={<AshaBackHeader title="Vaccination Details" />}><AppText variant="title">Vaccination record not found</AppText></Screen>; const status = statusPresentation[vaccination.status]; return <Screen scrollable header={<AshaBackHeader title="Vaccination Details" />}><BaseCard><AppText variant="subtitle" className="text-primary">Patient</AppText><AppText variant="title" className="mt-1">{patientName(patient, users)}</AppText><AppText variant="caption">{ageFromDob(patient.dateOfBirth)} years - {patient.gender}</AppText><AppButton title="View Patient" variant="outline" className="mt-4" onPress={() => router.push({ pathname: '/(asha)/patients/[id]', params: { id: String(patient.id) } })} /></BaseCard><AppText variant="title" className="mb-3 mt-2">Vaccination Information</AppText><BaseCard><Row label="Vaccine" value={vaccination.name} /><View className="mb-3"><AppText variant="caption">Status</AppText><SemanticStatusBadge label={status.label} tone={status.tone} /></View><Row label="Due date" value={formatDate(vaccination.dueDate)} />{vaccination.completedAt ? <Row label="Completed on" value={formatDate(vaccination.completedAt)} /> : null}</BaseCard></Screen>; }
function Row({ label, value }: { label: string; value: string }) { return <View className="mb-3 last:mb-0"><AppText variant="caption">{label}</AppText><AppText variant="body" className="mt-0.5 text-text-secondary">{value}</AppText></View>; }
