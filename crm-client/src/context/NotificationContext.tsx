import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import type { ReactNode } from 'react';
import { io, Socket } from 'socket.io-client';
import { API_URL } from '../api/index';

interface Message {
  id: string;
  chatId: string;
  content: string;
  sender: {
    id: string;
    name: string;
    type: 'user' | 'admin' | 'guest';
  };
  timestamp: Date;
  isRead: boolean;
}

interface Chat {
  id: string;
  subject: string;
  status: 'active' | 'closed' | 'pending';
  source: 'landing' | 'client';
  userId?: string;
  guestId?: string;
  guestInfo?: {
    id: string;
    name: string;
  };
  userInfo?: {
    id: string;
    name: string;
    email: string;
  };
  assignedAdmin?: string;
  messages: Message[];
  createdAt: Date;
  lastActivity: Date;
  unreadCount?: number;
}

interface Notification {
  id: string;
  type: 'new_message' | 'chat_assigned' | 'chat_closed';
  title: string;
  message: string;
  chatId?: string;
  timestamp: Date;
  isRead: boolean;
}

interface NotificationContextType {
  socket: Socket | null;
  notifications: Notification[];
  unreadChatsCount: number;
  unreadChats: Set<string>;
  newMessages: Message[];
  playNotificationSound: () => void;
  markNotificationAsRead: (notificationId: string) => void;
  markChatAsRead: (chatId: string) => void;
  clearNotifications: () => void;
  clearNewMessagesForChat: (chatId: string) => void;
  isConnected: boolean;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

// Улучшенная функция воспроизведения звука уведомления
const createNotificationSound = async () => {
  try {
    console.log('Attempting to play notification sound...');
    
    // Метод 1: Пытаемся использовать простой звук в формате data URL
    const audio = new Audio();
    audio.volume = 0.5;
    
    // Создаем короткий звуковой сигнал
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    
    // Resume context if suspended (required by browser autoplay policies)
    if (audioContext.state === 'suspended') {
      await audioContext.resume();
    }
    
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    // Создаем приятный двухтональный звук
    oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
    oscillator.frequency.setValueAtTime(600, audioContext.currentTime + 0.1);
    oscillator.frequency.setValueAtTime(800, audioContext.currentTime + 0.2);
    
    gainNode.gain.setValueAtTime(0, audioContext.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.3, audioContext.currentTime + 0.1);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.4);
    
    oscillator.type = 'sine';
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.4);
    
    console.log('Notification sound played successfully');
    
  } catch (error) {
    console.log('Could not play notification sound:', error);
    
    // Fallback: попытка с простым HTML5 Audio
    try {
      const audio = new Audio('data:audio/wav;base64,UklGRl9vT19XQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YU');
      audio.volume = 0.3;
      await audio.play();
      console.log('Fallback audio played');
    } catch (fallbackError) {
      console.log('All notification sound methods failed:', fallbackError);
    }
  }
};

interface NotificationProviderProps {
  children: ReactNode;
}

export const NotificationProvider: React.FC<NotificationProviderProps> = ({ children }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadChats, setUnreadChats] = useState<Set<string>>(new Set());
  const [newMessages, setNewMessages] = useState<Message[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  
  const socketRef = useRef<Socket | null>(null);

  const playNotificationSound = async () => {
    try {
      await createNotificationSound();
    } catch (error) {
      console.log('Could not play notification sound:', error);
    }
  };

  const addNotification = (notification: Omit<Notification, 'id' | 'timestamp' | 'isRead'>) => {
    const newNotification: Notification = {
      ...notification,
      id: `notification-${Date.now()}-${Math.random()}`,
      timestamp: new Date(),
      isRead: false
    };
    
    console.log('Adding notification with sound:', newNotification.title);
    setNotifications(prev => [newNotification, ...prev].slice(0, 100)); // Keep only last 100 notifications
    
    // Воспроизводим звук
    playNotificationSound();
  };

  const markNotificationAsRead = (notificationId: string) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === notificationId ? { ...notif, isRead: true } : notif
      )
    );
  };

  const markChatAsRead = (chatId: string) => {
    setUnreadChats(prev => {
      const newSet = new Set(prev);
      newSet.delete(chatId);
      return newSet;
    });
  };

  const clearNotifications = () => {
    setNotifications([]);
  };

  const clearNewMessagesForChat = (chatId: string) => {
    setNewMessages(prev => prev.filter(msg => msg.chatId !== chatId));
  };

  useEffect(() => {
    const token = localStorage.getItem('crm_token');
    
    if (!token) {
      console.log('No admin token found for notifications');
      return;
    }

    console.log('Initializing global notification socket...');
    
    const newSocket = io(API_URL, {
      auth: { token: `Bearer ${token}` },
      transports: ['websocket']
    });

    newSocket.on('connect', () => {
      console.log('Global notification socket connected');
      setIsConnected(true);
    });

    newSocket.on('disconnect', () => {
      console.log('Global notification socket disconnected');
      setIsConnected(false);
    });

    newSocket.on('chatNotification', (data: any) => {
      console.log('Chat notification received in global context:', data);
      
      addNotification({
        type: 'new_message',
        title: 'New Support Message',
        message: data.message || 'You have a new message',
        chatId: data.chatId
      });

      if (data.chatId) {
        setUnreadChats(prev => new Set([...prev, data.chatId]));
      }
    });

    newSocket.on('newMessage', (data: { chatId: string, message: Message }) => {
      console.log('New message received in global context:', data);
      
      const messageWithDate = {
        ...data.message,
        timestamp: new Date(data.message.timestamp)
      };
      
      setNewMessages(prev => [messageWithDate, ...prev].slice(0, 50)); // Keep only last 50 messages
      
      if (data.message.sender.type !== 'admin') {
        console.log('New message from user/guest, triggering notification with sound');
        setUnreadChats(prev => new Set([...prev, data.chatId]));
        
        addNotification({
          type: 'new_message',
          title: `New message from ${data.message.sender.name}`,
          message: data.message.content.substring(0, 100),
          chatId: data.chatId
        });
      } else {
        console.log('Message from admin, no sound notification');
      }
    });

    newSocket.on('chatClosed', (data: { chatId: string }) => {
      console.log('Chat closed:', data);
      
      addNotification({
        type: 'chat_closed',
        title: 'Chat Closed',
        message: 'A support chat has been closed',
        chatId: data.chatId
      });
    });

    socketRef.current = newSocket;
    setSocket(newSocket);

    return () => {
      console.log('Cleaning up global notification socket');
      newSocket.disconnect();
      setSocket(null);
      setIsConnected(false);
    };
  }, []);

  const value: NotificationContextType = {
    socket,
    notifications,
    unreadChatsCount: unreadChats.size,
    unreadChats,
    newMessages,
    playNotificationSound,
    markNotificationAsRead,
    markChatAsRead,
    clearNotifications,
    clearNewMessagesForChat,
    isConnected
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = (): NotificationContextType => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};