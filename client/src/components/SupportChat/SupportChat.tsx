import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, Minimize2 } from 'lucide-react';
import { useSocket } from '../../context/SocketContext';
import { useAuth } from '../../context/AuthContext';
import { API_URL } from '../../api/index';

interface Message {
  id: string;
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
  messages: Message[];
  status: 'active' | 'closed' | 'pending';
}

const SupportChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [chatId, setChatId] = useState<string | null>(null);
  const [isTyping, setIsTyping] = useState(false);
  const [adminTyping, setAdminTyping] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  const { socket } = useSocket();
  const { user } = useAuth();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const playNotificationSound = () => {
    try {
      if (!audioRef.current) {
        // Создаем простой звук уведомления
        const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
        oscillator.frequency.setValueAtTime(600, audioContext.currentTime + 0.1);
        
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.3);
      }
    } catch (error) {
      console.log('Sound notification not available:', error);
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (!socket || !user) return;

    // Restore existing support chat if available
    const savedChatId = localStorage.getItem('activeChatId');
    if (savedChatId && savedChatId !== 'null' && savedChatId !== 'undefined') {
      console.log('Restoring saved chat:', savedChatId);
      setChatId(savedChatId);
      loadChatHistory(savedChatId);
    } else {
      // Clear invalid chatId
      localStorage.removeItem('activeChatId');
      setChatId(null);
    }

    console.log('Setting up SUPPORT chat socket listeners for authenticated user:', user._id);

    // Listen for SUPPORT chat events ONLY (for authenticated users in client)
    socket.on('supportChatJoined', (data: { chatId: string, chat?: Chat | null }) => {
      try {
        console.log('Client: supportChatJoined event received:', data);
        const { chatId: joinedChatId, chat } = data;
        if (joinedChatId && joinedChatId !== 'null' && joinedChatId !== 'undefined') {
          setChatId(joinedChatId);
          localStorage.setItem('activeChatId', joinedChatId);
        }
        if (chat && chat.messages && Array.isArray(chat.messages)) {
          setMessages(chat.messages.map(msg => ({
            ...msg,
            timestamp: new Date(msg.timestamp)
          })));
        }
      } catch (error) {
        console.error('Error handling supportChatJoined:', error);
      }
    });

    socket.on('supportNewMessage', (data: { chatId: string, message?: Message | null }) => {
      try {
        console.log('Client: supportNewMessage event received:', data);
        const { message } = data;
        if (message && message.content) {
          // Remove any optimistic messages with same content
          setMessages(prev => {
            const filtered = prev.filter(msg => 
              !(msg.id.startsWith('temp-') && msg.content === message.content)
            );
            return [...filtered, {
              ...message,
              timestamp: new Date(message.timestamp)
            }];
          });
          
          // Play sound for admin messages
          if (message.sender.type === 'admin') {
            console.log('Playing sound for admin message');
            playNotificationSound();
          }
          
          // Increment unread count if chat is closed or minimized
          if (!isOpen || isMinimized) {
            setUnreadCount(prev => prev + 1);
          }
        }
      } catch (error) {
        console.error('Error handling supportNewMessage:', error);
      }
    });

    socket.on('supportUserTyping', (data: { userId: string, isTyping: boolean }) => {
      try {
        const { userId, isTyping: typing } = data;
        if (userId && userId !== user._id) {
          setAdminTyping(typing);
        }
      } catch (error) {
        console.error('Error handling supportUserTyping:', error);
      }
    });

    socket.on('supportChatClosed', () => {
      setMessages(prev => [...prev, {
        id: `system-${Date.now()}`,
        content: 'Chat has been closed by support. Thank you for contacting us!',
        sender: { id: 'system', name: 'System', type: 'admin' },
        timestamp: new Date(),
        isRead: true
      }]);
    });

    return () => {
      socket.off('supportChatJoined');
      socket.off('supportNewMessage');
      socket.off('supportUserTyping');
      socket.off('supportChatClosed');
    };
  }, [socket, user, isOpen, isMinimized]);

  const createChat = async () => {
    if (!newMessage.trim() || !user) return;

    try {
      const response = await fetch(`${API_URL}/api/chat/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          source: 'client',
          subject: 'Support Request',
          initialMessage: newMessage.trim(),
          userInfo: {
            id: user._id,
            name: user.username,
            email: user.email
          }
        }),
      });

      const data = await response.json();
      
      if (data.success && data.chat && data.chat.id && data.chat.id !== 'null') {
        console.log('Chat created successfully:', data.chat.id);
        setChatId(data.chat.id);
        localStorage.setItem('activeChatId', data.chat.id);
        
        if (data.chat.messages && Array.isArray(data.chat.messages)) {
          setMessages(data.chat.messages.map((msg: any) => ({
            ...msg,
            timestamp: new Date(msg.timestamp)
          })));
        }
        setNewMessage('');
        
        // Join the support chat room via socket
        if (socket) {
          socket.emit('joinSupportChat', { userId: user._id });
        }
      }
    } catch (error) {
      console.error('Error creating chat:', error);
    }
  };

  const sendMessage = async () => {
    if (!newMessage.trim() || !chatId || !user) return;

    const messageContent = newMessage.trim();
    setNewMessage('');
    setIsTyping(false);

    try {
      // Try socket first for authenticated users
      if (socket) {
        // Add optimistic UI update for socket messages
        const optimisticMessage = {
          id: `temp-${Date.now()}`,
          content: messageContent,
          sender: {
            id: user._id,
            name: user.username || 'You',
            type: 'user' as const
          },
          timestamp: new Date(),
          isRead: false
        };
        
        // Add message immediately to UI
        setMessages(prev => [...prev, optimisticMessage]);
        
        console.log('Client: Sending message via socket:', { chatId, content: messageContent });
        socket.emit('sendSupportMessage', {
          chatId,
          content: messageContent
        });
        
        // Ensure we're joined to the support chat
        console.log('Client: Ensuring joined to support chat:', user._id);
        socket.emit('joinSupportChat', { userId: user._id });
        
        // Wait a bit and if socket message didn't arrive, try API fallback
        setTimeout(async () => {
          const currentMessageCount = messages.length;
          setTimeout(async () => {
            // Check if optimistic message still exists (means real message didn't arrive)
            const stillHasOptimistic = messages.some(msg => msg.id === optimisticMessage.id);
            if (stillHasOptimistic) {
              console.log('Socket message failed, trying API fallback');
              // Remove optimistic message and try API
              setMessages(prev => prev.filter(msg => msg.id !== optimisticMessage.id));
              await sendMessageViaAPI(messageContent, chatId);
            }
          }, 3000);
        }, 100);
      } else {
        // No socket available, use API directly
        await sendMessageViaAPI(messageContent, chatId);
      }
    } catch (error) {
      console.error('Error sending message:', error);
      // Restore message on error
      setNewMessage(messageContent);
    }
  };

  const sendMessageViaAPI = async (message: string, currentChatId: string) => {
    if (!message.trim() || !currentChatId || currentChatId === 'null' || currentChatId === 'undefined' || !user) {
      console.log('Invalid parameters for sendMessageViaAPI:', { message: !!message, currentChatId, user: !!user });
      return;
    }

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No authentication token found');
      }

      console.log('Sending message via API to chat:', currentChatId);
      const response = await fetch(`${API_URL}/api/chat/${currentChatId}/message`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          content: message
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.success && data.message) {
        // Add message to local state
        setMessages(prev => [...prev, {
          ...data.message,
          timestamp: new Date(data.message.timestamp)
        }]);
      } else {
        throw new Error(data.message || 'Failed to send message');
      }
    } catch (error) {
      console.error('Error sending message via API:', error);
      throw error;
    }
  };

  const loadChatHistory = async (chatId: string) => {
    if (!user || !chatId || chatId === 'null' || chatId === 'undefined') {
      console.log('Invalid chatId for loading history:', chatId);
      return;
    }

    try {
      console.log('Loading chat history for:', chatId);
      const response = await fetch(`${API_URL}/api/chat/${chatId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        if (data.success && data.chat && data.chat.messages) {
          setMessages(data.chat.messages.map((msg: any) => ({
            ...msg,
            timestamp: new Date(msg.timestamp)
          })));
          
          // Auto-join support chat via socket if available
          if (socket) {
            socket.emit('joinSupportChat', { userId: user._id });
          }
        }
      }
    } catch (error) {
      console.error('Error loading chat history:', error);
    }
  };

  const handleTyping = (value: string) => {
    setNewMessage(value);
    
    if (!chatId || chatId === 'null' || chatId === 'undefined' || !socket || !user) return;

    if (!isTyping) {
      setIsTyping(true);
      socket.emit('supportChatTyping', { chatId, isTyping: true });
    }

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    typingTimeoutRef.current = setTimeout(() => {
      setIsTyping(false);
      if (socket) {
        socket.emit('supportChatTyping', { chatId, isTyping: false });
      }
    }, 1000);
  };

  const openChat = () => {
    setIsOpen(true);
    setIsMinimized(false);
    setUnreadCount(0);
    
    // Load chat history if we have a valid chatId but no messages
    if (chatId && chatId !== 'null' && chatId !== 'undefined' && messages.length === 0) {
      loadChatHistory(chatId);
    }
    
    // Join support chat if socket is available
    if (socket && user) {
      console.log('Client: Opening chat and joining support chat for user:', user._id);
      socket.emit('joinSupportChat', { userId: user._id });
    }
  };

  const minimizeChat = () => {
    setIsMinimized(true);
    setUnreadCount(0);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Only show chat for authenticated users
  if (!user) {
    return null;
  }

  console.log('SupportChat rendering:', { isOpen, user: !!user, socket: !!socket });

  if (!isOpen) {
    return (
      <div
        className="fixed bottom-4 right-4 z-[9999]"
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          zIndex: 99999,
          width: '64px',
          height: '64px'
        }}
      >
        <button
          onClick={openChat}
          style={{
            position: 'absolute',
            top: '0',
            left: '0',
            width: '100%',
            height: '100%',
            backgroundColor: '#2563eb',
            color: 'white',
            border: 'none',
            borderRadius: '50%',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '24px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
          }}
        >
          💬
          {unreadCount > 0 && (
            <div style={{
              position: 'absolute',
              top: '-8px',
              right: '-8px',
              backgroundColor: '#ef4444',
              color: 'white',
              fontSize: '12px',
              borderRadius: '50%',
              width: '24px',
              height: '24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              {unreadCount > 9 ? '9+' : unreadCount}
            </div>
          )}
        </button>
      </div>
    );
  }

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        zIndex: 99999,
        backgroundColor: 'white',
        border: '2px solid #ccc',
        borderRadius: '8px',
        width: '384px',
        height: isMinimized ? '64px' : '500px',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.2)'
      }}
    >
      {/* Header */}
      <div style={{
        backgroundColor: '#2563eb',
        color: 'white',
        padding: '12px',
        borderRadius: '8px 8px 0 0',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span>💬</span>
          <span style={{ fontWeight: 'bold' }}>Support Chat</span>
          {socket && (
            <div style={{
              width: '8px',
              height: '8px',
              backgroundColor: '#4ade80',
              borderRadius: '50%'
            }}></div>
          )}
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={minimizeChat}
            style={{
              background: 'none',
              border: 'none',
              color: 'white',
              cursor: 'pointer',
              padding: '4px'
            }}
          >
            ➖
          </button>
          <button
            onClick={() => setIsOpen(false)}
            style={{
              background: 'none',
              border: 'none',
              color: 'white',
              cursor: 'pointer',
              padding: '4px'
            }}
          >
            ❌
          </button>
        </div>
      </div>

      {!isMinimized && (
        <div style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          height: 'calc(100% - 64px)'
        }}>
          {/* User Info */}
          <div style={{
            padding: '12px',
            borderBottom: '1px solid #ccc',
            backgroundColor: '#f9fafb',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <div style={{
              width: '32px',
              height: '32px',
              backgroundColor: '#2563eb',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '14px',
              fontWeight: 'bold'
            }}>
              {user.username ? user.username.charAt(0).toUpperCase() : 'U'}
            </div>
            <div>
              <p style={{ fontWeight: 'bold', fontSize: '14px', margin: 0 }}>
                {user.username || 'User'}
              </p>
              <p style={{ fontSize: '12px', color: '#6b7280', margin: 0 }}>
                {user.email || ''}
              </p>
            </div>
          </div>

          {/* Messages */}
          <div style={{
            flex: 1,
            overflowY: 'auto',
            padding: '12px'
          }}>
            {messages.length === 0 && (
              <div style={{
                textAlign: 'center',
                color: '#6b7280',
                fontSize: '14px',
                padding: '32px 0'
              }}>
                <div style={{ fontSize: '32px', marginBottom: '8px' }}>💬</div>
                <p>Welcome! How can we help you today?</p>
              </div>
            )}

            {messages.map((message) => (
              <div
                key={message.id}
                style={{
                  display: 'flex',
                  justifyContent: message.sender.type === 'user' ? 'flex-end' : 'flex-start',
                  marginBottom: '12px'
                }}
              >
                <div
                  style={{
                    maxWidth: '80%',
                    padding: '12px',
                    borderRadius: '8px',
                    fontSize: '14px',
                    backgroundColor: message.sender.type === 'user'
                      ? '#2563eb'
                      : message.sender.type === 'admin'
                      ? '#dcfce7'
                      : '#f3f4f6',
                    color: message.sender.type === 'user'
                      ? 'white'
                      : message.sender.type === 'admin'
                      ? '#166534'
                      : '#374151'
                  }}
                >
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    marginBottom: '4px'
                  }}>
                    <span style={{ fontWeight: 'bold', fontSize: '12px' }}>
                      {message.sender.name}
                      {message.sender.type === 'admin' && ' (Support)'}
                    </span>
                    <span style={{ fontSize: '12px', opacity: 0.7 }}>
                      {formatTime(message.timestamp)}
                    </span>
                  </div>
                  <p style={{ margin: 0 }}>{message.content}</p>
                </div>
              </div>
            ))}

            {adminTyping && (
              <div style={{ display: 'flex', justifyContent: 'flex-start', marginBottom: '12px' }}>
                <div style={{
                  backgroundColor: '#f3f4f6',
                  color: '#374151',
                  padding: '12px',
                  borderRadius: '8px',
                  fontSize: '14px'
                }}>
                  <span>Support is typing...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div style={{
            padding: '12px',
            borderTop: '1px solid #ccc',
            backgroundColor: '#f9fafb'
          }}>
            <div style={{ display: 'flex', gap: '8px' }}>
              <input
                type="text"
                value={newMessage}
                onChange={(e) => handleTyping(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (chatId ? sendMessage() : createChat())}
                placeholder="Type your message..."
                style={{
                  flex: 1,
                  padding: '12px',
                  border: '1px solid #ccc',
                  borderRadius: '8px',
                  fontSize: '14px'
                }}
              />
              <button
                onClick={chatId ? sendMessage : createChat}
                disabled={!newMessage.trim() || (!socket && !!user)}
                style={{
                  padding: '12px',
                  backgroundColor: '#2563eb',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  minWidth: '48px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                ➤
              </button>
            </div>
            {!socket && user && (
              <p style={{ fontSize: '12px', color: '#ef4444', marginTop: '8px', margin: 0 }}>
                Connecting to support...
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SupportChat;