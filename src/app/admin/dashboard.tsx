import { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';

import { AppButton } from '@/components/ui/AppButton';
import { AppText } from '@/components/ui/AppText';
import { BaseCard } from '@/components/ui/BaseCard';
import { Screen } from '@/components/ui/Screen';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { useAuthStore } from '@/stores/authStore';
import { Redirect, router } from 'expo-router';

const API_BASE_URL =
  'https://aashayen-backend.onrender.com/api';

interface AnalyticsOverview {
  periodDays?: number;
  totalHealthRequests?: number;
  highPriorityCases?: number;
  criticalCases?: number;
  mediumPriorityCases?: number;
  lowPriorityCases?: number;
  activeCases?: number;
  completedRequests?: number;
  referrals?: number;
  averagePriorityScore?: number;
  topRiskDistrict?: string;
}

export default function AdminDashboard() {
  const user = useAuthStore((state) => state.user);
  const clearAuth = useAuthStore((state) => state.clearAuth);
  const [data, setData] =
    useState<AnalyticsOverview | null>(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadDashboard = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(
        `${API_BASE_URL}/analytics/overview?days=30`
      );

      if (!response.ok) {
        throw new Error(
          `Server returned ${response.status}`
        );
      }

      const result = await response.json();

      console.log('ADMIN ANALYTICS:', result);

      setData(result);
    } catch (err) {
      console.log('ADMIN DASHBOARD ERROR:', err);

      setError(
        'Unable to load live analytics. Showing demo data.'
      );

      setData({
        periodDays: 30,
        totalHealthRequests: 48,
        highPriorityCases: 21,
        criticalCases: 4,
        mediumPriorityCases: 72,
        lowPriorityCases: 151,
        activeCases: 67,
        completedRequests: 181,
        referrals: 32,
        averagePriorityScore: 34.7,
        topRiskDistrict: 'Lucknow',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.role === 'admin') {
      loadDashboard();
    }
  }, [user?.role]);

  if (user?.role !== 'admin') {
    return <Redirect href="/admin/login" />;
  }

  return (
    <Screen
      scrollable
      header={
        <ScreenHeader
          contextLabel="Admin Portal"
          title="Dashboard"
        />
      }
    >
      <BaseCard>
        <AppText variant="title">
          AASHAYEN Admin Dashboard
        </AppText>

        <AppText variant="caption" className="mt-2">
          Monitor healthcare requests and community health
          activity.
        </AppText>
      </BaseCard>

      {loading ? (
        <BaseCard className="mt-4 items-center py-8">
          <ActivityIndicator size="large" />

          <AppText variant="caption" className="mt-3">
            Loading analytics...
          </AppText>
        </BaseCard>
      ) : null}

      {error ? (
        <BaseCard className="mt-4">
          <AppText variant="caption">
            {error}
          </AppText>
        </BaseCard>
      ) : null}

      {data ? (
        <>
          {/* Main statistics */}

          <View className="mt-4 flex-row flex-wrap justify-between">
            <BaseCard className="mb-3 w-[48%]">
              <AppText variant="caption">
                Total Requests
              </AppText>

              <AppText variant="display" className="mt-2">
                {data.totalHealthRequests ?? 0}
              </AppText>
            </BaseCard>

            <BaseCard className="mb-3 w-[48%]">
              <AppText variant="caption">
                Active Cases
              </AppText>

              <AppText variant="display" className="mt-2">
                {data.activeCases ?? 0}
              </AppText>
            </BaseCard>

            <BaseCard className="mb-3 w-[48%]">
              <AppText variant="caption">
                High Priority
              </AppText>

              <AppText variant="display" className="mt-2">
                {data.highPriorityCases ?? 0}
              </AppText>
            </BaseCard>

            <BaseCard className="mb-3 w-[48%]">
              <AppText variant="caption">
                Critical
              </AppText>

              <AppText variant="display" className="mt-2">
                {data.criticalCases ?? 0}
              </AppText>
            </BaseCard>
          </View>

          {/* Case breakdown */}

          <BaseCard className="mt-1">
            <AppText variant="title">
              Case Priority
            </AppText>

            <View className="mt-5">
              <AppText variant="caption">
                Critical Cases
              </AppText>

              <AppText variant="body" className="mt-1">
                {data.criticalCases ?? 0}
              </AppText>
            </View>

            <View className="mt-4">
              <AppText variant="caption">
                High Priority Cases
              </AppText>

              <AppText variant="body" className="mt-1">
                {data.highPriorityCases ?? 0}
              </AppText>
            </View>

            <View className="mt-4">
              <AppText variant="caption">
                Medium Priority Cases
              </AppText>

              <AppText variant="body" className="mt-1">
                {data.mediumPriorityCases ?? 0}
              </AppText>
            </View>

            <View className="mt-4">
              <AppText variant="caption">
                Low Priority Cases
              </AppText>

              <AppText variant="body" className="mt-1">
                {data.lowPriorityCases ?? 0}
              </AppText>
            </View>
          </BaseCard>

          {/* Activity */}

          <BaseCard className="mt-4">
            <AppText variant="title">
              Healthcare Activity
            </AppText>

            <View className="mt-5">
              <AppText variant="caption">
                Completed Requests
              </AppText>

              <AppText variant="body" className="mt-1">
                {data.completedRequests ?? 0}
              </AppText>
            </View>

            <View className="mt-4">
              <AppText variant="caption">
                Referrals
              </AppText>

              <AppText variant="body" className="mt-1">
                {data.referrals ?? 0}
              </AppText>
            </View>

            <View className="mt-4">
              <AppText variant="caption">
                Average Priority Score
              </AppText>

              <AppText variant="body" className="mt-1">
                {data.averagePriorityScore ?? 0}
              </AppText>
            </View>

            <View className="mt-4">
              <AppText variant="caption">
                Top Risk District
              </AppText>

              <AppText variant="body" className="mt-1">
                {data.topRiskDistrict || 'Not available'}
              </AppText>
            </View>
          </BaseCard>

          <AppButton
            title="Refresh Dashboard"
            variant="outline"
            onPress={loadDashboard}
          />
          <AppButton
            title="Log Out"
            variant="outline"
            onPress={() => {
              clearAuth();
              router.replace('/admin/login');
            }}
          />
        </>
      ) : null}
    </Screen>
  );
}
