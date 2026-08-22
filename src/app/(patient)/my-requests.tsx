import { AppText } from '@/components/ui/AppText';
import { BaseCard } from '@/components/ui/BaseCard';
import { Screen } from '@/components/ui/Screen';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { healthRequestsApi } from '@/services/api/healthRequests.api';
import { useAuthStore } from '@/stores/authStore';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Pressable, View } from 'react-native';

export default function MyRequests() {
  const user = useAuthStore((s) => s.user);

  const [requests, setRequests] = useState<
    Awaited<ReturnType<typeof healthRequestsApi.getByPatient>>['data']
  >([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadRequests = async () => {
      if (!user?.patientId) {
        setLoading(false);
        setError('Patient information not found.');
        return;
      }

      try {
        setError('');

        const response = await healthRequestsApi.getByPatient(
          user.patientId,
        );

        console.log('MY REQUESTS:', response.data);

        setRequests(response.data);
      } catch (err: any) {
        console.log('MY REQUESTS ERROR:', err?.message);
        setError(
          err?.message ?? 'Unable to load your requests.',
        );
      } finally {
        setLoading(false);
      }
    };

    loadRequests();
  }, [user?.patientId]);

  return (
    <Screen
      scrollable
      header={
        <ScreenHeader
          contextLabel="Citizen Portal"
          title="My Requests"
        />
      }
    >
      <AppText variant="caption">
        Your submitted health requests
      </AppText>

      {loading ? (
        <View className="items-center py-10">
          <ActivityIndicator />
          <AppText variant="caption" className="mt-3">
            Loading your requests...
          </AppText>
        </View>
      ) : error ? (
        <BaseCard className="mt-4">
          <AppText variant="title">
            Unable to load requests
          </AppText>

          <AppText variant="caption" className="mt-2">
            {error}
          </AppText>
        </BaseCard>
      ) : requests.length === 0 ? (
        <BaseCard className="mt-4 items-center py-8">
          <AppText variant="title">
            No requests yet
          </AppText>

          <AppText
            variant="caption"
            className="mt-2 text-center"
          >
            Your submitted health requests will appear here.
          </AppText>
        </BaseCard>
      ) : (
        requests.map((request) => (
          <Pressable
            key={request.id}
            onPress={() =>
              router.push({
                pathname: '/request-details',
                params: {
                  id: String(request.id),
                },
              })
            }
          >
            <BaseCard className="mt-4">
              <View className="flex-row items-start justify-between">
                <View className="flex-1 pr-3">
                  <AppText variant="title">
                    {request.symptoms?.length
                      ? request.symptoms.join(', ')
                      : request.summary || 'Health Request'}
                  </AppText>

                  <AppText
                    variant="caption"
                    className="mt-1"
                  >
                    {request.summary || 'Health request submitted'}
                  </AppText>

                  <AppText
                    variant="caption"
                    className="mt-2"
                  >
                    Request #{request.id}
                  </AppText>
                </View>

                <View className="rounded-full bg-amber-100 px-3 py-2">
                  <AppText className="text-amber-800">
                    {request.status}
                  </AppText>
                </View>
              </View>

              {request.priorityLevel ? (
                <AppText
                  variant="caption"
                  className="mt-3"
                >
                  Priority: {request.priorityLevel}
                </AppText>
              ) : null}

              <AppText
                variant="caption"
                className="mt-4 text-teal-700"
              >
                View Details →
              </AppText>
            </BaseCard>
          </Pressable>
        ))
      )}
    </Screen>
  );
}