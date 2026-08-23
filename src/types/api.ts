export type BackendUserRole = 'CITIZEN' | 'ASHA' | 'AUTHORITY';
export type InputType = 'TEXT' | 'VOICE';
export type FacilityType = 'PHC' | 'CHC' | 'HOSPITAL';
export type PriorityLevel = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
export type RequestStatus = 'SUBMITTED' | 'PROCESSING' | 'COMPLETED';
export type CaseStatus = 'PENDING' | 'ASSIGNED' | 'VISITED' | 'REFERRED' | 'CLOSED';
export type VisitCondition = 'STABLE' | 'NEEDS_ATTENTION' | 'URGENT';
export type ReferralStatus = 'PENDING' | 'ACCEPTED' | 'COMPLETED';
export type Gender = 'FEMALE' | 'MALE' | 'OTHER';

export interface ApiError {
  status?: number;
  message: string;
}

export interface HealthStatus {
  status: string;
  service: string;
}

export interface ApiUserSummary {
  id: number;
  name: string;
  mobile: string;
  role: BackendUserRole;
  village?: string;
  district?: string;
  email?: string;
}

export interface ApiAsha {
  id: number;
  name: string;
  mobile: string;
  role: 'ASHA';
  village?: string;
  district?: string;
  email?: string;
}

export interface ApiPatient {
  id: number;
  user: ApiUserSummary;
  dateOfBirth: string;
  gender: string;
  address: string;
  latitude?: number | null;
  longitude?: number | null;
  emergencyContact?: string;
  createdAt: string;
}

export interface ApiHealthRequest {
  id: number;
  patientId: number;
  message: string;
  language: string;
  inputType: InputType;
  status: RequestStatus;
  createdAt: string;
  caseId?: number;
  symptoms?: string[] | string;
  duration?: string;
  priorityScore?: number;
  priorityLevel?: PriorityLevel;
  summary?: string;
  evaluation?: string | null;
  redFlags?: string[];
  confidence?: number | null;
}

export interface ApiFacility {
  id: number;
  name: string;
  type: FacilityType | string;
  address: string;
  district: string;
  latitude?: number | null;
  longitude?: number | null;
  phone?: string;
  isActive: boolean;
}

export interface ApiVisit {
  id: number;
  caseId: number;
  ashaId?: number;
  temperature?: number | null;
  condition: VisitCondition | string;
  symptomsObserved?: string;
  symptoms?: string;
  notes?: string | null;
  visitedAt?: string;
  createdAt?: string;
  facilityId?: number | null;
}

export interface ApiReferral {
  id: number;
  caseId: number;
  patient?: ApiPatient;
  patientId?: number;
  facility?: ApiFacility;
  facilityId?: number;
  createdBy?: ApiUserSummary;
  reason: string;
  status: ReferralStatus;
  createdAt: string;
  updatedAt: string;
}

export interface ApiCase {
  id: number;
  patient: ApiPatient;
  healthRequest?: ApiHealthRequest;
  symptoms: string;
  duration: string;
  summary: string;
  priorityScore: number;
  priorityLevel: PriorityLevel;
  evaluation?: string | null;
  redFlags?: string[];
  confidence?: number | null;
  assignedAsha?: ApiUserSummary | null;
  status: CaseStatus;
  createdAt: string;
  updatedAt: string;
  visits?: ApiVisit[];
  referrals?: ApiReferral[];
}

export interface ApiLoginResponse {
  id: number;
  name: string;
  role: BackendUserRole;
  patientId: number | null;
}

export interface ApiRegisterResponse {
  id?: number;
  userId?: number;
  name: string;
  mobile?: string;
  role: BackendUserRole;
  patientId?: number | null;
  village?: string;
  district?: string;
}

export interface ApiPatientHistory {
  patient: ApiPatient;
  healthRequests?: ApiHealthRequest[];
  cases?: ApiCase[];
  visits?: ApiVisit[];
  referrals?: ApiReferral[];
}

export interface CreateHealthRequestPayload {
  patientId: number;
  message: string;
  language: string;
  inputType: InputType;
}

export interface CreateVisitPayload {
  caseId: number;
  ashaId: number;
  temperature: number;
  condition: VisitCondition;
  symptomsObserved: string;
  notes: string;
}

export interface UpdateVisitPayload {
  ashaId: number;
  temperature: number;
  condition: VisitCondition;
  symptomsObserved: string;
  notes: string;
}

export interface CreateReferralPayload {
  caseId: number;
  patientId: number;
  facilityId: number;
  createdBy: number;
  reason: string;
}

export interface UpdateCaseStatusPayload {
  ashaId: number;
  status: CaseStatus;
}

export interface AssignCasePayload {
  ashaId: number;
}

export interface CreateFacilityPayload {
  name: string;
  type: FacilityType;
  address: string;
  district: string;
  latitude: number;
  longitude: number;
  phone: string;
  isActive: boolean;
}

export interface CitizenRegisterPayload {
  name: string;
  mobile: string;
  email: string;
  password: string;
  village: string;
  district: string;
  address: string;
  dateOfBirth: string;
  gender: Gender;
  emergencyContact: string;
}

export interface AshaRegisterPayload {
  name: string;
  mobile: string;
  email: string;
  password: string;
  village: string;
  district: string;
}

export interface LoginPayload {
  mobile: string;
  password: string;
}

export type HeatmapPeriodDays = 7 | 30 | 90;

export interface HealthHeatmapLocation {
  latitude: number;
  longitude: number;
  requestCount: number;
  highPriorityCount: number;
  mediumPriorityCount: number;
  lowPriorityCount: number;
  criticalPriorityCount: number;
  intensity: number;
}

export interface HealthHeatmapResponse {
  periodDays: number;
  totalRequests: number;
  requestsWithoutLocation: number;
  locations: HealthHeatmapLocation[];
}

export interface HealthHeatmapQuery {
  days?: HeatmapPeriodDays;
  district?: string;
  priorityLevel?: PriorityLevel;
}
