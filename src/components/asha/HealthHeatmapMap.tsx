import { HEATMAP_GRADIENT, intensityFillColor, regionFromLocations } from '@/components/asha/heatmapVisuals';
import type { HealthHeatmapLocation } from '@/types/api';
import { Platform } from 'react-native';
import MapView, { Circle, Heatmap } from 'react-native-maps';

const CLUSTER_RADIUS_METERS = 700;

interface HealthHeatmapMapProps {
  locations: HealthHeatmapLocation[];
}

export function HealthHeatmapMap({ locations }: HealthHeatmapMapProps) {
  const region = regionFromLocations(locations);
  const heatmapPoints = locations.map((location) => ({
    latitude: location.latitude,
    longitude: location.longitude,
    weight: location.intensity,
  }));

  return (
    <MapView
      style={{ width: '100%', height: '100%' }}
      initialRegion={region}
      rotateEnabled={false}
      pitchEnabled={false}
      toolbarEnabled={false}>
      {Platform.OS === 'android' ? (
        <Heatmap points={heatmapPoints} radius={40} opacity={0.75} gradient={HEATMAP_GRADIENT} />
      ) : (
        locations.map((location, index) => (
          <Circle
            key={`${location.latitude}-${location.longitude}-${index}`}
            center={{ latitude: location.latitude, longitude: location.longitude }}
            radius={CLUSTER_RADIUS_METERS}
            fillColor={intensityFillColor(location.intensity)}
            strokeColor="transparent"
            strokeWidth={0}
          />
        ))
      )}
    </MapView>
  );
}
