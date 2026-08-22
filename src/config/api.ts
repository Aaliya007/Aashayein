/**
 * Central API configuration. Components must import this instead of hard-coding URLs.
 * Expo inlines EXPO_PUBLIC_* via static process.env.EXPO_PUBLIC_API_BASE_URL access.
 */
export const API_BASE_URL =
  process.env.EXPO_PUBLIC_API_BASE_URL ?? 'https://aashayen-backend.onrender.com';
