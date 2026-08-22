import type { Patient } from '@/types/patient';

export function formatDate(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }).format(date);
}

export function ageFromDob(dateOfBirth: string) {
  const diff = Date.now() - new Date(dateOfBirth).getTime();
  if (Number.isNaN(diff)) return 0;
  return Math.max(0, Math.floor(diff / 31_557_600_000));
}

export function patientName(patient: Patient | undefined, users?: { id: number; name: string }[]) {
  if (patient?.name) return patient.name;
  if (patient && users) {
    return users.find((user) => user.id === patient.userId)?.name ?? 'Unknown patient';
  }
  return 'Unknown patient';
}

export function formatGender(value: string) {
  if (!value) return '';
  return value.charAt(0) + value.slice(1).toLowerCase();
}
