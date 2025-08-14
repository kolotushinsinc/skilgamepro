import React, { useState, useEffect, useRef } from 'react';
import { 
  MessageCircle, 
  Search, 
  Filter, 
  Send, 
  Clock, 
  User, 
  CheckCircle, 
  AlertCircle, 
  XCircle,
  Eye,
  MessageSquare,
  Users,
  TrendingUp,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { io, Socket } from 'socket.io-client';
import axios from 'axios';
import { API_URL } from '../../api/index';
import { useNotifications } from '../../context/NotificationContext';
import styles from './SupportChatPage.module.css';

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
}

interface ChatStats {
  totalChats: number;
  activeChats: number;
  pendingChats: number;
  closedChats: number;
  averageResponseTime: string;
  dailyMessages: number;
}

const SupportChatPage: React.FC = () => {
  const [chats, setChats] = useState<Chat[]>([]);
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'pending' | 'closed'>('all');
  const [sourceFilter, setSourceFilter] = useState<'all' | 'landing' | 'client'>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState<ChatStats | null>(null);
  const [adminTyping, setAdminTyping] = useState<Record<string, boolean>>({});
  const [userTyping, setUserTyping] = useState<Record<string, string>>({});
  const [recentMessageIds, setRecentMessageIds] = useState<Set<string>>(new Set());

  const { socket: globalSocket, unreadChats, newMessages, markChatAsRead, clearNewMessagesForChat } = useNotifications();
  const socketRef = useRef<Socket | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const selectedChatRef = useRef<Chat | null>(null);
  const [processedMessageIds, setProcessedMessageIds] = useState<Set<string>>(new Set());

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [selectedChat?.messages]);

  useEffect(() => {
    fetchChats();
    fetchStats();
    
    // Use the global socket instead of creating a new one
    if (globalSocket) {
      socketRef.current = globalSocket;
    }

    return () => {
      // Don't disconnect the global socket
    };
  }, [globalSocket]);

  // Update selectedChatRef when selectedChat changes
  useEffect(() => {
    selectedChatRef.current = selectedChat;
  }, [selectedChat]);

  // Setup socket listeners only once
  useEffect(() => {
    if (globalSocket) {
      setupSocketListeners();
    }
  }, [globalSocket]);

  useEffect(() => {
    fetchChats();
  }, [currentPage, searchTerm, statusFilter, sourceFilter]);

  const setupSocketListeners = () => {
    if (!socketRef.current) return;

    // Unified event handlers
    const handleChatNotification = ({ chatId, type, message }: any) => {
      console.log('New chat notification in SupportChatPage:', { chatId, type, message });
      fetchChats(); // Refresh chat list
      if (type === 'new_message' && selectedChatRef.current?.id === chatId) {
        fetchChatDetails(chatId);
      }
    };

    const handleNewMessage = ({ chatId, message }: { chatId: string, message: Message }) => {
      console.log('New message received in SupportChatPage:', { chatId, message, selectedChatId: selectedChatRef.current?.id });
      
      if (selectedChatRef.current?.id === chatId) {
        console.log('Adding message to current chat:', message);
        
        // Check if we already processed this message
        if (processedMessageIds.has(message.id)) {
          console.log('Message already processed, skipping:', message.id);
          return;
        }
        
        setSelectedChat(prev => {
          if (!prev || prev.id !== chatId) return prev;
          
          // Double check if message already exists to prevent duplicates
          const messageExists = prev.messages.some(msg => msg.id === message.id);
          if (messageExists) {
            console.log('Message already exists in chat, skipping:', message.id);
            return prev;
          }
          
          return {
            ...prev,
            messages: [...prev.messages, { ...message, timestamp: new Date(message.timestamp) }]
          };
        });
        
        // Mark as processed
        setProcessedMessageIds(prev => new Set([...prev, message.id]));
        
        // Mark message as recent for highlighting only if it's from user/guest
        if (message.sender.type !== 'admin') {
          setRecentMessageIds(prev => new Set([...prev, message.id]));
        }
      }
      
      fetchChats(); // Update chat list with new activity
    };

    const handleUserTyping = ({ chatId, userId, userName, isTyping }: any) => {
      if (selectedChatRef.current?.id === chatId) {
        setUserTyping(prev => ({
          ...prev,
          [chatId]: isTyping ? userName : ''
        }));
      }
    };

    const handleChatClosed = ({ chatId }: { chatId: string }) => {
      if (selectedChatRef.current?.id === chatId) {
        fetchChatDetails(chatId);
      }
      fetchChats();
    };

    // Listen to unified events only
    socketRef.current.on('chatNotification', handleChatNotification);
    socketRef.current.on('newMessage', handleNewMessage);
    socketRef.current.on('userTyping', handleUserTyping);
    socketRef.current.on('chatClosed', handleChatClosed);
  };

  const fetchChats = async () => {
    try {
      setIsLoading(true);
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: '10',
        ...(searchTerm && { search: searchTerm }),
        ...(statusFilter !== 'all' && { status: statusFilter }),
        ...(sourceFilter !== 'all' && { source: sourceFilter }),
      });

      const response = await axios.get(`${API_URL}/api/chat?${params}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('crm_token')}` }
      });

      if (response.data.success) {
        const chatsData = response.data.chats.map((chat: any) => ({
          ...chat,
          createdAt: new Date(chat.createdAt),
          lastActivity: new Date(chat.lastActivity),
          messages: chat.messages.map((msg: any) => ({
            ...msg,
            timestamp: new Date(msg.timestamp)
          }))
        }));
        
        setChats(chatsData);
        setTotalPages(response.data.pagination.totalPages);
      }
    } catch (error) {
      console.error('Error fetching chats:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/chat/stats`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('crm_token')}` }
      });

      if (response.data.success) {
        setStats(response.data.stats);
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const fetchChatDetails = async (chatId: string) => {
    try {
      const response = await axios.get(`${API_URL}/api/chat/${chatId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('crm_token')}` }
      });

      if (response.data.success) {
        const chatData = {
          ...response.data.chat,
          createdAt: new Date(response.data.chat.createdAt),
          lastActivity: new Date(response.data.chat.lastActivity),
          messages: response.data.chat.messages.map((msg: any) => ({
            ...msg,
            timestamp: new Date(msg.timestamp)
          }))
        };
        setSelectedChat(chatData);
      }
    } catch (error) {
      console.error('Error fetching chat details:', error);
    }
  };

  const selectChat = async (chat: Chat) => {
    setSelectedChat(chat);
    
    // Mark chat as read in global context
    markChatAsRead(chat.id);
    
    // Join chat room using unified event
    if (socketRef.current) {
      socketRef.current.emit('joinChat', chat.id);
    }

    // Mark messages as read
    try {
      await axios.post(`${API_URL}/api/chat/${chat.id}/read`, {}, {
        headers: { Authorization: `Bearer ${localStorage.getItem('crm_token')}` }
      });
    } catch (error) {
      console.error('Error marking messages as read:', error);
    }
  };

  const sendMessage = async () => {
    if (!newMessage.trim() || !selectedChat || !socketRef.current) return;

    const messageContent = newMessage.trim();
    setNewMessage(''); // Clear input immediately

    try {
      // Send via unified socket event
      socketRef.current.emit('sendMessage', {
        chatId: selectedChat.id,
        content: messageContent
      });

      // Clear all highlights when admin responds
      setRecentMessageIds(new Set());
      setProcessedMessageIds(new Set()); // Also clear processed messages
      
      // Clear newMessages from global context for this chat
      clearNewMessagesForChat(selectedChat.id);

    } catch (error) {
      console.error('Error sending message:', error);
      setNewMessage(messageContent); // Restore message on error
    }
  };

  const handleTyping = (value: string) => {
    setNewMessage(value);
    
    if (!selectedChat || !socketRef.current) return;

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    socketRef.current.emit('chatTyping', { 
      chatId: selectedChat.id, 
      isTyping: value.length > 0 
    });

    typingTimeoutRef.current = setTimeout(() => {
      if (socketRef.current) {
        socketRef.current.emit('chatTyping', { 
          chatId: selectedChat.id, 
          isTyping: false 
        });
      }
    }, 1000);
  };

  const closeChat = async (chatId: string) => {
    try {
      await axios.post(`${API_URL}/api/chat/${chatId}/close`, {}, {
        headers: { Authorization: `Bearer ${localStorage.getItem('crm_token')}` }
      });
      
      fetchChats();
      if (selectedChat?.id === chatId) {
        setSelectedChat(null);
      }
    } catch (error) {
      console.error('Error closing chat:', error);
    }
  };

  const assignChat = async (chatId: string) => {
    try {
      await axios.post(`${API_URL}/api/chat/${chatId}/assign`, {}, {
        headers: { Authorization: `Bearer ${localStorage.getItem('crm_token')}` }
      });
      
      fetchChats();
      if (selectedChat?.id === chatId) {
        fetchChatDetails(chatId);
      }
    } catch (error) {
      console.error('Error assigning chat:', error);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return '#10b981';
      case 'pending': return '#f59e0b';
      case 'closed': return '#6b7280';
      default: return '#6b7280';
    }
  };

  const getSourceIcon = (source: string) => {
    return source === 'landing' ? '🌐' : '🎮';
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString();
  };

  if (isLoading && chats.length === 0) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>
          <MessageCircle className={styles.loadingIcon} />
          <p>Loading support chats...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {/* Header with Stats */}
      <div className={styles.header}>
        <h1 className={styles.title}>
          <MessageCircle className={styles.titleIcon} />
          Support Chat Management
        </h1>
        <p className={styles.subtitle}>
          Manage customer support conversations and provide real-time assistance
        </p>
        
        {stats && (
          <div className={styles.statsGrid}>
            <div className={styles.statCard}>
              <MessageSquare className={styles.statIcon} />
              <div>
                <p className={styles.statValue}>{stats.totalChats}</p>
                <p className={styles.statLabel}>Total Chats</p>
              </div>
            </div>
            <div className={styles.statCard}>
              <AlertCircle className={styles.statIcon} style={{ color: '#f59e0b' }} />
              <div>
                <p className={styles.statValue}>{stats.pendingChats}</p>
                <p className={styles.statLabel}>Pending</p>
              </div>
            </div>
            <div className={styles.statCard}>
              <CheckCircle className={styles.statIcon} style={{ color: '#10b981' }} />
              <div>
                <p className={styles.statValue}>{stats.activeChats}</p>
                <p className={styles.statLabel}>Active</p>
              </div>
            </div>
            <div className={styles.statCard}>
              <Clock className={styles.statIcon} />
              <div>
                <p className={styles.statValue}>{stats.averageResponseTime}</p>
                <p className={styles.statLabel}>Avg Response</p>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className={styles.content}>
        {/* Chat List */}
        <div className={styles.chatList}>
          <div className={styles.chatListHeader}>
            <div className={styles.searchContainer}>
              <Search className={styles.searchIcon} />
              <input
                type="text"
                placeholder="Search chats..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={styles.searchInput}
              />
            </div>
            
            <div className={styles.filtersContainer}>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as any)}
                className={styles.filter}
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="active">Active</option>
                <option value="closed">Closed</option>
              </select>
              
              <select
                value={sourceFilter}
                onChange={(e) => setSourceFilter(e.target.value as any)}
                className={styles.filter}
              >
                <option value="all">All Sources</option>
                <option value="landing">Website</option>
                <option value="client">Game Client</option>
              </select>
            </div>
          </div>

          <div className={styles.chatListContent}>
            {chats.map((chat) => {
              const isUnread = unreadChats.has(chat.id);
              const hasUnreadMessages = chat.messages.some(msg =>
                msg.sender.type !== 'admin' && !msg.isRead
              );
              
              return (
                <div
                  key={chat.id}
                  className={`${styles.chatItem} ${
                    selectedChat?.id === chat.id ? styles.selected : ''
                  } ${isUnread || hasUnreadMessages ? styles.unreadChat : ''}`}
                  onClick={() => selectChat(chat)}
                >
                  <div className={styles.chatItemHeader}>
                    <div className={styles.chatItemInfo}>
                      <span className={styles.chatSource}>{getSourceIcon(chat.source)}</span>
                      <span className={styles.chatUser}>
                        {chat.userInfo?.name || chat.guestInfo?.name || 'Anonymous'}
                        {(isUnread || hasUnreadMessages) && (
                          <span className={styles.unreadDot}></span>
                        )}
                      </span>
                      <div
                        className={styles.chatStatus}
                        style={{ backgroundColor: getStatusColor(chat.status) }}
                      >
                        {chat.status}
                      </div>
                    </div>
                    <span className={styles.chatTime}>
                      {formatTime(chat.lastActivity)}
                    </span>
                  </div>
                  
                  <p className={styles.chatSubject}>{chat.subject}</p>
                  
                  {chat.messages.length > 0 && (
                    <p className={styles.chatLastMessage}>
                      {chat.messages[chat.messages.length - 1].content.substring(0, 50)}...
                    </p>
                  )}
                  
                  <div className={styles.chatItemFooter}>
                    <span className={styles.messagesCount}>
                      {chat.messages.length} {chat.messages.length === 1 ? 'message' : 'messages'}
                    </span>
                    {chat.assignedAdmin && (
                      <span className={styles.assignedAdmin}>
                        Assigned
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Pagination */}
          <div className={styles.pagination}>
            <button
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className={styles.paginationButton}
            >
              <ChevronLeft className={styles.paginationIcon} />
            </button>
            
            <span className={styles.paginationInfo}>
              Page {currentPage} of {totalPages}
            </span>
            
            <button
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
              className={styles.paginationButton}
            >
              <ChevronRight className={styles.paginationIcon} />
            </button>
          </div>
        </div>

        {/* Chat Detail */}
        <div className={styles.chatDetail}>
          {selectedChat ? (
            <>
              <div className={styles.chatDetailHeader}>
                <div className={styles.chatDetailInfo}>
                  <h3 className={styles.chatDetailTitle}>
                    {getSourceIcon(selectedChat.source)} {selectedChat.userInfo?.name || selectedChat.guestInfo?.name}
                  </h3>
                  <p className={styles.chatDetailSubject}>{selectedChat.subject}</p>
                  {selectedChat.userInfo?.email && (
                    <p className={styles.chatDetailEmail}>{selectedChat.userInfo.email}</p>
                  )}
                </div>
                
                <div className={styles.chatDetailActions}>
                  {!selectedChat.assignedAdmin && selectedChat.status === 'pending' && (
                    <button
                      onClick={() => assignChat(selectedChat.id)}
                      className={styles.actionButton}
                    >
                      Assign to Me
                    </button>
                  )}
                  
                  {selectedChat.status !== 'closed' && (
                    <button
                      onClick={() => closeChat(selectedChat.id)}
                      className={`${styles.actionButton} ${styles.closeButton}`}
                    >
                      <XCircle className={styles.buttonIcon} />
                      Close Chat
                    </button>
                  )}
                </div>
              </div>

              <div className={styles.messagesContainer}>
                {selectedChat.messages.map((message) => {
                  const isUnread = message.sender.type !== 'admin' && !message.isRead;
                  const isRecent = recentMessageIds.has(message.id);
                  const isNewFromGlobal = newMessages.some(newMsg =>
                    newMsg.id === message.id && newMsg.sender.type !== 'admin'
                  );
                  
                  return (
                    <div
                      key={message.id}
                      className={`${styles.message} ${
                        message.sender.type === 'admin' ? styles.adminMessage : styles.userMessage
                      } ${isUnread ? styles.unreadMessage : ''} ${
                        (isRecent || isNewFromGlobal) && message.sender.type !== 'admin' ? styles.newMessage : ''
                      }`}
                    >
                      <div className={styles.messageHeader}>
                        <span className={styles.messageSender}>
                          {message.sender.name}
                          {message.sender.type === 'admin' && ' (Support)'}
                          {isUnread && <span className={styles.unreadIndicator}>NEW</span>}
                        </span>
                        <span className={styles.messageTime}>
                          {formatTime(message.timestamp)}
                        </span>
                      </div>
                      <p className={styles.messageContent}>{message.content}</p>
                    </div>
                  );
                })}

                {userTyping[selectedChat.id] && (
                  <div className={styles.typingIndicator}>
                    <div className={styles.typingDots}>
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                    <span className={styles.typingText}>
                      {userTyping[selectedChat.id]} is typing...
                    </span>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {selectedChat.status !== 'closed' && (
                <div className={styles.messageInput}>
                  <div className={styles.inputContainer}>
                    <input
                      type="text"
                      value={newMessage}
                      onChange={(e) => handleTyping(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                      placeholder="Type your response..."
                      className={styles.messageInputField}
                    />
                    <button
                      onClick={sendMessage}
                      disabled={!newMessage.trim()}
                      className={styles.sendButton}
                    >
                      <Send className={styles.sendIcon} />
                    </button>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className={styles.noChatSelected}>
              <MessageCircle className={styles.noChatIcon} />
              <h3>No Chat Selected</h3>
              <p>Select a chat from the list to start responding to customer inquiries</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SupportChatPage;