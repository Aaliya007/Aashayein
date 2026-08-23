import {
  RecordingPresets,
  requestRecordingPermissionsAsync,
  setAudioModeAsync,
  useAudioRecorder,
} from 'expo-audio';
import { useEffect, useState } from 'react';
import { Pressable, View } from 'react-native';

import { AppButton } from '@/components/ui/AppButton';
import { AppText } from '@/components/ui/AppText';
import { BaseCard } from '@/components/ui/BaseCard';
import { Screen } from '@/components/ui/Screen';
import { ScreenHeader } from '@/components/ui/ScreenHeader';

export default function VoiceRequest() {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingUri, setRecordingUri] = useState<string | null>(null);

  const recorder = useAudioRecorder(RecordingPresets.HIGH_QUALITY);

  useEffect(() => {
    const setupAudio = async () => {
      await setAudioModeAsync({
        allowsRecording: true,
        playsInSilentMode: true,
      });
    };

    setupAudio();
  }, []);

  const startRecording = async () => {
    const permission = await requestRecordingPermissionsAsync();

    if (!permission.granted) {
      return;
    }

    await recorder.prepareToRecordAsync();
    recorder.record();

    setIsRecording(true);
    setRecordingUri(null);
  };

  const stopRecording = async () => {
    await recorder.stop();

    setIsRecording(false);
    setRecordingUri(recorder.uri);
  };

  const handleVoiceButton = async () => {
    if (isRecording) {
      await stopRecording();
    } else {
      await startRecording();
    }
  };

  const handleSubmit = () => {
    console.log('Voice request submitted:', recordingUri);
  };

  return (
    <Screen
      scrollable
      header={
        <ScreenHeader
          contextLabel="Citizen Portal"
          title="Voice Request"
        />
      }
    >
      <AppText variant="title">
        Tell us what you're experiencing
      </AppText>

      <AppText variant="caption" className="mt-2">
        You can speak in your preferred language. Tap the microphone to
        start recording.
      </AppText>

      <BaseCard className="mt-6 items-center py-8">
        <Pressable
          onPress={handleVoiceButton}
          className={`h-28 w-28 items-center justify-center rounded-full ${
            isRecording ? 'bg-rose-100' : 'bg-teal-50'
          }`}
        >
          <AppText className="text-4xl">
            {isRecording ? '⏹️' : '🎤'}
          </AppText>
        </Pressable>

        <AppText variant="title" className="mt-5 text-center">
          {isRecording
            ? 'Recording...'
            : recordingUri
              ? 'Recording complete'
              : 'Tap to start speaking'}
        </AppText>

        <AppText variant="caption" className="mt-2 text-center">
          {isRecording
            ? 'Tap the button again when you are finished.'
            : 'Speak clearly about your health problem.'}
        </AppText>
      </BaseCard>

      {recordingUri ? (
        <BaseCard className="mt-4">
          <AppText variant="title">
            Voice request ready
          </AppText>

          <AppText variant="caption" className="mt-2">
            Your recording is ready to be submitted.
          </AppText>

          <View className="mt-4">
            <AppButton
              title="Submit Voice Request"
              onPress={handleSubmit}
            />
          </View>
        </BaseCard>
      ) : null}
    </Screen>
  );
}