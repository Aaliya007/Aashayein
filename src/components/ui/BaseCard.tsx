import { ReactNode } from 'react';
import { View, type ViewProps } from 'react-native';

interface BaseCardProps extends ViewProps {
  children: ReactNode;
  className?: string;
}

export function BaseCard({ children, className = '', ...props }: BaseCardProps) {
  return (
    <View
      className={`mb-3 rounded-2xl border border-border-subtle bg-surface p-4 shadow-sm ${className}`}
      style={{
        shadowColor: '#0F172A',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
      }}
      {...props}>
      {children}
    </View>
  );
}
