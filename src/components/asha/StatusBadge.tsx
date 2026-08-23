import type { CaseStatus } from '@/types/case';
import { caseStatusLabels } from '@/utils/recordStatus';
import { AppText } from '@/components/ui/AppText';
import { View } from 'react-native';

const styles: Record<CaseStatus, { wrap: string; text: string }> = {
  PENDING: { wrap: 'bg-warning-light', text: 'text-warning' },
  ASSIGNED: { wrap: 'bg-primary-light', text: 'text-primary' },
  VISITED: { wrap: 'bg-secondary-light', text: 'text-secondary' },
  REFERRED: { wrap: 'bg-critical-light', text: 'text-critical' },
  CLOSED: { wrap: 'bg-surface-subdued', text: 'text-text-secondary' },
};

export function StatusBadge({ status }: { status: CaseStatus }) {
  const style = styles[status] ?? styles.PENDING;
  return (
    <View className={`self-start rounded-full px-2.5 py-1 ${style.wrap}`}>
      <AppText variant="caption" className={style.text}>
        {caseStatusLabels[status] ?? status}
      </AppText>
    </View>
  );
}
