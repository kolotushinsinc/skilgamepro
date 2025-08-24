import React, { createContext, useReducer, useContext, ReactNode, useCallback, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../api/index';

// Типы
interface User {
  _id: string;
  username: string;
  email: string;
  balance: number;
  avatar: string;
  role: string;
  kycRejectionReason: ReactNode;
  kycStatus: any;
}

interface AuthState {
  token: string | null;
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  sessionExpired: boolean;
}

interface AuthContextType extends AuthState {
  login: (data: { token: string; user: User }) => void;
  logout: (showMessage?: boolean) => void;
  refreshUser: () => Promise<void>;
  clearSessionExpired: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

type AuthAction =
  | { type: 'LOGIN_SUCCESS'; payload: { token: string; user: User } }
  | { type: 'USER_UPDATED'; payload: { user: User } }
  | { type: 'LOGOUT'; payload?: { sessionExpired?: boolean } }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'CLEAR_SESSION_EXPIRED' };

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      localStorage.setItem('token', action.payload.token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${action.payload.token}`;
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        token: action.payload.token,
        user: action.payload.user,
        sessionExpired: false,
      };
    case 'USER_UPDATED':
        return {
            ...state,
            isAuthenticated: true,
            loading: false,
            user: action.payload.user,
            sessionExpired: false,
        };
    case 'LOGOUT':
      localStorage.removeItem('token');
      delete axios.defaults.headers.common['Authorization'];
      return {
        token: null,
        user: null,
        isAuthenticated: false,
        loading: false,
        sessionExpired: action.payload?.sessionExpired || false
      };
    case 'SET_LOADING':
        return { ...state, loading: action.payload };
    case 'CLEAR_SESSION_EXPIRED':
        return { ...state, sessionExpired: false };
    default:
      return state;
  }
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    token: localStorage.getItem('token'),
    isAuthenticated: false,
    loading: true,
    sessionExpired: false,
  });

  const refreshUser = useCallback(async () => {
    const token = localStorage.getItem('token');
    if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        try {
            console.log('Requesting fresh profile data...');
            const { data } = await axios.get(`${API_URL}/api/users/profile`);
            dispatch({ type: 'USER_UPDATED', payload: { user: data } });
            console.log('Profile data updated successfully!', data);
        } catch (err: any) {
            console.error("Error updating profile, log out.", err);
            // Check if it's a session expiry
            if (err.response?.data?.code === 'SESSION_EXPIRED') {
                dispatch({ type: 'LOGOUT', payload: { sessionExpired: true } });
            } else {
                dispatch({ type: 'LOGOUT' });
            }
        }
    } else {
        dispatch({ type: 'LOGOUT' });
    }
  }, []);

  const login = useCallback((data: { token: string; user: User }) => {
    dispatch({ type: 'LOGIN_SUCCESS', payload: data });
  }, []);

  const logout = useCallback((showMessage: boolean = false) => {
    dispatch({ type: 'LOGOUT', payload: { sessionExpired: showMessage } });
  }, []);

  const clearSessionExpired = useCallback(() => {
    dispatch({ type: 'CLEAR_SESSION_EXPIRED' });
  }, []);

  // Set up axios interceptor for handling session expiry
  useEffect(() => {
    const interceptor = axios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.data?.code === 'SESSION_EXPIRED') {
          console.log('Session expired detected, logging out...');
          dispatch({ type: 'LOGOUT', payload: { sessionExpired: true } });
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axios.interceptors.response.eject(interceptor);
    };
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, login, logout, refreshUser, clearSessionExpired }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};