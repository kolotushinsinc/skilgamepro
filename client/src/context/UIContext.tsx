import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';

interface UIContextType {
    isSidebarOpen: boolean;
    toggleSidebar: () => void;
    setSidebarOpen: (isOpen: boolean) => void;
    showLogoutModal: boolean;
    setShowLogoutModal: (show: boolean) => void;
    showDepositModal: boolean;
    setShowDepositModal: (show: boolean) => void;
    showInsufficientFundsModal: boolean;
    setShowInsufficientFundsModal: (show: boolean) => void;
    insufficientFundsData: { requiredAmount: number; currentBalance: number } | null;
    setInsufficientFundsData: (data: { requiredAmount: number; currentBalance: number } | null) => void;
}

const UIContext = createContext<UIContextType | undefined>(undefined);

export const UIProvider = ({ children }: { children: ReactNode }) => {
    // Инициализируем состояние с учетом localStorage и размера экрана
    const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(() => {
        if (typeof window === 'undefined') return false;
        
        const isMobile = window.innerWidth < 1024;
        
        if (isMobile) {
            // Мобильные: принудительно закрыто
            return false;
        } else {
            // Десктоп: загружаем из localStorage или открываем по умолчанию
            try {
                const saved = window.localStorage.getItem('sidebarOpen');
                return saved ? JSON.parse(saved) : true;
            } catch {
                return true;
            }
        }
    });

    const [showLogoutModal, setShowLogoutModal] = useState<boolean>(false);
    const [showDepositModal, setShowDepositModal] = useState<boolean>(false);
    const [showInsufficientFundsModal, setShowInsufficientFundsModal] = useState<boolean>(false);
    const [insufficientFundsData, setInsufficientFundsData] = useState<{ requiredAmount: number; currentBalance: number } | null>(null);

    // Убираем инициализацию из useEffect, так как теперь это делается в useState

    useEffect(() => {
        const isMobile = window.innerWidth < 1024;
        
        if (!isMobile) {
            // Сохраняем состояние только для десктопа
            try {
                window.localStorage.setItem('sidebarOpen', JSON.stringify(isSidebarOpen));
            } catch (error) {
                console.error("Failed to save sidebar state:", error);
            }
        }
    }, [isSidebarOpen]);

    // Закрываем при переходе на мобильное разрешение
    useEffect(() => {
        const handleResize = () => {
            const isMobile = window.innerWidth < 1024;
            if (isMobile && isSidebarOpen) {
                setIsSidebarOpen(false);
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [isSidebarOpen]);
    
    const toggleSidebar = useCallback(() => {
        setIsSidebarOpen(prev => !prev);
    }, []);

    const setSidebarOpen = useCallback((isOpen: boolean) => {
        setIsSidebarOpen(isOpen);
    }, []);

    return (
        <UIContext.Provider value={{
            isSidebarOpen,
            toggleSidebar,
            setSidebarOpen,
            showLogoutModal,
            setShowLogoutModal,
            showDepositModal,
            setShowDepositModal,
            showInsufficientFundsModal,
            setShowInsufficientFundsModal,
            insufficientFundsData,
            setInsufficientFundsData
        }}>
            {children}
        </UIContext.Provider>
    );
};

export const useUI = () => {
    const context = useContext(UIContext);
    if (!context) throw new Error('useUI must be used within a UIProvider');
    return context;
};