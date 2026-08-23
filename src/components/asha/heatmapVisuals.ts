import type { HealthHeatmapLocation } from '@/types/api';

export const HEATMAP_GRADIENT = {
  colors: ['#38BDF8', '#0284C7', '#D97706', '#BE123C'],
  startPoints: [0.1, 0.4, 0.7, 1],
  colorMapSize: 256,
};

export function intensityFillColor(intensity: number): string {
  const clamped = Math.min(1, Math.max(0, intensity));
  const alpha = 0.22 + clamped * 0.5;
  if (clamped >= 0.75) return `rgba(190, 18, 60, ${alpha})`;
  if (clamped >= 0.45) return `rgba(217, 119, 6, ${alpha})`;
  return `rgba(2, 132, 199, ${alpha})`;
}

export function regionFromLocations(locations: HealthHeatmapLocation[]) {
  const latitudes = locations.map((item) => item.latitude);
  const longitudes = locations.map((item) => item.longitude);
  const minLat = Math.min(...latitudes);
  const maxLat = Math.max(...latitudes);
  const minLng = Math.min(...longitudes);
  const maxLng = Math.max(...longitudes);
  return {
    latitude: (minLat + maxLat) / 2,
    longitude: (minLng + maxLng) / 2,
    latitudeDelta: Math.max((maxLat - minLat) * 1.8, 0.08),
    longitudeDelta: Math.max((maxLng - minLng) * 1.8, 0.08),
  };
}
