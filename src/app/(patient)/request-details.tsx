import { AppText } from '@/components/ui/AppText';
import { BaseCard } from '@/components/ui/BaseCard';
import { Screen } from '@/components/ui/Screen';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { healthRequestsApi } from '@/services/api/healthRequests.api';
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';

function formatDate(date?: string) {
  if (!date) return 'Not available';

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return date;
  }

  return parsedDate.toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}

function getPriorityClass(priority?: string) {
  switch (priority) {
    case 'CRITICAL':
      return 'bg-red-100 text-red-800';
    case 'HIGH':
      return 'bg-orange-100 text-orange-800';
    case 'MEDIUM':
      return 'bg-amber-100 text-amber-800';
    default:
      return 'bg-green-100 text-green-800';
  }
}

export default function RequestDetails() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const [request, setRequest] =
    useState<Awaited<
      ReturnType<typeof healthRequestsApi.getById>
    >['data'] | null>(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadRequest = async () => {
      if (!id) {
        setLoading(false);
        setError('Request ID is missing.');
        return;
      }

      try {
        setError('');

        const response = await healthRequestsApi.getById(
          Number(id),
        );

        console.log('REQUEST DETAILS:', response.data);

        setRequest(response.data);
      } catch (error: unknown) {
        console.log('REQUEST DETAILS ERROR:', error);
        setError(error instanceof Error ? error.message : 'Unable to load request details.');
      } finally {
        setLoading(false);
      }
    };

    loadRequest();
  }, [id]);

  if (loading) {
    return (
      <Screen
        scrollable
        header={
          <ScreenHeader
            contextLabel="Citizen Portal"
            title="Request Details"
          />
        }
      >
        <View className="items-center py-12">
          <ActivityIndicator />

          <AppText variant="caption" className="mt-3">
            Loading request details...
          </AppText>
        </View>
      </Screen>
    );
  }

  if (error || !request) {
    return (
      <Screen
        scrollable
        header={
          <ScreenHeader
            contextLabel="Citizen Portal"
            title="Request Details"
          />
        }
      >
        <BaseCard className="mt-4">
          <AppText variant="title">
            Unable to load request
          </AppText>

          <AppText variant="caption" className="mt-2">
            {error || 'Request not found.'}
          </AppText>
        </BaseCard>
      </Screen>
    );
  }

  const symptoms = request.symptoms?.length
    ? request.symptoms.join(', ')
    : 'Not specified';

  const priorityClass = getPriorityClass(
    request.priorityLevel,
  );

  return (
    <Screen
      scrollable
      header={
        <ScreenHeader
          contextLabel="Citizen Portal"
          title="Request Details"
        />
      }
    >
      {/* Request Summary */}
      <BaseCard>
        <View className="flex-row items-center justify-between">
          <View className="flex-1 pr-3">
            <AppText variant="title">
              {symptoms}
            </AppText>

            <AppText variant="caption" className="mt-1">
              Request #{request.id}
            </AppText>
          </View>

          <View className="rounded-full bg-amber-100 px-3 py-2">
            <AppText className="text-amber-800">
              {request.status}
            </AppText>
          </View>
        </View>

        <AppText variant="caption" className="mt-4">
          Health Concern
        </AppText>

        <AppText variant="body" className="mt-1">
          {request.summary || 'No summary available.'}
        </AppText>
      </BaseCard>

      {/* Request Information */}
      <BaseCard>
        <AppText variant="title">
          Request Information
        </AppText>

        <View className="mt-4">
          <AppText variant="caption">
            Request Type
          </AppText>

          <AppText variant="body" className="mt-1">
            {request.inputType === 'VOICE'
              ? 'Voice Request'
              : 'Text Request'}
          </AppText>
        </View>

        <View className="mt-4">
          <AppText variant="caption">
            Language
          </AppText>

          <AppText variant="body" className="mt-1">
            {request.language || 'English'}
          </AppText>
        </View>

        <View className="mt-4">
          <AppText variant="caption">
            Submitted
          </AppText>

          <AppText variant="body" className="mt-1">
            {formatDate(request.createdAt)}
          </AppText>
        </View>

        <View className="mt-4">
          <AppText variant="caption">
            Priority
          </AppText>

          <View
            className={`mt-1 self-start rounded-full px-3 py-2 ${priorityClass.split(' ')[0]}`}
          >
            <AppText>
              {request.priorityLevel || 'Not available'}
            </AppText>
          </View>
        </View>

        <View className="mt-4">
          <AppText variant="caption">
            Case ID
          </AppText>

          <AppText variant="body" className="mt-1">
            {request.caseId
              ? `Case #${request.caseId}`
              : 'Not created yet'}
          </AppText>
        </View>
      </BaseCard>

      {/* AI Evaluation */}
      <BaseCard>
        <AppText variant="title">
          AI Health Assessment
        </AppText>

        <View className="mt-4">
          <AppText variant="caption">
            Summary
          </AppText>

          <AppText variant="body" className="mt-1">
            {request.summary || 'No summary available.'}
          </AppText>
        </View>

        <View className="mt-4">
          <AppText variant="caption">
            Evaluation
          </AppText>

          <AppText variant="body" className="mt-1">
            {request.evaluation ||
              'No evaluation available.'}
          </AppText>
        </View>

        {request.confidence !== undefined ? (
          <View className="mt-4">
            <AppText variant="caption">
              AI Confidence
            </AppText>

            <AppText variant="body" className="mt-1">
              {Math.round(request.confidence * 100)}%
            </AppText>
          </View>
        ) : null}
      </BaseCard>

      {/* Red Flags */}
      <BaseCard>
        <AppText variant="title">
          Warning Signs
        </AppText>

        {request.redFlags?.length ? (
          request.redFlags.map((flag, index) => (
            <AppText
              key={`${flag}-${index}`}
              variant="body"
              className="mt-3"
            >
              ⚠️ {flag}
            </AppText>
          ))
        ) : (
          <AppText variant="body" className="mt-3">
            No warning signs identified.
          </AppText>
        )}
      </BaseCard>

      {/* Status */}
      <BaseCard>
        <AppText variant="title">
          Request Status
        </AppText>

        <AppText variant="body" className="mt-3">
          Your request is currently{' '}
          <AppText variant="label">
            {request.status}
          </AppText>
          .
        </AppText>

        {request.status === 'COMPLETED' ? (
          <AppText variant="caption" className="mt-2">
            Your health request has been processed successfully.
          </AppText>
        ) : null}
      </BaseCard>
    </Screen>
  );
}
