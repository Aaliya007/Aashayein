export interface HealthTip {
  id: number;
  title: string;
  message: string;
  category: string;
}

export const mockHealthTips: HealthTip[] = [
  {
    id: 1,
    title: 'Stay Hydrated',
    message: 'Drink at least 8 glasses of water daily to support your body and maintain energy.',
    category: 'wellness',
  },
  {
    id: 2,
    title: 'Regular Check-ups',
    message: 'Schedule routine health check-ups to catch potential issues early.',
    category: 'prevention',
  },
  {
    id: 3,
    title: 'Balanced Nutrition',
    message: 'Include fresh vegetables, whole grains, and protein in your daily meals.',
    category: 'nutrition',
  },
];

export function getDailyHealthTip(): HealthTip {
  const dayIndex = new Date().getDate() % mockHealthTips.length;
  return mockHealthTips[dayIndex];
}
