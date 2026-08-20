import { AppLanguage } from '@/constants/appContent';
import { User } from '@/types/user';
import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';

interface AppContextValue {
  language: AppLanguage;
  setLanguage: (language: AppLanguage) => void;
  user: User | null;
  setUser: (user: User | null) => void;
  isAuthenticated: boolean;
}

const AppContext = createContext<AppContextValue | undefined>(undefined);

interface AppProviderProps {
  children: ReactNode;
}

export function AppProvider({ children }: AppProviderProps) {
  const [language, setLanguage] = useState<AppLanguage>('en');
  const [user, setUser] = useState<User | null>(null);

  const value = useMemo(
    () => ({
      language,
      setLanguage,
      user,
      setUser,
      isAuthenticated: user !== null,
    }),
    [language, user],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppContext(): AppContextValue {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within AppProvider');
  }
  return context;
}
