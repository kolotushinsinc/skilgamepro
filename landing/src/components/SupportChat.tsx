import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, Minimize2 } from 'lucide-react';
import { io, Socket } from 'socket.io-client';

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
  const [isConnected, setIsConnected] = useState(false);
  const [chatId, setChatId] = useState<string | null>(null);
  const [guestInfo, setGuestInfo] = useState({
    id: '',
    name: 'Guest'
  });
  const [showNameInput, setShowNameInput] = useState(true);
  const [tempName, setTempName] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [adminTyping, setAdminTyping] = useState(false);

  const socketRef = useRef<Socket | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Generate guest ID and restore name from localStorage
    const guestId = localStorage.getItem('guestChatId') ||
                   `guest-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const savedName = localStorage.getItem('guestChatName') || '';
    const savedChatId = localStorage.getItem('activeChatId');
    
    localStorage.setItem('guestChatId', guestId);
    
    setGuestInfo({
      id: guestId,
      name: savedName || 'Guest'
    });
    
    if (savedName) {
      setShowNameInput(false);
      setTempName(savedName);
    }

    // Restore existing chat if available
    if (savedChatId && savedName) {
      setChatId(savedChatId);
      // Load chat history
      loadChatHistory(savedChatId);
    }

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, []);

  const loadChatHistory = async (chatId: string) => {
    try {
      const serverUrl = import.meta.env.VITE_SERVER_URL || 'http://localhost:5001';
      const response = await fetch(`${serverUrl}/api/chat/${chatId}`);
      
      if (response.ok) {
        const data = await response.json();
        if (data.success && data.chat) {
          setMessages(data.chat.messages.map((msg: any) => ({
            ...msg,
            timestamp: new Date(msg.timestamp)
          })));
          
          // Auto-join chat via socket if connected
          if (socketRef.current) {
            socketRef.current.emit('joinChat', chatId);
          }
        }
      }
    } catch (error) {
      console.error('Error loading chat history:', error);
    }
  };

  const connectSocket = () => {
    if (socketRef.current) return;

    const serverUrl = import.meta.env.VITE_SERVER_URL || 'http://localhost:5001';
    socketRef.current = io(serverUrl, {
      transports: ['websocket'],
      forceNew: true,
      auth: {} // No token for guest users
    });

    socketRef.current.on('connect', () => {
      setIsConnected(true);
      console.log('Connected to support chat');
    });

    socketRef.current.on('disconnect', () => {
      setIsConnected(false);
      console.log('Disconnected from support chat');
    });

    socketRef.current.on('chatJoined', ({ chatId: joinedChatId, chat }: { chatId: string | null, chat: Chat | null }) => {
      if (joinedChatId) {
        setChatId(joinedChatId);
        localStorage.setItem('activeChatId', joinedChatId);
      }
      if (chat && chat.messages) {
        setMessages(chat.messages.map(msg => ({
          ...msg,
          timestamp: new Date(msg.timestamp)
        })));
      }
    });

    socketRef.current.on('newMessage', ({ message }: { chatId: string, message: Message }) => {
      setMessages(prev => [...prev, {
        ...message,
        timestamp: new Date(message.timestamp)
      }]);
    });

    socketRef.current.on('userTyping', ({ userId, isTyping: typing }: { userId: string, isTyping: boolean }) => {
      if (userId !== guestInfo.id) {
        setAdminTyping(typing);
      }
    });

    socketRef.current.on('chatClosed', () => {
      setMessages(prev => [...prev, {
        id: `system-${Date.now()}`,
        content: 'Chat has been closed by support. Thank you for contacting us!',
        sender: { id: 'system', name: 'System', type: 'admin' },
        timestamp: new Date(),
        isRead: true
      }]);
    });

    socketRef.current.on('chatError', ({ message }: { message: string }) => {
      console.error('Chat error:', message);
      // You might want to show this error to the user
    });
  };

  const createChatAndSendMessage = () => {
    if (!newMessage.trim() || !socketRef.current) return;

    const messageContent = newMessage.trim();
    setNewMessage('');

    // Send message with auto-create and guest info
    socketRef.current.emit('sendMessage', {
      content: messageContent,
      guestInfo: guestInfo,
      autoCreate: true
    });

    console.log('Guest: Message sent with auto-create:', { guestInfo, content: messageContent });
  };

  const sendMessage = () => {
    if (!newMessage.trim() || !chatId || !socketRef.current) return;

    const messageContent = newMessage.trim();
    setNewMessage('');
    setIsTyping(false);

    socketRef.current.emit('sendMessage', {
      chatId,
      content: messageContent,
      guestInfo: guestInfo
    });
  };

  const handleTyping = (value: string) => {
    setNewMessage(value);
    
    if (!chatId || !socketRef.current) return;

    if (!isTyping) {
      setIsTyping(true);
      socketRef.current.emit('chatTyping', { chatId, isTyping: true });
    }

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    typingTimeoutRef.current = setTimeout(() => {
      setIsTyping(false);
      if (socketRef.current) {
        socketRef.current.emit('chatTyping', { chatId, isTyping: false });
      }
    }, 1000);
  };

  const handleNameSubmit = () => {
    if (tempName.trim()) {
      const name = tempName.trim();
      setGuestInfo(prev => ({ ...prev, name }));
      localStorage.setItem('guestChatName', name);
      setShowNameInput(false);
    }
  };

  const openChat = () => {
    setIsOpen(true);
    setIsMinimized(false);
    connectSocket();
    
    // Join existing chat if we have one
    if (chatId && socketRef.current) {
      setTimeout(() => {
        if (socketRef.current) {
          socketRef.current.emit('joinChat', chatId);
        }
      }, 1000); // Wait for socket to connect
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  if (!isOpen) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <button
          onClick={openChat}
          className="bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110 animate-pulse"
        >
          <MessageCircle className="w-6 h-6" />
        </button>
      </div>
    );
  }

  return (
    <div className={`fixed bottom-4 right-4 z-50 bg-white rounded-lg shadow-2xl border transition-all duration-300 ${
      isMinimized ? 'w-80 h-14' : 'w-80 h-96'
    }`}>
      {/* Header */}
      <div className="bg-blue-600 text-white p-3 rounded-t-lg flex items-center justify-between">
        <div className="flex items-center gap-2">
          <MessageCircle className="w-5 h-5" />
          <span className="font-medium">Support Chat</span>
          {isConnected && (
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          )}
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsMinimized(!isMinimized)}
            className="p-1 hover:bg-blue-500 rounded"
          >
            <Minimize2 className="w-4 h-4" />
          </button>
          <button
            onClick={() => setIsOpen(false)}
            className="p-1 hover:bg-blue-500 rounded"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {!isMinimized && (
        <>
          {/* Name Input */}
          {showNameInput && (
            <div className="p-4 border-b bg-gray-50">
              <p className="text-sm text-gray-600 mb-2">Please enter your name:</p>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={tempName}
                  onChange={(e) => setTempName(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleNameSubmit()}
                  placeholder="Your name"
                  className="flex-1 p-2 border rounded text-sm text-black bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={handleNameSubmit}
                  disabled={!tempName.trim()}
                  className="px-3 py-2 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 disabled:opacity-50"
                >
                  Start
                </button>
              </div>
            </div>
          )}

          {/* Messages */}
          <div className="h-64 overflow-y-auto p-3 space-y-3">
            {messages.length === 0 && !showNameInput && (
              <div className="text-center text-gray-500 text-sm py-8">
                <MessageCircle className="w-8 h-8 mx-auto mb-2 opacity-50" />
                <p>Welcome! How can we help you today?</p>
              </div>
            )}

            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender.type === 'guest' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg text-sm ${
                    message.sender.type === 'guest'
                      ? 'bg-blue-600 text-white'
                      : message.sender.type === 'admin'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium text-xs">
                      {message.sender.name}
                      {message.sender.type === 'admin' && ' (Support)'}
                    </span>
                    <span className="text-xs opacity-70">
                      {formatTime(message.timestamp)}
                    </span>
                  </div>
                  <p>{message.content}</p>
                </div>
              </div>
            ))}

            {adminTyping && (
              <div className="flex justify-start">
                <div className="bg-gray-100 text-gray-800 p-3 rounded-lg text-sm">
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                    <span className="text-xs">Support is typing...</span>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          {!showNameInput && (
            <div className="p-3 border-t">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => handleTyping(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (chatId ? sendMessage() : createChatAndSendMessage())}
                  placeholder="Type your message..."
                  className="flex-1 p-2 border rounded text-sm text-black bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={chatId ? sendMessage : createChatAndSendMessage}
                  disabled={!newMessage.trim()}
                  className="p-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 transition-colors"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
              {!isConnected && (
                <p className="text-xs text-red-500 mt-1">Connecting to support...</p>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default SupportChat;