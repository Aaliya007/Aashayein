import { AshaBackHeader } from '@/components/asha/AshaBackHeader';
import { EmptyState } from '@/components/asha/EmptyState';
import { Screen } from '@/components/ui/Screen';

export default function VaccinationsScreen() {
  return <Screen header={<AshaBackHeader title="Vaccinations" subtitle="Review vaccination tasks for your patients" />}><EmptyState title="Vaccination data unavailable" message="Vaccination records are not available from the Aashayein server yet." /></Screen>;
}
