import { AshaBackHeader } from '@/components/asha/AshaBackHeader';
import { EmptyState } from '@/components/asha/EmptyState';
import { Screen } from '@/components/ui/Screen';

export default function VaccinationDetailsScreen() {
  return <Screen header={<AshaBackHeader title="Vaccination Details" />}><EmptyState title="Vaccination data unavailable" message="Vaccination record details are not available from the Aashayein server yet." /></Screen>;
}
