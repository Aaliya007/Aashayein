import { AppText } from '@/components/ui/AppText';
import { BaseCard } from '@/components/ui/BaseCard';
import { Screen } from '@/components/ui/Screen';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { patientsApi } from '@/services/api/patients.api';
import { mapPatientHistory } from '@/services/api/mappers';
import { useAuthStore } from '@/stores/authStore';
import { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';

export default function HealthHistory() {
  const user = useAuthStore((s) => s.user);

  const [history, setHistory] = useState<ReturnType<typeof mapPatientHistory> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadHistory = async () => {
      if (!user?.patientId) {
        setLoading(false);
        setError('Patient information not found.');
        return;
      }

      try {
        const response = await patientsApi.getHistory(
          user.patientId,
        );

        console.log(
          'PATIENT HEALTH HISTORY:',
          response.data,
        );

        setHistory(mapPatientHistory(response.data));
      } catch (error: unknown) {
        console.log('PATIENT HEALTH HISTORY ERROR:', error);
        setError(error instanceof Error ? error.message : 'Unable to load health history.');
      } finally {
        setLoading(false);
      }
    };

    loadHistory();
  }, [user?.patientId]);

  if (loading) {
    return (
      <Screen
        scrollable
        header={
          <ScreenHeader
            contextLabel="Citizen Portal"
            title="Health History"
          />
        }
      >
        <View className="items-center py-12">
          <ActivityIndicator />

          <AppText
            variant="caption"
            className="mt-3"
          >
            Loading your health history...
          </AppText>
        </View>
      </Screen>
    );
  }

  if (error || !history) {
    return (
      <Screen
        scrollable
        header={
          <ScreenHeader
            contextLabel="Citizen Portal"
            title="Health History"
          />
        }
      >
        <BaseCard className="mt-4">
          <AppText variant="title">
            Unable to load health history
          </AppText>

          <AppText
            variant="caption"
            className="mt-2"
          >
            {error || 'No health history found.'}
          </AppText>
        </BaseCard>
      </Screen>
    );
  }

  const patient = history.patient;

  const healthRequests =
    history.healthRequests ?? [];

  const cases = history.cases ?? [];

  const visits = history.visits ?? [];

  const referrals =
    history.referrals ?? [];

  return (
    <Screen
      scrollable
      header={
        <ScreenHeader
          contextLabel="Citizen Portal"
          title="Health History"
        />
      }
    >
      {/* Health Summary */}
      <BaseCard>
        <AppText variant="title">
          Health Summary
        </AppText>

        <View className="mt-5 flex-row justify-between">
          <View>
            <AppText variant="caption">
              Health Requests
            </AppText>

            <AppText
              variant="body"
              className="mt-1"
            >
              {healthRequests.length}
            </AppText>
          </View>

          <View>
            <AppText variant="caption">
              Cases
            </AppText>

            <AppText
              variant="body"
              className="mt-1"
            >
              {cases.length}
            </AppText>
          </View>

          <View>
            <AppText variant="caption">
              Visits
            </AppText>

            <AppText
              variant="body"
              className="mt-1"
            >
              {visits.length}
            </AppText>
          </View>
        </View>

        <View className="mt-5">
          <AppText variant="caption">
            Referrals
          </AppText>

          <AppText
            variant="body"
            className="mt-1"
          >
            {referrals.length}
          </AppText>
        </View>
      </BaseCard>

      {/* Patient Information */}
      {patient ? (
        <BaseCard>
          <AppText variant="title">
            Patient Information
          </AppText>

          <View className="mt-4">
            <AppText variant="caption">
              Name
            </AppText>

            <AppText
              variant="body"
              className="mt-1"
            >
              {patient.name || patient.mobile || 'Not available'}
            </AppText>
          </View>

          <View className="mt-4">
            <AppText variant="caption">
              Gender
            </AppText>

            <AppText
              variant="body"
              className="mt-1"
            >
              {patient.gender || 'Not available'}
            </AppText>
          </View>

          <View className="mt-4">
            <AppText variant="caption">
              Date of Birth
            </AppText>

            <AppText
              variant="body"
              className="mt-1"
            >
              {patient.dateOfBirth ||
                'Not available'}
            </AppText>
          </View>
        </BaseCard>
      ) : null}

      {/* Recent Cases */}
      <BaseCard>
        <AppText variant="title">
          Recent Health Cases
        </AppText>

        {cases.length === 0 ? (
          <AppText
            variant="caption"
            className="mt-4"
          >
            No health cases found.
          </AppText>
        ) : (
          cases
            .slice(0, 5)
            .map(
              (item, index) => (
                <View
                  key={item.id ?? index}
                  className="mt-5 border-b border-slate-100 pb-4"
                >
                  <View className="flex-row items-center justify-between">
                    <AppText variant="label">
                      {item.symptoms ||
                        'Health concern'}
                    </AppText>

                    <View className="rounded-full bg-amber-100 px-3 py-1">
                      <AppText className="text-amber-800">
                        {item.priorityLevel ||
                          'UNKNOWN'}
                      </AppText>
                    </View>
                  </View>

                  {item.duration ? (
                    <AppText
                      variant="caption"
                      className="mt-2"
                    >
                      Duration: {item.duration}
                    </AppText>
                  ) : null}

                  <AppText
                    variant="caption"
                    className="mt-2"
                  >
                    Status:{' '}
                    {item.status || 'Unknown'}
                  </AppText>

                  {item.summary ? (
                    <AppText
                      variant="body"
                      className="mt-2"
                    >
                      {item.summary}
                    </AppText>
                  ) : null}
                </View>
              ),
            )
        )}
      </BaseCard>

      {/* Recent Visits */}
      <BaseCard>
        <AppText variant="title">
          Recent Visits
        </AppText>

        {visits.length === 0 ? (
          <AppText
            variant="caption"
            className="mt-4"
          >
            No visits recorded yet.
          </AppText>
        ) : (
          visits.map(
            (visit, index) => (
              <View
                key={visit.id ?? index}
                className="mt-5"
              >
                <AppText variant="label">
                  {visit.visitedAt
                    ? new Date(
                        visit.visitedAt,
                      ).toLocaleDateString()
                    : 'Visit'}
                </AppText>

                <AppText
                  variant="body"
                  className="mt-2"
                >
                  {visit.symptoms || 'Health visit'}
                </AppText>

                {visit.temperature != null ? (
                  <AppText
                    variant="caption"
                    className="mt-1"
                  >
                    Temperature:{' '}
                    {visit.temperature}°F
                  </AppText>
                ) : null}

                {visit.condition ? (
                  <AppText
                    variant="caption"
                    className="mt-1"
                  >
                    Condition:{' '}
                    {visit.condition}
                  </AppText>
                ) : null}

                {visit.notes ? (
                  <AppText
                    variant="caption"
                    className="mt-1"
                  >
                    Notes: {visit.notes}
                  </AppText>
                ) : null}
              </View>
            ),
          )
        )}
      </BaseCard>

      {/* Referrals */}
      <BaseCard>
        <AppText variant="title">
          Referrals
        </AppText>

        {referrals.length === 0 ? (
          <AppText
            variant="caption"
            className="mt-4"
          >
            No referrals found.
          </AppText>
        ) : (
          referrals.map(
            (referral, index) => (
              <View
                key={referral.id ?? index}
                className="mt-5"
              >
                <AppText variant="label">
                  Referral #
                  {referral.id ?? index + 1}
                </AppText>

                <AppText
                  variant="body"
                  className="mt-2"
                >
                  {referral.reason ||
                    'Facility referral'}
                </AppText>

                <AppText
                  variant="caption"
                  className="mt-1"
                >
                  Status:{' '}
                  {referral.status || 'Unknown'}
                </AppText>
              </View>
            ),
          )
        )}
      </BaseCard>
    </Screen>
  );
}
