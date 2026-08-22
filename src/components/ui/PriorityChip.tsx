import type { PriorityLevel as ApiPriorityLevel } from '@/types/api';
import { priorityLabels } from '@/utils/recordStatus';
import { AppText } from '@/components/ui/AppText';
import { View } from 'react-native';

export type PriorityLevel = 'high' | 'medium' | 'low' | 'critical';

interface PriorityChipProps {
  level: PriorityLevel;
  label?: string;
}

const chipStyles: Record<PriorityLevel, string> = {
  high: 'border-critical bg-critical-light',
  critical: 'border-critical bg-critical-light',
  medium: 'border-warning bg-warning-light',
  low: 'border-primary bg-primary-light',
};

const textStyles: Record<PriorityLevel, string> = {
  high: 'text-critical',
  critical: 'text-critical',
  medium: 'text-warning',
  low: 'text-primary',
};

const defaultLabels: Record<PriorityLevel, string> = {
  high: 'HIGH',
  critical: 'CRITICAL',
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
  if (score >= 80) return 'critical';
  if (score >= 60) return 'high';
  if (score >= 30) return 'medium';
  return 'low';
}

export function getPriorityChipLevel(level?: ApiPriorityLevel, score?: number): PriorityLevel {
  if (level === 'CRITICAL') return 'critical';
  if (level === 'HIGH') return 'high';
  if (level === 'MEDIUM') return 'medium';
  if (level === 'LOW') return 'low';
  return getPriorityFromScore(score ?? 0);
}

export function getPriorityLabel(level?: ApiPriorityLevel, score?: number): string {
  if (level && priorityLabels[level]) return priorityLabels[level];
  return defaultLabels[getPriorityFromScore(score ?? 0)];
}
