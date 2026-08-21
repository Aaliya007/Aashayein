import { AppText } from '@/components/ui/AppText';
import { colors } from '@/constants/colors';
import { demoAccounts, type DemoAccount } from '@/constants/appContent';
import { ShieldCheck, Stethoscope, Users } from 'lucide-react-native';
import { Pressable, View } from 'react-native';

interface DemoAccountsProps {
  hint: string;
  onSelect: (account: DemoAccount) => void;
}

const icons = {
  asha: Stethoscope,
  patient: Users,
  admin: ShieldCheck,
};

export function DemoAccounts({ hint, onSelect }: DemoAccountsProps) {
  return (
    <View className="gap-2">
      <AppText variant="caption">{hint}</AppText>
      <View className="flex-row gap-2">
        {demoAccounts.map((account) => {
          const Icon = icons[account.role];
          return (
            <Pressable
              key={account.role}
              accessibilityRole="button"
              accessibilityLabel={`Use ${account.label} demo account`}
              onPress={() => onSelect(account)}
              className="min-h-touch flex-1 items-center rounded-xl border border-border bg-surface px-2 py-3 active:bg-primary-soft">
              <Icon size={18} color={account.role === 'admin' ? colors.critical : colors.primary} />
              <AppText variant="caption" className="mt-1 text-center font-semibold text-text-primary">
                {account.label}
              </AppText>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}
