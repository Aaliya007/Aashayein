import { AppText } from '@/components/ui/AppText';
import { ReactNode } from 'react';
import { View } from 'react-native';

interface ScreenHeaderProps {
  contextLabel: string;
  title: string;
  actions?: ReactNode;
}

export function ScreenHeader({ contextLabel, title, actions }: ScreenHeaderProps) {
  return (
    <View className="flex-row items-center justify-between border-b border-border-subtle bg-surface px-5 py-4">
      <View className="flex-1 pr-3">
        <AppText variant="subtitle" className="text-primary">
          {contextLabel}
        </AppText>
        <AppText variant="display" className="text-xl">
          {title}
        </AppText>
      </View>
      {actions}
    </View>
  );
}
