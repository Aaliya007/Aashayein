import { AshaBackHeader } from '@/components/asha/AshaBackHeader';
import { DetailRow } from '@/components/asha/DetailRow';
import { SemanticStatusBadge } from '@/components/asha/SemanticStatusBadge';
import { AppButton } from '@/components/ui/AppButton';
import { AppText } from '@/components/ui/AppText';
import { BaseCard } from '@/components/ui/BaseCard';
import { Screen } from '@/components/ui/Screen';
import { useAshaStore } from '@/stores/ashaStore';
import { ageFromDob, formatDate, patientName } from '@/utils/asha';
import { referralStatusPresentation } from '@/utils/recordStatus';
import { router, useLocalSearchParams } from 'expo-router';
import { View } from 'react-native';

export default function ReferralDetailsScreen() { const { id } = useLocalSearchParams<{ id: string }>(); const referrals = useAshaStore((state) => state.referrals); const patients = useAshaStore((state) => state.patients); const users = useAshaStore((state) => state.patientUsers); const facilities = useAshaStore((state) => state.facilities); const referral = referrals.find((item) => item.id === Number(id)); const patient = patients.find((item) => item.id === referral?.patientId); const facility = facilities.find((item) => item.id === referral?.facilityId); if (!referral || !patient || !facility) return <Screen header={<AshaBackHeader title="Referral Details" />}><AppText variant="title">Referral not found</AppText></Screen>; const status = referralStatusPresentation[referral.status]; return <Screen scrollable header={<AshaBackHeader title="Referral Details" />}><BaseCard><AppText variant="subtitle" className="text-primary">Patient</AppText><AppText variant="title" className="mt-1">{patientName(patient, users)}</AppText><AppText variant="caption">{ageFromDob(patient.dateOfBirth)} years - {patient.gender}</AppText><AppButton title="View Patient" variant="outline" className="mt-4" onPress={() => router.push({ pathname: '/(asha)/patients/[id]', params: { id: String(patient.id) } })} /></BaseCard><AppText variant="title" className="mb-3 mt-2">Referral Information</AppText><BaseCard><DetailRow label="Reason" value={referral.reason} /><View className="mb-3"><AppText variant="caption">Status</AppText><SemanticStatusBadge label={status.label} tone={status.tone} /></View><DetailRow label="Referred on" value={formatDate(referral.createdAt)} /></BaseCard><AppText variant="title" className="mb-3 mt-2">Healthcare Facility</AppText><BaseCard><DetailRow label="Facility" value={facility.name} /><DetailRow label="Type" value={facility.type} /><DetailRow label="District" value={facility.district} /><DetailRow label="Address" value={facility.address} />{facility.phone ? <DetailRow label="Phone" value={facility.phone} /> : null}</BaseCard></Screen>; }
