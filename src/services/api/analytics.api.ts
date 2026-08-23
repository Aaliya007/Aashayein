import type { HealthHeatmapQuery, HealthHeatmapResponse } from '@/types/api';
import { apiGet } from './client';

export function getHealthHeatmap(query?: HealthHeatmapQuery) {
  return apiGet<HealthHeatmapResponse>('/api/analytics/health-heatmap', {
    days: query?.days ?? 30,
    district: query?.district,
    priorityLevel: query?.priorityLevel,
  });
}
