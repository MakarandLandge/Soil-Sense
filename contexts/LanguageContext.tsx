import React, { createContext, useContext, useState, ReactNode } from 'react';
import { getTranslation, formatTranslation, Translation } from '@/utils/translations';

interface LanguageContextType {
  currentLanguage: string;
  setLanguage: (language: string) => void;
  t: (key: keyof Translation) => string;
  tf: (key: keyof Translation, params?: Record<string, string>) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
  children: ReactNode;
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  const [currentLanguage, setCurrentLanguage] = useState('en');

  const setLanguage = (language: string) => {
    setCurrentLanguage(language);
  };

  const t = (key: keyof Translation): string => {
    return getTranslation(key, currentLanguage);
  };

  const tf = (key: keyof Translation, params: Record<string, string> = {}): string => {
    return formatTranslation(key, currentLanguage, params);
  };

  return (
    <LanguageContext.Provider value={{
      currentLanguage,
      setLanguage,
      t,
      tf,
    }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextType {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}