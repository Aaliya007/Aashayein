import { AppButton } from '@/components/ui/AppButton';
import { AppInput } from '@/components/ui/AppInput';
import { AppText } from '@/components/ui/AppText';
import { BaseCard } from '@/components/ui/BaseCard';
import { Screen } from '@/components/ui/Screen';
import { useAshaStore } from '@/stores/ashaStore';
import { patientName } from '@/utils/asha';
import { router, useLocalSearchParams } from 'expo-router';
import { ArrowLeft } from 'lucide-react-native';
import { useState } from 'react';
import { Pressable, TextInput, View, type KeyboardTypeOptions } from 'react-native';

type VisitMode = 'existing' | 'new';

export default function NewVisitScreen() {
  const params = useLocalSearchParams<{ caseId?: string }>();
  const cases = useAshaStore((state) => state.cases);
  const patients = useAshaStore((state) => state.patients);
  const users = useAshaStore((state) => state.patientUsers);
  const addVisit = useAshaStore((state) => state.addVisit);
  const addPatientVisit = useAshaStore((state) => state.addPatientVisit);
  const [mode, setMode] = useState<VisitMode>('existing');
  const [caseId, setCaseId] = useState(Number(params.caseId) || cases.find((item) => item.status !== 'resolved')?.id || 0);
  const [temperature, setTemperature] = useState('');
  const [condition, setCondition] = useState('');
  const [symptoms, setSymptoms] = useState('');
  const [notes, setNotes] = useState('');
  const [name, setName] = useState(''); const [mobile, setMobile] = useState(''); const [email, setEmail] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState(''); const [gender, setGender] = useState(''); const [address, setAddress] = useState('');
  const [village, setVillage] = useState(''); const [district, setDistrict] = useState(''); const [emergencyContact, setEmergencyContact] = useState('');
  const [error, setError] = useState('');
  const selected = cases.find((item) => item.id === caseId);
  const patient = patients.find((item) => item.id === selected?.patientId);
  const visitInput = { temperature: temperature ? Number(temperature) : undefined, condition, symptoms, notes };

  const submit = () => {
    if (!condition.trim()) return setError("Please enter the patient's current condition.");
    if (!symptoms.trim()) return setError('Please record the observed symptoms.');
    if (mode === 'existing') {
      if (!selected) return setError('Please select an existing patient case.');
      const created = addVisit({ caseId: selected.id, ...visitInput });
      return router.replace({ pathname: '/visits/[id]', params: { id: String(created.id) } });
    }
    if (!name.trim() || !mobile.trim() || !email.trim() || !dateOfBirth.trim() || !gender.trim() || !address.trim() || !village.trim() || !district.trim()) return setError('Please complete all new patient details.');
    const created = addPatientVisit({ patient: { dateOfBirth, gender, address, emergencyContact: emergencyContact.trim() || undefined }, user: { name, mobile, email, village, district }, visit: visitInput });
    router.replace({ pathname: '/visits/[id]', params: { id: String(created.visit.id) } });
  };

  return <Screen scrollable header={<Header title="New Visit" />}><AppText variant="body" className="mb-3 text-text-secondary">Record a visit for an existing patient or register a new patient first.</AppText><View className="mb-4 flex-row gap-2"><ModeButton label="Existing Patient" active={mode === 'existing'} onPress={() => { setMode('existing'); setError(''); }} /><ModeButton label="New Patient" active={mode === 'new'} onPress={() => { setMode('new'); setError(''); }} /></View>{mode === 'existing' ? <><AppText variant="label" className="mb-2">Select Patient Case</AppText><View className="gap-2">{cases.filter((item) => item.status !== 'resolved').map((item) => <Pressable key={item.id} onPress={() => setCaseId(item.id)} className={`rounded-xl border p-3 ${caseId === item.id ? 'border-primary bg-primary-light' : 'border-border bg-surface'}`}><AppText variant="label">Case #{item.id} - {patientName(patients.find((entry) => entry.id === item.patientId), users)}</AppText><AppText variant="caption">{item.symptoms}</AppText></Pressable>)}</View>{selected && patient ? <BaseCard className="mt-4"><AppText variant="subtitle" className="text-primary">Patient Context</AppText><AppText variant="label" className="mt-1">{patientName(patient, users)} - Case #{selected.id}</AppText><AppText variant="caption">Priority {selected.priorityScore}/10 - {selected.symptoms}</AppText></BaseCard> : null}</> : <NewPatientFields values={{ name, mobile, email, dateOfBirth, gender, address, village, district, emergencyContact }} setters={{ setName, setMobile, setEmail, setDateOfBirth, setGender, setAddress, setVillage, setDistrict, setEmergencyContact }} />}<AppText variant="title" className="mb-3 mt-5">Visit Details</AppText><Field label="Temperature (F)" value={temperature} onChange={setTemperature} keyboard="decimal-pad" /><Field label="Current Condition *" value={condition} onChange={setCondition} /><Field label="Symptoms Observed *" value={symptoms} onChange={setSymptoms} multiline /><Field label="Notes" value={notes} onChange={setNotes} multiline />{error ? <View className="mt-4 rounded-xl bg-critical-light px-3 py-2"><AppText variant="caption" className="text-critical">{error}</AppText></View> : null}<AppButton title={mode === 'new' ? 'Register Patient and Submit Visit' : 'Submit Visit Report'} onPress={submit} className="mt-4" /></Screen>;
}

function NewPatientFields({ values, setters }: { values: Record<string, string>; setters: Record<string, (value: string) => void> }) { return <View className="gap-4"><AppText variant="label">New Patient Details</AppText><AppInput label="Full Name" placeholder="Enter full name" value={values.name} onChangeText={setters.setName} autoCapitalize="words" autoComplete="name" /><AppInput label="Mobile Number" placeholder="Enter mobile number" value={values.mobile} onChangeText={setters.setMobile} keyboardType="phone-pad" autoComplete="tel" /><AppInput label="Email" placeholder="Enter email address" value={values.email} onChangeText={setters.setEmail} keyboardType="email-address" autoComplete="email" /><AppInput label="Date of Birth" placeholder="YYYY-MM-DD" value={values.dateOfBirth} onChangeText={setters.setDateOfBirth} /><AppInput label="Gender" placeholder="Enter gender" value={values.gender} onChangeText={setters.setGender} autoCapitalize="words" /><AppInput label="Address" placeholder="Enter home address" value={values.address} onChangeText={setters.setAddress} autoCapitalize="sentences" /><AppInput label="Village" placeholder="Enter village" value={values.village} onChangeText={setters.setVillage} autoCapitalize="words" /><AppInput label="District" placeholder="Enter district" value={values.district} onChangeText={setters.setDistrict} autoCapitalize="words" /><AppInput label="Emergency Contact" placeholder="Optional contact number" value={values.emergencyContact} onChangeText={setters.setEmergencyContact} keyboardType="phone-pad" autoComplete="tel" /></View>; }
function ModeButton({ label, active, onPress }: { label: string; active: boolean; onPress: () => void }) { return <Pressable accessibilityRole="tab" accessibilityState={{ selected: active }} onPress={onPress} className={`min-h-touch flex-1 items-center justify-center rounded-xl border px-2 ${active ? 'border-primary bg-primary-light' : 'border-border bg-surface'}`}><AppText variant="caption" className={active ? 'text-primary' : 'text-text-secondary'}>{label}</AppText></Pressable>; }
function Header({ title }: { title: string }) { return <View className="flex-row items-center border-b border-border bg-surface px-4 py-4"><Pressable accessibilityRole="button" accessibilityLabel="Go back" onPress={() => router.back()} className="mr-3 min-h-touch min-w-touch items-center justify-center"><ArrowLeft size={21} color="#0F172A" /></Pressable><AppText variant="display" className="text-xl">{title}</AppText></View>; }
function Field({ label, value, onChange, multiline = false, keyboard = 'default' }: { label: string; value: string; onChange: (value: string) => void; multiline?: boolean; keyboard?: KeyboardTypeOptions }) { return <View className="mt-4"><AppText variant="label" className="mb-2">{label}</AppText><TextInput value={value} onChangeText={onChange} keyboardType={keyboard} multiline={multiline} placeholder={`Enter ${label.replace(' *', '').toLowerCase()}`} placeholderTextColor="#94A3B8" className={`rounded-xl border border-border bg-surface-subdued px-3 py-3 text-base text-text-primary ${multiline ? 'min-h-[96px] align-top' : 'min-h-touch'}`} style={{ fontFamily: 'Inter_400Regular' }} /></View>; }
