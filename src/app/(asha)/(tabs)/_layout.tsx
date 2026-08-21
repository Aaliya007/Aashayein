import { colors } from '@/constants/colors';
import { Tabs } from 'expo-router';
import { Bell, ClipboardList, Home, Map, User } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function AshaTabsLayout() {
  const insets = useSafeAreaInsets();
  const bottomPadding = Math.max(insets.bottom, 8);

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarStyle: {
          backgroundColor: colors.surface,
          borderTopColor: colors.border,
          borderTopWidth: 1,
          height: 64 + bottomPadding,
          paddingBottom: bottomPadding,
          paddingTop: 8,
          paddingHorizontal: 4,
        },
        tabBarLabelStyle: { fontSize: 12, fontWeight: '500' },
      }}>
      <Tabs.Screen name="home" options={{ title: 'Home', tabBarIcon: ({ color, size }) => <Home size={size} color={color} accessibilityLabel="ASHA Home" /> }} />
      <Tabs.Screen name="cases" options={{ title: 'Cases', tabBarIcon: ({ color, size }) => <ClipboardList size={size} color={color} accessibilityLabel="Cases" /> }} />
      <Tabs.Screen name="map" options={{ title: 'Map', tabBarIcon: ({ color, size }) => <Map size={size} color={color} accessibilityLabel="Health map" /> }} />
      <Tabs.Screen name="notifications" options={{ title: 'Alerts', tabBarIcon: ({ color, size }) => <Bell size={size} color={color} accessibilityLabel="Alerts" /> }} />
      <Tabs.Screen name="profile" options={{ title: 'Profile', tabBarIcon: ({ color, size }) => <User size={size} color={color} accessibilityLabel="Profile" /> }} />
    </Tabs>
  );
}
