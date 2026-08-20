import { HealthStatusCard } from '@/components/home/HealthStatusCard';
import { HealthTipCard } from '@/components/home/HealthTipCard';
import { HomeHeader } from '@/components/home/HomeHeader';
import { QuickActions } from '@/components/home/QuickActions';
import { Screen } from '@/components/ui/Screen';
import { getDailyHealthTip } from '@/data/mock/healthTips';
import { mockUser } from '@/data/mock/users';
import { useAppContext } from '@/context/AppContext';

export default function HomeScreen() {
  const { user } = useAppContext();
  const patientName = user?.name ?? mockUser.name;
  const dailyTip = getDailyHealthTip();

  return (
    <Screen scrollable>
      <HomeHeader patientName={patientName} />
      <HealthStatusCard />
      <QuickActions />
      <HealthTipCard tip={dailyTip} />
    </Screen>
  );
}
