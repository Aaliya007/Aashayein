import { useState } from 'react';
import { Pressable, View } from 'react-native';

import { AppButton } from '@/components/ui/AppButton';
import { AppInput } from '@/components/ui/AppInput';
import { AppText } from '@/components/ui/AppText';
import { BaseCard } from '@/components/ui/BaseCard';
import { Screen } from '@/components/ui/Screen';
import { ScreenHeader } from '@/components/ui/ScreenHeader';

const healthOptions = [
  { label: 'Fever', emoji: '🤒' },
  { label: 'Cough / Cold', emoji: '😷' },
  { label: 'Pain', emoji: '🤕' },
  { label: 'Pregnancy', emoji: '🤰' },
  { label: 'Child Health', emoji: '👶' },
  { label: 'Medicine', emoji: '💊' },
  { label: 'Injury', emoji: '🩹' },
  { label: 'Other', emoji: '❤️' },
];

export default function HealthRequest() {
  const [selectedProblem, setSelectedProblem] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = () => {
    console.log({
      problem: selectedProblem,
      description,
    });
  };

  return (
    <Screen
      scrollable
      header={
        <ScreenHeader
          contextLabel="Citizen Portal"
          title="Health Request"
        />
      }
    >
      <AppText variant="title">
        What do you need help with?
      </AppText>

      <AppText variant="caption" className="mt-2">
        Select the problem that best describes your health concern.
      </AppText>

      <View className="mt-5 flex-row flex-wrap justify-between">
        {healthOptions.map((option) => {
          const selected = selectedProblem === option.label;

          return (
            <Pressable
              key={option.label}
              onPress={() => setSelectedProblem(option.label)}
              className={`mb-3 w-[48%] rounded-2xl border p-4 ${
                selected
                  ? 'border-teal-700 bg-teal-50'
                  : 'border-slate-200 bg-white'
              }`}
            >
              <AppText className="text-2xl">
                {option.emoji}
              </AppText>

              <AppText
                variant="label"
                className="mt-2"
              >
                {option.label}
              </AppText>
            </Pressable>
          );
        })}
      </View>

      <BaseCard className="mt-2">
        <AppText variant="title">
          Describe your problem
        </AppText>

        <AppText variant="caption" className="mt-1">
          Tell us briefly what you are experiencing.
        </AppText>

        <AppInput
          label="Problem description"
          value={description}
          onChangeText={setDescription}
          placeholder="Example: I have fever since yesterday..."
          multiline
        />
      </BaseCard>

      <AppButton
        title="🎤  Add Voice Request"
        variant="outline"
        onPress={() => console.log('Voice request')}
      />

      <View className="mt-3">
        <AppButton
          title="Submit Health Request"
          onPress={handleSubmit}
          disabled={!selectedProblem}
        />
      </View>
    </Screen>
  );
}