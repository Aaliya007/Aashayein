import type { ApiFacility, CreateFacilityPayload } from '@/types/api';
import { apiGet, apiPost } from './client';

export function listFacilities(district?: string) {
  return apiGet<ApiFacility[]>('/api/facilities', district ? { district } : undefined);
}

export function getFacility(id: number) {
  return apiGet<ApiFacility>(`/api/facilities/${id}`);
}

export function createFacility(payload: CreateFacilityPayload) {
  return apiPost<ApiFacility>('/api/facilities', payload);
}
