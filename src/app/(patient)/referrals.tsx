import { useEffect, useState } from 'react';
import { View } from 'react-native';

import { AppText } from '@/components/ui/AppText';
import { BaseCard } from '@/components/ui/BaseCard';
import { Screen } from '@/components/ui/Screen';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { referralsApi, type Referral } from '@/services/api/referrals.api';
import { useAuthStore } from '@/stores/authStore';

export default function Referrals() {
  const user = useAuthStore((s) => s.user);

  const [referrals, setReferrals] = useState<Referral[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadReferrals = async () => {
      if (!user?.patientId) {
        setError('Patient information not available.');
        setLoading(false);
        return;
      }

      try {
        const response = await referralsApi.getAll();

        const patientReferrals = response.data.filter(
          (referral) => referral.patientId === user.patientId,
        );

        setReferrals(patientReferrals);
      } catch (err: any) {
        console.log('REFERRALS ERROR:', err?.message);
        setError(
          err?.message ?? 'Unable to load referrals.',
        );
      } finally {
        setLoading(false);
      }
    };

    loadReferrals();
  }, [user?.patientId]);

  return (
    <Screen
      scrollable
      header={
        <ScreenHeader
          contextLabel="Citizen Portal"
          title="My Referrals"
        />
      }
    >
      <AppText variant="caption">
        View your referrals to healthcare facilities.
      </AppText>

      {loading ? (
        <BaseCard className="mt-4">
          <AppText variant="body">
            Loading referrals...
          </AppText>
        </BaseCard>
      ) : error ? (
        <BaseCard className="mt-4">
          <AppText variant="body">
            {error}
          </AppText>
        </BaseCard>
      ) : referrals.length === 0 ? (
        <BaseCard className="mt-4">
          <AppText variant="title">
            No Referrals
          </AppText>

          <AppText variant="caption" className="mt-2">
            You currently have no healthcare referrals.
          </AppText>
        </BaseCard>
      ) : (
        referrals.map((referral) => (
          <BaseCard
            key={referral.id}
            className="mt-4"
          >
            <View className="flex-row items-start justify-between">
              <View className="flex-1">
                <AppText variant="title">
                  Referral #{referral.id}
                </AppText>

                <AppText
                  variant="caption"
                  className="mt-2"
                >
                  Facility ID: {referral.facilityId}
                </AppText>

                <AppText
                  variant="body"
                  className="mt-3"
                >
                  {referral.reason}
                </AppText>
              </View>

              <View
                className={`rounded-full px-3 py-2 ${
                  referral.status === 'COMPLETED'
                    ? 'bg-green-100'
                    : referral.status === 'ACCEPTED'
                      ? 'bg-blue-100'
                      : 'bg-amber-100'
                }`}
              >
                <AppText
                  className={
                    referral.status === 'COMPLETED'
                      ? 'text-green-800'
                      : referral.status === 'ACCEPTED'
                        ? 'text-blue-800'
                        : 'text-amber-800'
                  }
                >
                  {referral.status}
                </AppText>
              </View>
            </View>

            {referral.createdAt ? (
              <AppText
                variant="caption"
                className="mt-4"
              >
                Created:{' '}
                {new Date(
                  referral.createdAt,
                ).toLocaleDateString()}
              </AppText>
            ) : null}
          </BaseCard>
        ))
      )}
    </Screen>
  );
}