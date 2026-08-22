import type { CaseStatus, PriorityLevel, ReferralStatus, VisitCondition } from '@/types/api';
import type { SemanticStatusTone } from '@/components/asha/SemanticStatusBadge';
import type { VaccinationStatus } from '@/types/vaccination';

interface StatusPresentation {
  label: string;
  tone: SemanticStatusTone;
}

export const caseStatusLabels: Record<CaseStatus, string> = {
  PENDING: 'Pending',
  ASSIGNED: 'Assigned',
  VISITED: 'Visited',
  REFERRED: 'Referred',
  CLOSED: 'Closed',
};

export const priorityLabels: Record<PriorityLevel, string> = {
  LOW: 'Low',
  MEDIUM: 'Medium',
  HIGH: 'High',
  CRITICAL: 'Critical',
};

export const visitConditionLabels: Record<VisitCondition, string> = {
  STABLE: 'Stable',
  NEEDS_ATTENTION: 'Needs Attention',
  URGENT: 'Urgent',
};

export function visitConditionLabel(value: string): string {
  return visitConditionLabels[value as VisitCondition] ?? value;
}

export const vaccinationStatusPresentation: Record<VaccinationStatus, StatusPresentation> = {
  completed: { label: 'Completed', tone: 'success' },
  upcoming: { label: 'Upcoming', tone: 'info' },
  due: { label: 'Due', tone: 'warning' },
  overdue: { label: 'Overdue', tone: 'critical' },
};

export const referralStatusPresentation: Record<ReferralStatus, StatusPresentation> = {
  PENDING: { label: 'Pending', tone: 'warning' },
  ACCEPTED: { label: 'Accepted', tone: 'info' },
  COMPLETED: { label: 'Completed', tone: 'success' },
};
