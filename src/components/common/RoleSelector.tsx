import { AppText } from '@/components/ui/AppText';
import { colors } from '@/constants/colors';
import { roleOptions } from '@/constants/appContent';
import { UserRole } from '@/types/user';
import { Check, ShieldCheck, Stethoscope, Users } from 'lucide-react-native';
import { Pressable, View } from 'react-native';

interface RoleSelectorProps {
  value: UserRole;
  onChange: (role: UserRole) => void;
  registerableOnly?: boolean;
  label: string;
}

const roleIcons = {
  asha: Stethoscope,
  patient: Users,
  admin: ShieldCheck,
};

export function RoleSelector({
  value,
  onChange,
  registerableOnly = false,
  label,
}: RoleSelectorProps) {
  const options = registerableOnly
    ? roleOptions.filter((option) => option.registerable)
    : roleOptions;

  return (
    <View className="gap-3">
      <AppText variant="label">{label}</AppText>
      {options.map((option) => {
        const isSelected = value === option.value;
        const Icon = roleIcons[option.value];
        return (
          <Pressable
            key={option.value}
            accessibilityRole="radio"
            accessibilityState={{ selected: isSelected }}
            accessibilityLabel={`Select ${option.title}`}
            onPress={() => onChange(option.value)}
            className={`min-h-touch rounded-2xl border p-4 ${
              isSelected ? 'border-primary bg-primary-soft' : 'border-border bg-surface'
            }`}>
            <View className="flex-row items-start justify-between gap-3">
              <View className="flex-row flex-1 items-start gap-3">
                <View
                  className={`rounded-xl p-2.5 ${isSelected ? 'bg-primary-light' : 'bg-surface-subdued'}`}>
                  <Icon size={20} color={isSelected ? colors.primary : colors.secondary} />
                </View>
                <View className="flex-1">
                  <AppText variant="label">{option.title}</AppText>
                  <AppText variant="caption" className="mt-1">
                    {option.description}
                  </AppText>
                </View>
              </View>
              {isSelected ? (
                <View className="h-7 w-7 items-center justify-center rounded-full bg-primary">
                  <Check size={16} color="#FFFFFF" />
                </View>
              ) : (
                <View className="h-7 w-7 rounded-full border-2 border-border" />
              )}
            </View>
          </Pressable>
        );
      })}
    </View>
  );
}
