import { type ReactNode } from 'react';
import { View } from 'react-native';

interface ScreenBackgroundProps {
  children: ReactNode;
  className?: string;
}

/** Provides the shared soft, rural-health inspired canvas without relying on image assets. */
export function ScreenBackground({ children, className = '' }: ScreenBackgroundProps) {
  return (
    <View className={`flex-1 overflow-hidden bg-[#FCFDFB] ${className}`}>
      <View className="absolute -left-20 -top-24 h-64 w-64 rounded-full bg-primary-light opacity-60" />
      <View className="absolute -right-24 top-40 h-52 w-52 rounded-full bg-secondary-light opacity-45" />
      <View className="absolute -bottom-24 left-12 h-56 w-72 rounded-[96px] bg-[#FFF3E3] opacity-80" />
      {children}
    </View>
  );
}
