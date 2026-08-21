import type { Patient } from '@/types/patient';

export function formatDate(value: string) { return new Intl.DateTimeFormat('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }).format(new Date(value)); }
export function ageFromDob(dateOfBirth: string) { const diff = Date.now() - new Date(dateOfBirth).getTime(); return Math.max(0, Math.floor(diff / 31_557_600_000)); }
export function patientName(patient: Patient | undefined, users: { id: number; name: string }[]) { return users.find((user) => user.id === patient?.userId)?.name ?? 'Unknown patient'; }
