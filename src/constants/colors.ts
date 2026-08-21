export const colors = {
  canvas: '#F8FAFC',
  surface: '#FFFFFF',
  surfaceSubdued: '#F1F5F9',

  textPrimary: '#0F172A',
  textSecondary: '#475569',
  textMuted: '#94A3B8',

  primary: '#0F766E',
  primaryDark: '#0D9488',
  primaryLight: '#CCFBF1',
  primarySoft: '#F0FDFA',

  secondary: '#0284C7',
  secondaryDark: '#0369A1',
  secondaryLight: '#E0F2FE',
  secondarySoft: '#F0F9FF',

  warning: '#D97706',
  warningLight: '#FEF3C7',

  critical: '#BE123C',
  criticalLight: '#FFE4E6',
  criticalSoft: '#FFF1F2',

  border: '#E2E8F0',
  borderSubtle: '#F1F5F9',
} as const;

export type ColorKey = keyof typeof colors;
