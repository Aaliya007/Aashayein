import { AppText } from '@/components/ui/AppText';
import {
  AlertCircle,
  ClipboardList,
  MapPin,
  Stethoscope,
  type LucideIcon,
} from 'lucide-react-native';
import { Pressable, View } from 'react-native';

interface QuickAction {
  id: string;
  title: string;
  subtitle: string;
  icon: LucideIcon;
  color: string;
  bgColor: string;
}

const quickActions: QuickAction[] = [
  {
    id: 'health-check',
    title: 'Health Check',
    subtitle: 'Assess symptoms',
    icon: Stethoscope,
    color: '#2F7D6D',
    bgColor: '#E8F5F1',
  },
  {
    id: 'health-requests',
    title: 'Health Requests',
    subtitle: 'View your requests',
    icon: ClipboardList,
    color: '#3A9D70',
    bgColor: '#E8F8F0',
  },
  {
    id: 'emergency',
    title: 'Emergency Help',
    subtitle: 'Get urgent support',
    icon: AlertCircle,
    color: '#D9534F',
    bgColor: '#FDEEEE',
  },
  {
    id: 'nearby',
    title: 'Nearby Healthcare',
    subtitle: 'Find facilities',
    icon: MapPin,
    color: '#E9A23B',
    bgColor: '#FEF6E8',
  },
];

export function QuickActions() {
  return (
    <View className="mb-6">
      <AppText variant="subtitle" className="mb-4">
        Quick Actions
      </AppText>
      <View className="flex-row flex-wrap justify-between gap-y-3">
        {quickActions.map((action) => {
          const Icon = action.icon;
          return (
            <Pressable
              key={action.id}
              accessibilityRole="button"
              accessibilityLabel={action.title}
              className="w-[48%] rounded-2xl bg-surface p-4 shadow-sm active:opacity-80"
              style={{
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.05,
                shadowRadius: 4,
                elevation: 2,
              }}>
              <View
                className="mb-3 h-11 w-11 items-center justify-center rounded-xl"
                style={{ backgroundColor: action.bgColor }}>
                <Icon size={22} color={action.color} />
              </View>
              <AppText variant="label">{action.title}</AppText>
              <AppText variant="caption" className="mt-1">
                {action.subtitle}
              </AppText>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}
