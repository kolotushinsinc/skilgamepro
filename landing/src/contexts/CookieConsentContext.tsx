// src/contexts/CookieConsentContext.tsx
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Интерфейсы для типов
interface CookiePreferences {
  functional: boolean;
  analytical: boolean;
  marketing: boolean;
}

interface CookieConsentContextType {
  hasConsent: boolean;
  showBanner: boolean;
  preferences: CookiePreferences;
  acceptAll: () => void;
  rejectAll: () => void;
  savePreferences: (prefs: CookiePreferences) => void;
  resetConsent: () => void;
}

// Создание контекста с начальным значением undefined
const CookieConsentContext = createContext<CookieConsentContextType | undefined>(undefined);

interface CookieConsentProviderProps {
  children: ReactNode;
}

// --- Вспомогательные функции для работы с Cookies ---

const setCookie = (name: string, value: string, days: number) => {
  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
  // Используем SameSite=Lax и Secure для лучшей безопасности и соответствия стандартам браузеров
  document.cookie = `${name}=${encodeURIComponent(value)};expires=${expires.toUTCString()};path=/;SameSite=Lax;Secure`;
};

const getCookie = (name: string): string | undefined => {
  // Этот код будет работать только в браузере
  if (typeof document === 'undefined') {
    return undefined;
  }
  const nameEQ = `${name}=`;
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return decodeURIComponent(c.substring(nameEQ.length, c.length));
  }
  return undefined;
};

const removeCookie = (name: string) => {
  // Удаляем куку, устанавливая дату истечения в прошлом
  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;SameSite=Lax;Secure`;
};


// --- Провайдер Контекста ---

export const CookieConsentProvider: React.FC<CookieConsentProviderProps> = ({ children }) => {
  const [hasConsent, setHasConsent] = useState<boolean>(false);
  const [showBanner, setShowBanner] = useState<boolean>(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    functional: true, // Функциональные куки всегда обязательны
    analytical: false,
    marketing: false,
  });

  useEffect(() => {
    const consentCookie = getCookie('cookieConsent');
    const preferencesCookie = getCookie('cookiePreferences');

    if (consentCookie === 'true' && preferencesCookie) {
      try {
        const parsedPreferences: CookiePreferences = JSON.parse(preferencesCookie);
        setHasConsent(true);
        setPreferences(parsedPreferences);
        setShowBanner(false);
      } catch (e) {
        // Если данные в куках повреждены, сбрасываем состояние
        console.error("Failed to parse cookie preferences:", e);
        setShowBanner(true);
      }
    } else {
      // Если согласия нет, показываем баннер
      setShowBanner(true);
    }
  }, []);

  const handleConsentUpdate = (newPreferences: CookiePreferences) => {
    setPreferences(newPreferences);
    setHasConsent(true);
    setShowBanner(false);
    // Сохраняем согласие и настройки в куки на 1 год (365 дней)
    setCookie('cookieConsent', 'true', 365);
    setCookie('cookiePreferences', JSON.stringify(newPreferences), 365);
  };

  const acceptAll = () => {
    handleConsentUpdate({
      functional: true,
      analytical: true,
      marketing: true,
    });
  };

  const rejectAll = () => {
    handleConsentUpdate({
      functional: true, // Функциональные всегда остаются
      analytical: false,
      marketing: false,
    });
  };

  const savePreferences = (prefs: CookiePreferences) => {
    handleConsentUpdate({
      ...prefs,
      functional: true, // Убеждаемся, что функциональные всегда включены
    });
  };

  const resetConsent = () => {
    // Удаляем куки
    removeCookie('cookieConsent');
    removeCookie('cookiePreferences');

    // Сбрасываем состояние в начальное
    setHasConsent(false);
    setShowBanner(true);
    setPreferences({
      functional: true,
      analytical: false,
      marketing: false,
    });
  };

  return (
    <CookieConsentContext.Provider
      value={{
        hasConsent,
        showBanner,
        preferences,
        acceptAll,
        rejectAll,
        savePreferences,
        resetConsent,
      }}
    >
      {children}
    </CookieConsentContext.Provider>
  );
};

// Хук для удобного использования контекста
export const useCookieConsent = (): CookieConsentContextType => {
  const context = useContext(CookieConsentContext);
  if (context === undefined) {
    throw new Error('useCookieConsent must be used within a CookieConsentProvider');
  }
  return context;
};