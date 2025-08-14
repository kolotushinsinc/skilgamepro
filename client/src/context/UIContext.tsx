import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';

interface UIContextType {
    isSidebarOpen: boolean;
    toggleSidebar: () => void;
    setSidebarOpen: (isOpen: boolean) => void;
    showLogoutModal: boolean;
    setShowLogoutModal: (show: boolean) => void;
}

const UIContext = createContext<UIContextType | undefined>(undefined);

export const UIProvider = ({ children }: { children: ReactNode }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(() => {
        try {
            const item = window.localStorage.getItem('sidebarOpen');
            return item ? JSON.parse(item) : true;
        } catch (error) {
            console.error(error);
            return true;
        }
    });

    const [showLogoutModal, setShowLogoutModal] = useState<boolean>(false);

    useEffect(() => {
        try {
            window.localStorage.setItem('sidebarOpen', JSON.stringify(isSidebarOpen));
        } catch (error) {
            console.error("Failed to save sidebar state:", error);
        }
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
            setShowLogoutModal
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