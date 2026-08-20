export const colors = {
  primary: '#2F7D6D',
  primaryLight: '#E8F5F1',
  background: '#F8FAF9',
  surface: '#FFFFFF',
  textPrimary: '#1F2937',
  textSecondary: '#6B7280',
  border: '#E5E7EB',
  success: '#3A9D70',
  warning: '#E9A23B',
  danger: '#D9534F',
} as const;

export type ColorKey = keyof typeof colors;
