import { AppLanguage } from '@/constants/appContent';
import { create } from 'zustand';

interface AppState {
  language: AppLanguage;
  hasSelectedLanguage: boolean;
  setLanguage: (language: AppLanguage) => void;
}

export const useAppStore = create<AppState>((set) => ({
  language: 'en',
  hasSelectedLanguage: false,
  setLanguage: (language) => set({ language, hasSelectedLanguage: true }),
}));
