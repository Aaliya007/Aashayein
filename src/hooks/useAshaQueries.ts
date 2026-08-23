import {
  createHealthRequest,
  createReferral,
  createVisit,
  getAshaCase,
  getHealth,
  getPatientHistory,
  getReferral,
  getVisit,
  listAshaCases,
  listAshas,
  listFacilities,
  listHealthRequestsForPatient,
  listReferrals,
  listReferralsForCase,
  listVisitsForCase,
  updateAshaCaseStatus,
  updateReferralStatus,
  getHealthHeatmap,
} from '@/services/api';
import {
  flattenVisitsFromCases,
  mapCase,
  mapFacility,
  mapHealthRequest,
  mapPatientHistory,
  mapReferral,
  mapVisit,
  uniquePatientsFromCases,
} from '@/services/api/mappers';
import type {
  CaseStatus,
  CreateHealthRequestPayload,
  CreateReferralPayload,
  CreateVisitPayload,
  HealthHeatmapQuery,
  PriorityLevel,
  ReferralStatus,
} from '@/types/api';
import { useAuthStore } from '@/stores/authStore';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export const queryKeys = {
  health: ['health'] as const,
  ashas: ['ashas'] as const,
  ashaCases: (ashaId?: number, extra?: Record<string, string | undefined>) =>
    ['asha-cases', ashaId, extra] as const,
  ashaCase: (id: number) => ['asha-case', id] as const,
  patientHistory: (id: number) => ['patient-history', id] as const,
  facilities: (district?: string) => ['facilities', district] as const,
  referrals: (filters?: Record<string, string | number | undefined>) => ['referrals', filters] as const,
  caseReferrals: (caseId: number) => ['referrals-case', caseId] as const,
  visit: (id: number) => ['visit', id] as const,
  caseVisits: (caseId: number) => ['visits-case', caseId] as const,
  patientRequests: (patientId: number) => ['health-requests-patient', patientId] as const,
  healthHeatmap: (filters: HealthHeatmapQuery) => ['health-heatmap', filters] as const,
};

export function useCurrentAshaId(): number | undefined {
  const user = useAuthStore((s) => s.user);
  if (!user || user.role !== 'asha') return undefined;
  return user.ashaId ?? user.id;
}

export function useCurrentPatientId(): number | undefined {
  const user = useAuthStore((s) => s.user);
  if (!user) return undefined;
  return user.patientId;
}

export function useHealthCheck() {
  return useQuery({
    queryKey: queryKeys.health,
    queryFn: getHealth,
    staleTime: 60_000,
  });
}

export function useAshas() {
  return useQuery({
    queryKey: queryKeys.ashas,
    queryFn: listAshas,
  });
}

export function useAshaCases(filters?: { priorityLevel?: PriorityLevel; status?: CaseStatus }) {
  const ashaId = useCurrentAshaId();
  return useQuery({
    queryKey: queryKeys.ashaCases(ashaId, {
      priorityLevel: filters?.priorityLevel,
      status: filters?.status,
    }),
    enabled: ashaId != null,
    queryFn: async () => {
      const cases = await listAshaCases({
        ashaId,
        priorityLevel: filters?.priorityLevel,
        status: filters?.status,
      });
      return cases.map(mapCase);
    },
  });
}

export function useAshaCase(id?: number) {
  return useQuery({
    queryKey: queryKeys.ashaCase(id ?? 0),
    enabled: Number.isFinite(id) && (id ?? 0) > 0,
    queryFn: async () => mapCase(await getAshaCase(id as number)),
  });
}

export function usePatientHistory(patientId?: number) {
  return useQuery({
    queryKey: queryKeys.patientHistory(patientId ?? 0),
    enabled: Number.isFinite(patientId) && (patientId ?? 0) > 0,
    queryFn: async () => mapPatientHistory(await getPatientHistory(patientId as number)),
  });
}

export function useHealthHeatmap(filters: HealthHeatmapQuery) {
  return useQuery({
    queryKey: queryKeys.healthHeatmap(filters),
    queryFn: () => getHealthHeatmap(filters),
  });
}

export function useFacilities(district?: string) {
  return useQuery({
    queryKey: queryKeys.facilities(district),
    queryFn: async () => (await listFacilities(district)).map(mapFacility),
  });
}

export function useReferrals(filters?: { status?: ReferralStatus; facilityId?: number; createdBy?: number }) {
  return useQuery({
    queryKey: queryKeys.referrals(filters),
    queryFn: async () => (await listReferrals(filters)).map((item) => mapReferral(item)),
  });
}

export function useCaseReferrals(caseId?: number) {
  return useQuery({
    queryKey: queryKeys.caseReferrals(caseId ?? 0),
    enabled: Number.isFinite(caseId) && (caseId ?? 0) > 0,
    queryFn: async () => (await listReferralsForCase(caseId as number)).map((item) => mapReferral(item)),
  });
}

export function useReferral(id?: number) {
  return useQuery({
    queryKey: ['referral', id],
    enabled: Number.isFinite(id) && (id ?? 0) > 0,
    queryFn: async () => mapReferral(await getReferral(id as number)),
  });
}

export function useVisit(id?: number) {
  return useQuery({
    queryKey: queryKeys.visit(id ?? 0),
    enabled: Number.isFinite(id) && (id ?? 0) > 0,
    queryFn: async () => mapVisit(await getVisit(id as number)),
  });
}

export function useCaseVisits(caseId?: number) {
  return useQuery({
    queryKey: queryKeys.caseVisits(caseId ?? 0),
    enabled: Number.isFinite(caseId) && (caseId ?? 0) > 0,
    queryFn: async () => (await listVisitsForCase(caseId as number)).map(mapVisit),
  });
}

export function useAshaWorkspace() {
  const casesQuery = useAshaCases();
  const cases = casesQuery.data ?? [];
  return {
    ...casesQuery,
    cases,
    patients: uniquePatientsFromCases(cases),
    visits: flattenVisitsFromCases(cases),
  };
}

export function usePatientHealthRequests(patientId?: number) {
  return useQuery({
    queryKey: queryKeys.patientRequests(patientId ?? 0),
    enabled: Number.isFinite(patientId) && (patientId ?? 0) > 0,
    queryFn: async () => (await listHealthRequestsForPatient(patientId as number)).map(mapHealthRequest),
  });
}

export function useCreateVisit() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreateVisitPayload) => createVisit(payload),
    onSuccess: (_result, variables) => {
      queryClient.invalidateQueries({ queryKey: ['asha-cases'] });
      queryClient.invalidateQueries({ queryKey: queryKeys.ashaCase(variables.caseId) });
      queryClient.invalidateQueries({ queryKey: queryKeys.caseVisits(variables.caseId) });
    },
  });
}

export function useUpdateCaseStatus(caseId: number) {
  const queryClient = useQueryClient();
  const ashaId = useCurrentAshaId();
  return useMutation({
    mutationFn: (status: CaseStatus) => {
      if (!ashaId) throw new Error('Select or sign in as an ASHA worker first.');
      return updateAshaCaseStatus(caseId, { ashaId, status });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['asha-cases'] });
      queryClient.invalidateQueries({ queryKey: queryKeys.ashaCase(caseId) });
    },
  });
}

export function useCreateReferral() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreateReferralPayload) => createReferral(payload),
    onSuccess: (_result, variables) => {
      queryClient.invalidateQueries({ queryKey: ['referrals'] });
      queryClient.invalidateQueries({ queryKey: queryKeys.caseReferrals(variables.caseId) });
      queryClient.invalidateQueries({ queryKey: queryKeys.ashaCase(variables.caseId) });
      queryClient.invalidateQueries({ queryKey: ['asha-cases'] });
    },
  });
}

export function useUpdateReferralStatus() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, status }: { id: number; status: ReferralStatus }) => updateReferralStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['referrals'] });
      queryClient.invalidateQueries({ queryKey: ['asha-case'] });
      queryClient.invalidateQueries({ queryKey: ['asha-cases'] });
    },
  });
}

export function useCreateHealthRequest() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreateHealthRequestPayload) => createHealthRequest(payload),
    onSuccess: (result) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.patientRequests(result.patientId) });
      queryClient.invalidateQueries({ queryKey: queryKeys.patientHistory(result.patientId) });
      queryClient.invalidateQueries({ queryKey: ['asha-cases'] });
    },
  });
}
