import type { CaseStatus } from '@/types/case';
import { AppText } from '@/components/ui/AppText';
import { View } from 'react-native';

const labels: Record<CaseStatus, string> = { active: 'Active', pending: 'Pending', in_progress: 'In Progress', resolved: 'Resolved', referred: 'Referred' };
const styles: Record<CaseStatus, string> = { active: 'bg-primary-light text-primary', pending: 'bg-warning-light text-warning', in_progress: 'bg-secondary-light text-secondary', resolved: 'bg-surface-subdued text-text-secondary', referred: 'bg-critical-light text-critical' };

export function StatusBadge({ status }: { status: CaseStatus }) {
  return <View className={`self-start rounded-full px-2.5 py-1 ${styles[status].split(' ')[0]}`}><AppText variant="caption" className={styles[status].split(' ')[1]}>{labels[status]}</AppText></View>;
}
