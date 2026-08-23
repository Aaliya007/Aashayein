import {
  AlertTriangle,
  Building2,
  ClipboardList,
  RefreshCw,
  ShieldCheck,
  Stethoscope,
  Users,
} from 'lucide-react-native';
import { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, Pressable, View } from 'react-native';

import { AppButton } from '@/components/ui/AppButton';
import { AppText } from '@/components/ui/AppText';
import { BaseCard } from '@/components/ui/BaseCard';
import { Screen } from '@/components/ui/Screen';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { useLogout } from '@/hooks/useAuthMutations';
import { useAuthStore } from '@/stores/authStore';

import {
  getAshas,
  getCases,
  getCriticalCases,
  getFacilities,
  getHighPriorityCases,
  getPendingReferrals,
} from '@/services/api/adminApi';

interface DashboardStats {
  ashaCount: number;
  caseCount: number;
  highPriorityCount: number;
  criticalCount: number;
  facilityCount: number;
  pendingReferralCount: number;
}

export default function AdminDashboardPlaceholder() {
  const user = useAuthStore((s) => s.user);
  const logoutMutation = useLogout();

  const [stats, setStats] = useState<DashboardStats>({
    ashaCount: 0,
    caseCount: 0,
    highPriorityCount: 0,
    criticalCount: 0,
    facilityCount: 0,
    pendingReferralCount: 0,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadDashboard = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const [
        ashas,
        cases,
        highPriorityCases,
        criticalCases,
        facilities,
        pendingReferrals,
      ] = await Promise.all([
        getAshas(),
        getCases(),
        getHighPriorityCases(),
        getCriticalCases(),
        getFacilities(),
        getPendingReferrals(),
      ]);

      setStats({
        ashaCount: Array.isArray(ashas) ? ashas.length : 0,
        caseCount: Array.isArray(cases) ? cases.length : 0,
        highPriorityCount: Array.isArray(highPriorityCases)
          ? highPriorityCases.length
          : 0,
        criticalCount: Array.isArray(criticalCases)
          ? criticalCases.length
          : 0,
        facilityCount: Array.isArray(facilities) ? facilities.length : 0,
        pendingReferralCount: Array.isArray(pendingReferrals)
          ? pendingReferrals.length
          : 0,
      });
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : 'Unable to load admin dashboard.';

      setError(message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadDashboard();
  }, [loadDashboard]);

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
      {/* Welcome */}
      <BaseCard className="mb-4">
        <View className="flex-row items-center">
          <View className="mr-3 rounded-full bg-critical-light p-3">
            <ShieldCheck size={24} color="#BE123C" />
          </View>

          <View className="flex-1">
            <AppText variant="title">
              Welcome{user?.name ? `, ${user.name}` : ''}
            </AppText>

            <AppText variant="caption" className="mt-1">
              Monitor AASHAYEN healthcare activity from one place.
            </AppText>
          </View>
        </View>
      </BaseCard>

      {/* Loading */}
      {loading ? (
        <BaseCard className="items-center py-8">
          <ActivityIndicator size="large" />

          <AppText variant="caption" className="mt-3">
            Loading dashboard data...
          </AppText>
        </BaseCard>
      ) : null}

      {/* Error */}
      {!loading && error ? (
        <BaseCard className="border-red-200 bg-red-50">
          <View className="flex-row items-center">
            <AlertTriangle size={24} color="#DC2626" />

            <View className="ml-3 flex-1">
              <AppText variant="label">
                Unable to load dashboard
              </AppText>

              <AppText variant="caption" className="mt-1">
                {error}
              </AppText>
            </View>
          </View>

          <Pressable
            onPress={loadDashboard}
            className="mt-4 flex-row items-center justify-center rounded-xl bg-white p-3"
          >
            <RefreshCw size={18} color="#0F172A" />

            <AppText variant="label" className="ml-2">
              Try Again
            </AppText>
          </Pressable>
        </BaseCard>
      ) : null}

      {/* Statistics */}
      {!loading && !error ? (
        <>
          <AppText variant="subtitle" className="mb-3">
            Overview
          </AppText>

          <View className="flex-row flex-wrap justify-between">
            {/* ASHA Workers */}
            <BaseCard className="w-[48%]">
              <View className="mb-3 self-start rounded-xl bg-blue-50 p-3">
                <Users size={22} color="#2563EB" />
              </View>

              <AppText variant="display">
                {stats.ashaCount}
              </AppText>

              <AppText variant="caption" className="mt-1">
                ASHA Workers
              </AppText>
            </BaseCard>

            {/* Cases */}
            <BaseCard className="w-[48%]">
              <View className="mb-3 self-start rounded-xl bg-purple-50 p-3">
                <ClipboardList size={22} color="#7C3AED" />
              </View>

              <AppText variant="display">
                {stats.caseCount}
              </AppText>

              <AppText variant="caption" className="mt-1">
                Total Cases
              </AppText>
            </BaseCard>

            {/* High Priority */}
            <BaseCard className="w-[48%]">
              <View className="mb-3 self-start rounded-xl bg-orange-50 p-3">
                <AlertTriangle size={22} color="#EA580C" />
              </View>

              <AppText variant="display">
                {stats.highPriorityCount}
              </AppText>

              <AppText variant="caption" className="mt-1">
                High Priority
              </AppText>
            </BaseCard>

            {/* Critical */}
            <BaseCard className="w-[48%]">
              <View className="mb-3 self-start rounded-xl bg-red-50 p-3">
                <AlertTriangle size={22} color="#DC2626" />
              </View>

              <AppText variant="display">
                {stats.criticalCount}
              </AppText>

              <AppText variant="caption" className="mt-1">
                Critical Cases
              </AppText>
            </BaseCard>

            {/* Facilities */}
            <BaseCard className="w-[48%]">
              <View className="mb-3 self-start rounded-xl bg-green-50 p-3">
                <Building2 size={22} color="#16A34A" />
              </View>

              <AppText variant="display">
                {stats.facilityCount}
              </AppText>

              <AppText variant="caption" className="mt-1">
                Facilities
              </AppText>
            </BaseCard>

            {/* Referrals */}
            <BaseCard className="w-[48%]">
              <View className="mb-3 self-start rounded-xl bg-pink-50 p-3">
                <Stethoscope size={22} color="#DB2777" />
              </View>

              <AppText variant="display">
                {stats.pendingReferralCount}
              </AppText>

              <AppText variant="caption" className="mt-1">
                Pending Referrals
              </AppText>
            </BaseCard>
          </View>

          {/* Priority Alert */}
          <AppText variant="subtitle" className="mb-3 mt-4">
            Priority Monitoring
          </AppText>

          <BaseCard>
            <View className="flex-row items-center">
              <View className="mr-3 rounded-xl bg-red-50 p-3">
                <AlertTriangle size={24} color="#DC2626" />
              </View>

              <View className="flex-1">
                <AppText variant="title">
                  {stats.criticalCount} Critical Cases
                </AppText>

                <AppText variant="caption" className="mt-1">
                  Cases requiring immediate attention.
                </AppText>
              </View>
            </View>

            <View className="mt-4 h-px bg-border-subtle" />

            <View className="mt-4 flex-row items-center">
              <View className="mr-3 rounded-xl bg-orange-50 p-3">
                <AlertTriangle size={24} color="#EA580C" />
              </View>

              <View className="flex-1">
                <AppText variant="title">
                  {stats.highPriorityCount} High Priority Cases
                </AppText>

                <AppText variant="caption" className="mt-1">
                  Cases that need close monitoring.
                </AppText>
              </View>
            </View>
          </BaseCard>

          {/* Refresh */}
          <Pressable
            onPress={loadDashboard}
            className="mb-4 flex-row items-center justify-center rounded-xl border border-border-subtle bg-surface p-4"
          >
            <RefreshCw size={18} color="#0F172A" />

            <AppText variant="label" className="ml-2">
              Refresh Dashboard
            </AppText>
          </Pressable>
        </>
      ) : null}

      {/* Logout */}
      <AppButton
        title="Log Out"
        variant="outline"
        onPress={() => logoutMutation.mutate()}
        loading={logoutMutation.isPending}
      />
    </Screen>
  );
}