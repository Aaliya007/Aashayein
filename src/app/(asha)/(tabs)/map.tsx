import { EmptyState } from '@/components/asha/EmptyState';
import { FilterChip } from '@/components/asha/FilterChip';
import { HealthHeatmapMap } from '@/components/asha/HealthHeatmapMap';
import { AppButton } from '@/components/ui/AppButton';
import { AppText } from '@/components/ui/AppText';
import { BaseCard } from '@/components/ui/BaseCard';
import { Screen } from '@/components/ui/Screen';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { useFacilities, useHealthHeatmap } from '@/hooks/useAshaQueries';
import type { HeatmapPeriodDays, PriorityLevel } from '@/types/api';
import { Search } from 'lucide-react-native';
import { useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, ScrollView, TextInput, View } from 'react-native';

const PERIODS: { label: string; value: HeatmapPeriodDays }[] = [
  { label: '7 days', value: 7 },
  { label: '30 days', value: 30 },
  { label: '90 days', value: 90 },
];

const PRIORITIES: { label: string; value: PriorityLevel | 'ALL' }[] = [
  { label: 'All', value: 'ALL' },
  { label: 'LOW', value: 'LOW' },
  { label: 'MEDIUM', value: 'MEDIUM' },
  { label: 'HIGH', value: 'HIGH' },
  { label: 'CRITICAL', value: 'CRITICAL' },
];

export default function AshaMapScreen() {
  const [days, setDays] = useState<HeatmapPeriodDays>(30);
  const [priorityLevel, setPriorityLevel] = useState<PriorityLevel | 'ALL'>('ALL');
  const [districtDraft, setDistrictDraft] = useState('');
  const [district, setDistrict] = useState<string | undefined>(undefined);
  const { data: facilities = [] } = useFacilities();

  useEffect(() => {
    const handle = setTimeout(() => {
      const trimmed = districtDraft.trim();
      setDistrict(trimmed || undefined);
    }, 400);
    return () => clearTimeout(handle);
  }, [districtDraft]);

  const districts = useMemo(() => {
    const unique = [...new Set(facilities.map((item) => item.district).filter(Boolean))].sort((a, b) =>
      a.localeCompare(b),
    );
    return unique;
  }, [facilities]);

  const heatmapQuery = useHealthHeatmap({
    days,
    district,
    priorityLevel: priorityLevel === 'ALL' ? undefined : priorityLevel,
  });

  const locations = heatmapQuery.data?.locations ?? [];
  const totalRequests = heatmapQuery.data?.totalRequests ?? 0;
  const requestsWithoutLocation = heatmapQuery.data?.requestsWithoutLocation ?? 0;
  const errorMessage =
    heatmapQuery.error instanceof Error ? heatmapQuery.error.message : 'Unable to load the health heatmap.';

  return (
    <Screen
      scrollable
      header={<ScreenHeader contextLabel="ASHA Portal" title="Health Heatmap" />}>
      <AppText variant="body" className="mb-3 text-text-secondary">
        Aggregated health-request density. Individual patient locations are not shown.
      </AppText>

      <AppText variant="caption" className="mb-2">
        Period
      </AppText>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerClassName="gap-2 pb-3">
        {PERIODS.map((item) => (
          <FilterChip
            key={item.value}
            label={item.label}
            active={days === item.value}
            onPress={() => setDays(item.value)}
          />
        ))}
      </ScrollView>

      <AppText variant="caption" className="mb-2">
        Priority
      </AppText>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerClassName="gap-2 pb-3">
        {PRIORITIES.map((item) => (
          <FilterChip
            key={item.value}
            label={item.label}
            active={priorityLevel === item.value}
            onPress={() => setPriorityLevel(item.value)}
          />
        ))}
      </ScrollView>

      <AppText variant="caption" className="mb-2">
        District
      </AppText>
      <View className="mb-3 min-h-touch flex-row items-center rounded-xl border border-border bg-surface-subdued px-3">
        <Search size={18} color="#94A3B8" />
        <TextInput
          value={districtDraft}
          onChangeText={setDistrictDraft}
          placeholder="All districts"
          placeholderTextColor="#94A3B8"
          autoCapitalize="words"
          className="ml-2 flex-1 py-3 text-base text-text-primary"
          style={{ fontFamily: 'Inter_400Regular' }}
          accessibilityLabel="District filter"
        />
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerClassName="gap-2 pb-3">
        <FilterChip
          label="All"
          active={!district}
          onPress={() => {
            setDistrictDraft('');
            setDistrict(undefined);
          }}
        />
        {districts.map((item) => (
          <FilterChip
            key={item}
            label={item}
            active={district === item}
            onPress={() => {
              setDistrictDraft(item);
              setDistrict(item);
            }}
          />
        ))}
      </ScrollView>

      <View className="mb-3 flex-row gap-3">
        <BaseCard className="mb-0 flex-1">
          <AppText variant="caption">Total Requests</AppText>
          <AppText variant="title" className="mt-1">
            {heatmapQuery.isLoading && !heatmapQuery.data ? '—' : String(totalRequests)}
          </AppText>
        </BaseCard>
        <BaseCard className="mb-0 flex-1">
          <AppText variant="caption">Without Location</AppText>
          <AppText variant="title" className="mt-1">
            {heatmapQuery.isLoading && !heatmapQuery.data ? '—' : String(requestsWithoutLocation)}
          </AppText>
        </BaseCard>
      </View>

      <View className="h-[320px] overflow-hidden rounded-2xl border border-border bg-surface">
        {heatmapQuery.isLoading && !heatmapQuery.data ? (
          <View className="flex-1 items-center justify-center px-6">
            <ActivityIndicator color="#0F766E" />
            <AppText variant="caption" className="mt-3 text-center">
              Loading heatmap...
            </AppText>
          </View>
        ) : heatmapQuery.isError && !heatmapQuery.data ? (
          <View className="flex-1 items-center justify-center px-6 py-8">
            <EmptyState title="Unable to load heatmap" message={errorMessage} />
            <View className="mt-4 w-full">
              <AppButton title="Retry" onPress={() => heatmapQuery.refetch()} />
            </View>
          </View>
        ) : locations.length === 0 ? (
          <View className="flex-1 items-center justify-center px-4">
            <EmptyState
              title="No heatmap locations"
              message={
                requestsWithoutLocation > 0
                  ? `${requestsWithoutLocation} request${requestsWithoutLocation === 1 ? '' : 's'} in this period have no location to plot.`
                  : 'No aggregated health-request locations match these filters.'
              }
            />
          </View>
        ) : (
          <View className="flex-1">
            {heatmapQuery.isFetching ? (
              <View className="absolute right-3 top-3 z-10 rounded-full bg-surface px-3 py-2">
                <ActivityIndicator color="#0F766E" />
              </View>
            ) : null}
            <HealthHeatmapMap
              key={`${days}-${district ?? 'all'}-${priorityLevel}-${locations.length}`}
              locations={locations}
            />
          </View>
        )}
      </View>

      <View className="mt-3 mb-2">
        <AppText variant="caption" className="mb-2">
          Heatmap legend
        </AppText>
        <View className="h-3 flex-row overflow-hidden rounded-full">
          <View className="flex-1" style={{ backgroundColor: '#38BDF8' }} />
          <View className="flex-1" style={{ backgroundColor: '#0284C7' }} />
          <View className="flex-1" style={{ backgroundColor: '#D97706' }} />
          <View className="flex-1" style={{ backgroundColor: '#BE123C' }} />
        </View>
        <View className="mt-1 flex-row justify-between">
          <AppText variant="caption">Lower density</AppText>
          <AppText variant="caption">Higher density</AppText>
        </View>
      </View>
    </Screen>
  );
}
