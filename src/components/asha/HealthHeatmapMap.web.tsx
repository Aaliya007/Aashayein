import { intensityFillColor, regionFromLocations } from '@/components/asha/heatmapVisuals';
import type { HealthHeatmapLocation } from '@/types/api';
import { createElement, useMemo } from 'react';
import { View } from 'react-native';

interface HealthHeatmapMapProps {
  locations: HealthHeatmapLocation[];
}

export function HealthHeatmapMap({ locations }: HealthHeatmapMapProps) {
  const region = regionFromLocations(locations);
  const mapBounds = useMemo(
    () => ({
      minLatitude: region.latitude - region.latitudeDelta / 2,
      maxLatitude: region.latitude + region.latitudeDelta / 2,
      minLongitude: region.longitude - region.longitudeDelta / 2,
      maxLongitude: region.longitude + region.longitudeDelta / 2,
    }),
    [region],
  );
  const points = useMemo(
    () =>
      locations.map((location, index) => {
        const x =
          ((location.longitude - mapBounds.minLongitude) / region.longitudeDelta) * 100;
        const y =
          ((mapBounds.maxLatitude - location.latitude) / region.latitudeDelta) * 100;
        return {
          key: `${location.latitude}-${location.longitude}-${index}`,
          cx: Math.min(96, Math.max(4, x)),
          cy: Math.min(96, Math.max(4, y)),
          intensity: location.intensity,
        };
      }),
    [locations, mapBounds, region.latitudeDelta, region.longitudeDelta],
  );
  const mapUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${mapBounds.minLongitude},${mapBounds.minLatitude},${mapBounds.maxLongitude},${mapBounds.maxLatitude}&layer=mapnik`;

  return (
    <View className="h-full w-full bg-secondary-soft" accessibilityLabel="Health request density map">
      {createElement('iframe', {
        title: 'Health request density map',
        src: mapUrl,
        loading: 'lazy',
        referrerPolicy: 'no-referrer',
        frameBorder: '0',
        style: { width: '100%', height: '100%', border: 0 },
      })}
      <View className="absolute inset-0" pointerEvents="none">
        {points.map((point) => (
          <View
            key={point.key}
            className="absolute rounded-full"
            style={{
              left: `${point.cx}%`,
              top: `${point.cy}%`,
              width: 24 + point.intensity * 32,
              height: 24 + point.intensity * 32,
              marginLeft: -(12 + point.intensity * 16),
              marginTop: -(12 + point.intensity * 16),
              backgroundColor: intensityFillColor(point.intensity),
            }}
          />
        ))}
      </View>
    </View>
  );
}
