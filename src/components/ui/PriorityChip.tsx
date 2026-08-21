import { AppText } from '@/components/ui/AppText';
import { View } from 'react-native';

export type PriorityLevel = 'high' | 'medium' | 'low';

interface PriorityChipProps {
  level: PriorityLevel;
  label?: string;
}

const chipStyles: Record<PriorityLevel, string> = {
  high: 'border-critical bg-critical-light',
  medium: 'border-warning bg-warning-light',
  low: 'border-primary bg-primary-light',
};

const textStyles: Record<PriorityLevel, string> = {
  high: 'text-critical',
  medium: 'text-warning',
  low: 'text-primary',
};

const defaultLabels: Record<PriorityLevel, string> = {
  high: 'HIGH',
  medium: 'MEDIUM',
  low: 'LOW',
};

export function PriorityChip({ level, label }: PriorityChipProps) {
  return (
    <View
      accessibilityRole="text"
      accessibilityLabel={`Priority ${label ?? defaultLabels[level]}`}
      className={`self-start rounded-full border px-3 py-1 ${chipStyles[level]}`}>
      <AppText variant="caption" className={`font-semibold uppercase ${textStyles[level]}`}>
        {label ?? defaultLabels[level]}
      </AppText>
    </View>
  );
}

export function getPriorityFromScore(score: number): PriorityLevel {
  if (score >= 8) return 'high';
  if (score >= 4) return 'medium';
  return 'low';
}
