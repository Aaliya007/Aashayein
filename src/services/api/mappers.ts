import type {
    ApiAsha,
    ApiCase,
    ApiFacility,
    ApiHealthRequest,
    ApiLoginResponse,
    ApiPatient,
    ApiPatientHistory,
    ApiReferral,
    ApiRegisterResponse,
    ApiVisit,
    BackendUserRole,
    CaseStatus,
    ReferralStatus,
    VisitCondition
} from '@/types/api';
import type { Case } from '@/types/case';
import type { HealthcareFacility } from '@/types/facility';
import type { HealthRequest } from '@/types/healthRequest';
import type { Patient } from '@/types/patient';
import type { Referral } from '@/types/referral';
import type { User, UserRole } from '@/types/user';
import type { Visit } from '@/types/visit';

export function mapBackendRole(role: BackendUserRole): UserRole {
  if (role === 'ASHA') return 'asha';
  if (role === 'AUTHORITY') return 'admin';
  return 'patient';
}

export function formatSymptoms(value: string | string[] | undefined | null): string {
  if (!value) return '';
  return Array.isArray(value) ? value.join(', ') : value;
}

export function mapPatient(patient: ApiPatient): Patient {
  return {
    id: patient.id,
    userId: patient.user.id,
    name: patient.user.name,
    mobile: patient.user.mobile,
    email: patient.user.email ?? '',
    village: patient.user.village,
    district: patient.user.district,
    dateOfBirth: patient.dateOfBirth,
    gender: patient.gender,
    address: patient.address,
    latitude: patient.latitude ?? undefined,
    longitude: patient.longitude ?? undefined,
    emergencyContact: patient.emergencyContact,
    createdAt: patient.createdAt,
  };
}

export function mapFacility(facility: ApiFacility): HealthcareFacility {
  return {
    id: facility.id,
    name: facility.name,
    type: facility.type,
    address: facility.address,
    district: facility.district,
    latitude: facility.latitude ?? undefined,
    longitude: facility.longitude ?? undefined,
    phone: facility.phone,
    isActive: facility.isActive,
  };
}

export function mapVisit(visit: ApiVisit): Visit {
  return {
    id: visit.id,
    caseId: visit.caseId,
    ashaId: visit.ashaId ?? 0,
    facilityId: visit.facilityId ?? undefined,
    temperature: visit.temperature ?? undefined,
    condition: (visit.condition as VisitCondition) ?? visit.condition,
    symptoms: visit.symptomsObserved ?? visit.symptoms ?? '',
    notes: visit.notes ?? undefined,
    visitedAt: visit.visitedAt ?? visit.createdAt ?? new Date().toISOString(),
  };
}

export function mapReferral(referral: ApiReferral, fallbackCase?: ApiCase): Referral {
  const patient = referral.patient ?? fallbackCase?.patient;
  const facility = referral.facility;

  return {
    id: referral.id,
    caseId: referral.caseId,
    patientId: referral.patientId ?? patient?.id ?? 0,
    facilityId: referral.facilityId ?? facility?.id ?? 0,
    ashaId: referral.createdBy?.id ?? fallbackCase?.assignedAsha?.id ?? 0,
    reason: referral.reason,
    status: referral.status as ReferralStatus,
    createdAt: referral.createdAt,
    updatedAt: referral.updatedAt,
    patientName: patient?.user.name,
    facilityName: facility?.name,
    facility,
  };
}

export function mapCase(item: ApiCase): Case {
  return {
    id: item.id,
    healthRequestId: item.healthRequest?.id ?? 0,
    patientId: item.patient.id,
    ashaId: item.assignedAsha?.id,
    symptoms: formatSymptoms(item.symptoms),
    duration: item.duration,
    summary: item.summary,
    priorityScore: item.priorityScore,
    priorityLevel: item.priorityLevel,
    status: item.status as CaseStatus,
    createdAt: item.createdAt,
    updatedAt: item.updatedAt,
    evaluation: item.evaluation,
    redFlags: item.redFlags ?? [],
    confidence: item.confidence,
    patientName: item.patient.user.name,
    patient: mapPatient(item.patient),
    visits: (item.visits ?? []).map(mapVisit),
    referrals: (item.referrals ?? []).map((referral) => mapReferral(referral, item)),
  };
}

export function mapHealthRequest(request: ApiHealthRequest): HealthRequest {
  return {
    id: request.id,
    patientId: request.patientId,
    message: request.message,
    lang: request.language,
    status: request.status,
    createdAt: request.createdAt,
    caseId: request.caseId,
    symptoms: formatSymptoms(request.symptoms),
    duration: request.duration,
    summary: request.summary,
    priorityLevel: request.priorityLevel,
    priorityScore: request.priorityScore,
    evaluation: request.evaluation,
    redFlags: request.redFlags,
    confidence: request.confidence,
  };
}

export function mapAshaToUser(asha: ApiAsha): User {
  return {
    id: asha.id,
    name: asha.name,
    mobile: asha.mobile,
    email: asha.email ?? '',
    role: 'asha',
    village: asha.village,
    district: asha.district,
    ashaId: asha.id,
    createdAt: new Date().toISOString(),
  };
}

export function mapLoginToUser(result: ApiLoginResponse, extras?: Partial<User>): User {
  const role = mapBackendRole(result.role);
  return {
    id: result.id,
    name: result.name,
    mobile: extras?.mobile ?? '',
    email: extras?.email ?? '',
    role,
    village: extras?.village,
    district: extras?.district,
    ashaId: role === 'asha' ? result.id : extras?.ashaId,
    patientId: result.patientId ?? extras?.patientId,
    createdAt: extras?.createdAt ?? new Date().toISOString(),
  };
}

export function mapRegisterToUser(
  result: ApiRegisterResponse,
  fallback: { mobile: string; role: UserRole; village?: string; district?: string },
): User {
  const id = result.userId ?? result.id ?? 0;
  const role = fallback.role;
  return {
    id,
    name: result.name,
    mobile: result.mobile ?? fallback.mobile,
    email: '',
    role,
    village: result.village ?? fallback.village,
    district: result.district ?? fallback.district,
    ashaId: role === 'asha' ? id : undefined,
    patientId: result.patientId ?? undefined,
    createdAt: new Date().toISOString(),
  };
}

export function uniquePatientsFromCases(cases: Case[]): Patient[] {
  const map = new Map<number, Patient>();
  cases.forEach((item) => {
    if (item.patient) {
      map.set(item.patient.id, item.patient);
    }
  });
  return [...map.values()];
}

export function flattenVisitsFromCases(cases: Case[]): Visit[] {
  return cases.flatMap((item) => item.visits ?? []);
}

export function flattenReferralsFromCases(cases: Case[]): Referral[] {
  return cases.flatMap((item) => item.referrals ?? []);
}

export function mapPatientHistory(history: ApiPatientHistory) {
  const patient = mapPatient(history.patient);
  const cases = (history.cases ?? []).map(mapCase);
  const visits = (history.visits ?? []).map(mapVisit);
  const nestedVisits = flattenVisitsFromCases(cases);
  const referrals = (history.referrals ?? []).map((item) => mapReferral(item));
  const nestedReferrals = flattenReferralsFromCases(cases);

  return {
    patient,
    healthRequests: (history.healthRequests ?? []).map(mapHealthRequest),
    cases,
    visits: visits.length ? visits : nestedVisits,
    referrals: referrals.length ? referrals : nestedReferrals,
  };
}
