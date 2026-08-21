import { AppText } from '@/components/ui/AppText';
import { View } from 'react-native';

export type SemanticStatusTone = 'success' | 'info' | 'warning' | 'critical';

const toneClasses: Record<SemanticStatusTone, { container: string; text: string }> = {
  success: { container: 'bg-primary-light', text: 'text-primary' },
  info: { container: 'bg-secondary-light', text: 'text-secondary-dark' },
  warning: { container: 'bg-warning-light', text: 'text-warning' },
  critical: { container: 'bg-critical-light', text: 'text-critical' },
};

export function SemanticStatusBadge({ label, tone }: { label: string; tone: SemanticStatusTone }) {
  const styles = toneClasses[tone];
  return <View className={`self-start rounded-full px-2.5 py-1 ${styles.container}`}><AppText variant="caption" className={styles.text}>{label}</AppText></View>;
}
