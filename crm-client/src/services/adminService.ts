import axios from 'axios';
import { API_URL } from '../api';

export interface IUpdateUserData {
    username?: string;
    email?: string;
    role?: 'USER' | 'ADMIN';
    balance?: number;
}

export interface ITransaction {
    _id: string;
    user: {
        _id: string;
        username: string;
    };
    type: string;
    status: string;
    amount: number;
    createdAt: string;
}

export interface IGameRecord {
    _id: string;
    user: {
        _id: string;
        username: string;
    };
    gameName: string;
    opponent: string;
    status: 'WON' | 'LOST' | 'DRAW';
    amountChanged: number;
    createdAt: string;
}

export interface IActiveRoom {
    id: string;
    gameType: string;
    bet: number;
    players: string[];
}

export interface ITournament {
    _id: string;
    name: string;
    gameType: string;
    status: string;
    players: any[];
    maxPlayers: number;
    entryFee: number;
    startTime: string;
}

export interface IUpdateTournamentData {
    name?: string;
    gameType?: string;
    entryFee?: number;
    maxPlayers?: number;
    startTime?: string;
}

export interface ICreateTournamentData {
    name: string;
    gameType: string;
    entryFee: number;
    maxPlayers: number;
    startTime?: string;
}

export interface IPaginationInfo {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
    hasNext: boolean;
    hasPrev: boolean;
}

export interface ITournamentsResponse {
    data: ITournament[];
    pagination: IPaginationInfo;
}

export interface ITournamentsQuery {
    page?: number;
    limit?: number;
    status?: string;
    gameType?: string;
    search?: string;
}

export interface IKycSubmission {
    _id: string;
    username: string;
    email: string;
    kycStatus: string;
    kycDocuments: {
        documentType: string;
        filePath: string;
        submittedAt: string;
    }[];
}

export interface IUsersResponse {
    success: boolean;
    data: any[];
    pagination: IPaginationInfo;
}

export interface IUsersQuery {
    page?: number;
    limit?: number;
    role?: string;
    search?: string;
}

export const getAdminUsers = async () => {
    const { data } = await axios.get(`${API_URL}/api/admin/users`);
    return data.data || data; // Extract the actual users array from the structured response
};

export const getAdminUsersPaginated = async (query: IUsersQuery = {}): Promise<IUsersResponse> => {
    const params = new URLSearchParams();
    
    if (query.page) params.append('page', query.page.toString());
    if (query.limit) params.append('limit', query.limit.toString());
    if (query.role && query.role !== 'all') params.append('role', query.role);
    if (query.search) params.append('search', query.search);
    
    const { data } = await axios.get(`${API_URL}/api/admin/users?${params.toString()}`);
    return data;
};

export interface IGameRecordsResponse {
    success: boolean;
    data: IGameRecord[];
    pagination: IPaginationInfo;
}

export interface IGameRecordsQuery {
    page?: number;
    limit?: number;
    status?: string;
    gameName?: string;
    search?: string;
}

export const getAdminGameRecords = async (): Promise<IGameRecord[]> => {
    const { data } = await axios.get(`${API_URL}/api/admin/games`);
    return data.data || data; // Extract the actual games array from the structured response
};

export const getAdminGameRecordsPaginated = async (query: IGameRecordsQuery = {}): Promise<IGameRecordsResponse> => {
    const params = new URLSearchParams();
    
    if (query.page) params.append('page', query.page.toString());
    if (query.limit) params.append('limit', query.limit.toString());
    if (query.status && query.status !== 'all') params.append('status', query.status);
    if (query.gameName && query.gameName !== 'all') params.append('gameName', query.gameName);
    if (query.search) params.append('search', query.search);
    
    const { data } = await axios.get(`${API_URL}/api/admin/games?${params.toString()}`);
    return data;
};

export const updateUser = async (userId: string, userData: IUpdateUserData) => {
    const { data } = await axios.put(`${API_URL}/api/admin/users/${userId}`, userData);
    return data;
};

export const deleteUser = async (userId: string) => {
    const { data } = await axios.delete(`${API_URL}/api/admin/users/${userId}`);
    return data;
};

export interface ITransactionsResponse {
    success: boolean;
    data: ITransaction[];
    pagination: IPaginationInfo;
}

export interface ITransactionsQuery {
    page?: number;
    limit?: number;
    type?: string;
    status?: string;
    search?: string;
}

export const getAdminTransactions = async (): Promise<ITransaction[]> => {
    const { data } = await axios.get(`${API_URL}/api/admin/transactions`);
    return data;
};

export const getAdminTransactionsPaginated = async (query: ITransactionsQuery = {}): Promise<ITransactionsResponse> => {
    const params = new URLSearchParams();
    
    if (query.page) params.append('page', query.page.toString());
    if (query.limit) params.append('limit', query.limit.toString());
    if (query.type && query.type !== 'all') params.append('type', query.type);
    if (query.status && query.status !== 'all') params.append('status', query.status);
    if (query.search) params.append('search', query.search);
    
    const { data } = await axios.get(`${API_URL}/api/admin/transactions?${params.toString()}`);
    return data;
};

export interface IRoomsResponse {
    data: IActiveRoom[];
    pagination: IPaginationInfo;
}

export interface IRoomsQuery {
    page?: number;
    limit?: number;
    gameType?: string;
    search?: string;
}

export const getAdminActiveRooms = async (query?: IRoomsQuery): Promise<IRoomsResponse> => {
    const params = new URLSearchParams();
    
    if (query?.page) params.append('page', query.page.toString());
    if (query?.limit) params.append('limit', query.limit.toString());
    if (query?.gameType) params.append('gameType', query.gameType);
    if (query?.search) params.append('search', query.search);

    const { data } = await axios.get(`${API_URL}/api/admin/rooms?${params.toString()}`);
    return data;
};

export const getAdminActiveRoomsLegacy = async (): Promise<IActiveRoom[]> => {
    const { data } = await axios.get(`${API_URL}/api/admin/rooms`);
    return data.data || data;
};

export const createAdminRoom = async (roomData: { gameType: string, bet: number }): Promise<any> => {
    const { data } = await axios.post(`${API_URL}/api/admin/create-room`, roomData);
    return data;
};

export const deleteAdminRoom = async (roomId: string): Promise<{ message: string }> => {
    const { data } = await axios.delete(`${API_URL}/api/admin/rooms/${roomId}`);
    return data;
};

export const getAdminTournaments = async (query?: ITournamentsQuery): Promise<ITournamentsResponse> => {
    const params = new URLSearchParams();
    
    if (query?.page) params.append('page', query.page.toString());
    if (query?.limit) params.append('limit', query.limit.toString());
    if (query?.status) params.append('status', query.status);
    if (query?.gameType) params.append('gameType', query.gameType);
    if (query?.search) params.append('search', query.search);

    const { data } = await axios.get(`${API_URL}/api/admin/tournaments?${params.toString()}`);
    return data;
};

export const getAdminTournamentsLegacy = async (): Promise<ITournament[]> => {
    const { data } = await axios.get(`${API_URL}/api/tournaments`);
    return data;
};

export const createAdminTournament = async (tournamentData: ICreateTournamentData): Promise<ITournament> => {
    const { data } = await axios.post(`${API_URL}/api/admin/tournaments`, tournamentData);
    return data;
};

export const updateAdminTournament = async (tournamentId: string, tournamentData: IUpdateTournamentData): Promise<ITournament> => {
    const { data } = await axios.put(`${API_URL}/api/admin/tournaments/${tournamentId}`, tournamentData);
    return data;
};

export const deleteAdminTournament = async (tournamentId: string): Promise<{ message: string }> => {
    const { data } = await axios.delete(`${API_URL}/api/admin/tournaments/${tournamentId}`);
    return data;
};

export const getKycSubmissions = async (status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'ALL'): Promise<IKycSubmission[]> => {
    const params = status === 'ALL' ? {} : { status };
    const { data } = await axios.get(`${API_URL}/api/admin/kyc-submissions`, { params });
    return data;
};

export const reviewKycSubmission = async (userId: string, action: 'APPROVE' | 'REJECT', reason?: string) => {
    const { data } = await axios.post(`${API_URL}/api/admin/kyc-submissions/${userId}/review`, { action, reason });
    return data;
};

export const getKycDocumentFile = async (userId: string, fileName: string): Promise<Blob> => {
    const token = localStorage.getItem('crm_token');

    const config = {
        headers: {
            'Authorization': `Bearer ${token}`
        },
        responseType: 'blob' as 'blob',
    };

    const response = await axios.get(`${API_URL}/api/admin/kyc-document/${userId}/${fileName}`, config);
    return response.data;
};