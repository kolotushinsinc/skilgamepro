import axios from 'axios';
import { API_URL } from '../api';

export interface SecurityMetrics {
    totalRequests: number;
    blockedRequests: number;
    rateLimitHits: number;
    bruteForceAttempts: number;
    xssBlocked: number;
    csrfBlocked: number;
    maliciousUploads: number;
    activeThreats: number;
    threatGrowth: number;
    requestGrowth: number;
    securityScore: number;
}

export interface BlockedIP {
    ip: string;
    reason: string;
    blockedAt: string;
    country?: string;
    attempts: number;
    lastAttempt: string;
}

export interface SecurityEvent {
    id: string;
    type: string;
    severity: 'low' | 'medium' | 'high' | 'critical';
    ip: string;
    timestamp: string;
    details: string;
    blocked: boolean;
    userAgent?: string;
    path?: string;
}

export interface SecurityLog {
    timestamp: string;
    level: 'info' | 'warn' | 'error';
    message: string;
    ip?: string;
    userAgent?: string;
    path?: string;
    metadata?: any;
}

export interface ThreatPattern {
    id: string;
    pattern: string;
    type: 'xss' | 'sql_injection' | 'path_traversal' | 'command_injection';
    severity: 'low' | 'medium' | 'high' | 'critical';
    enabled: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface SecurityConfiguration {
    rateLimiting: {
        global: {
            windowMs: number;
            max: number;
            enabled: boolean;
        };
        auth: {
            windowMs: number;
            max: number;
            enabled: boolean;
        };
        admin: {
            windowMs: number;
            max: number;
            enabled: boolean;
        };
    };
    bruteForce: {
        maxAttempts: number;
        blockDuration: number;
        enabled: boolean;
    };
    monitoring: {
        enabled: boolean;
        alertThreshold: number;
        emailAlerts: boolean;
    };
}

export interface SecurityAlert {
    id: string;
    type: 'high_threat_volume' | 'new_attack_pattern' | 'system_anomaly' | 'critical_vulnerability';
    severity: 'low' | 'medium' | 'high' | 'critical';
    title: string;
    description: string;
    timestamp: string;
    acknowledged: boolean;
    metadata?: any;
}

// Get security metrics and statistics
export const getSecurityMetrics = async (): Promise<SecurityMetrics> => {
    const { data } = await axios.get(`${API_URL}/api/security/metrics`);
    return data;
};

// Get list of blocked IP addresses
export const getBlockedIPs = async (): Promise<BlockedIP[]> => {
    const { data } = await axios.get(`${API_URL}/api/security/blocked-ips`);
    return data;
};

// Unblock a specific IP address
export const unblockIP = async (ip: string): Promise<{ success: boolean; message: string }> => {
    const { data } = await axios.post(`${API_URL}/api/security/unblock-ip`, { ip });
    return data;
};

// Block a specific IP address
export const blockIP = async (ip: string, reason: string): Promise<{ success: boolean; message: string }> => {
    const { data } = await axios.post(`${API_URL}/api/security/block-ip`, { ip, reason });
    return data;
};

// Get recent security events
export const getSecurityEvents = async (limit: number = 50): Promise<SecurityEvent[]> => {
    const { data } = await axios.get(`${API_URL}/api/security/events?limit=${limit}`);
    return data;
};

// Get security logs with filtering
export const getSecurityLogs = async (params: {
    level?: string;
    startDate?: string;
    endDate?: string;
    ip?: string;
    limit?: number;
} = {}): Promise<SecurityLog[]> => {
    const queryParams = new URLSearchParams();
    
    if (params.level) queryParams.append('level', params.level);
    if (params.startDate) queryParams.append('startDate', params.startDate);
    if (params.endDate) queryParams.append('endDate', params.endDate);
    if (params.ip) queryParams.append('ip', params.ip);
    if (params.limit) queryParams.append('limit', params.limit.toString());

    const { data } = await axios.get(`${API_URL}/api/security/logs?${queryParams.toString()}`);
    return data;
};

// Get threat patterns
export const getThreatPatterns = async (): Promise<ThreatPattern[]> => {
    const { data } = await axios.get(`${API_URL}/api/security/threat-patterns`);
    return data;
};

// Add new threat pattern
export const addThreatPattern = async (pattern: Omit<ThreatPattern, 'id' | 'createdAt' | 'updatedAt'>): Promise<ThreatPattern> => {
    const { data } = await axios.post(`${API_URL}/api/security/threat-patterns`, pattern);
    return data;
};

// Update threat pattern
export const updateThreatPattern = async (id: string, updates: Partial<ThreatPattern>): Promise<ThreatPattern> => {
    const { data } = await axios.put(`${API_URL}/api/security/threat-patterns/${id}`, updates);
    return data;
};

// Delete threat pattern
export const deleteThreatPattern = async (id: string): Promise<{ success: boolean; message: string }> => {
    const { data } = await axios.delete(`${API_URL}/api/security/threat-patterns/${id}`);
    return data;
};

// Get security configuration
export const getSecurityConfiguration = async (): Promise<SecurityConfiguration> => {
    const { data } = await axios.get(`${API_URL}/api/security/config`);
    return data;
};

// Update security configuration
export const updateSecurityConfiguration = async (config: Partial<SecurityConfiguration>): Promise<SecurityConfiguration> => {
    const { data } = await axios.put(`${API_URL}/api/security/config`, config);
    return data;
};

// Get security alerts
export const getSecurityAlerts = async (includeAcknowledged: boolean = false): Promise<SecurityAlert[]> => {
    const { data } = await axios.get(`${API_URL}/api/security/alerts?includeAcknowledged=${includeAcknowledged}`);
    return data;
};

// Acknowledge security alert
export const acknowledgeAlert = async (alertId: string): Promise<{ success: boolean; message: string }> => {
    const { data } = await axios.post(`${API_URL}/api/security/alerts/${alertId}/acknowledge`);
    return data;
};

// Get session information
export const getActiveSessions = async (): Promise<any[]> => {
    const { data } = await axios.get(`${API_URL}/api/security/sessions`);
    return data;
};

// Force logout specific session
export const forceLogoutSession = async (sessionId: string): Promise<{ success: boolean; message: string }> => {
    const { data } = await axios.post(`${API_URL}/api/security/sessions/${sessionId}/logout`);
    return data;
};

// Get security dashboard summary
export const getSecuritySummary = async (): Promise<{
    metrics: SecurityMetrics;
    recentEvents: SecurityEvent[];
    activeAlerts: SecurityAlert[];
    blockedIPs: BlockedIP[];
    systemStatus: {
        monitoring: boolean;
        rateLimiting: boolean;
        bruteForceProtection: boolean;
        threatDetection: boolean;
    };
}> => {
    const { data } = await axios.get(`${API_URL}/api/security/dashboard`);
    return data;
};

// Export security report
export const exportSecurityReport = async (params: {
    startDate: string;
    endDate: string;
    format: 'pdf' | 'csv' | 'json';
    includeMetrics?: boolean;
    includeEvents?: boolean;
    includeLogs?: boolean;
}): Promise<Blob> => {
    const response = await axios.post(`${API_URL}/api/security/export-report`, params, {
        responseType: 'blob'
    });
    return response.data;
};

// Test security endpoint (for admin testing)
export const testSecurityEndpoint = async (testType: 'xss' | 'sql_injection' | 'rate_limit' | 'brute_force'): Promise<{
    success: boolean;
    message: string;
    blocked: boolean;
    details?: any;
}> => {
    const { data } = await axios.post(`${API_URL}/api/security/test`, { testType });
    return data;
};

// Get real-time security metrics (WebSocket alternative using polling)
export const getRealtimeMetrics = async (): Promise<{
    currentRequests: number;
    activeThreats: number;
    blockedRequests: number;
    systemLoad: number;
    memoryUsage: number;
    responseTime: number;
}> => {
    const { data } = await axios.get(`${API_URL}/api/security/realtime`);
    return data;
};