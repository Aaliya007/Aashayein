import type { HealthStatus } from '@/types/api';
import { apiGet } from './client';

export function getHealth() {
  return apiGet<HealthStatus>('/api/health');
}
