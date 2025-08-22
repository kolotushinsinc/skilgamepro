import React, { useState, useEffect, useCallback } from 'react';
import { getAdminUsersPaginated, updateUser, deleteUser, type IUsersQuery, type IPaginationInfo } from '../../services/adminService';
import styles from './UsersPage.module.css';
import {
    Edit,
    Trash2,
    RefreshCw,
    Users,
    Shield,
    DollarSign,
    UserCheck,
    Mail,
    Calendar,
    Activity,
    Filter,
    Search,
    ChevronDown
} from 'lucide-react';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import EditUserModal from '../../components/modals/EditUserModal';
import Pagination from '../../components/ui/Pagination';
import ConfirmationModal from '../../components/modals/ConfirmationModal';

interface IUser {
    _id: string;
    username: string;
    email: string;
    role: 'USER' | 'ADMIN';
    balance: number;
    createdAt?: string;
    lastLogin?: string;
}

const UsersPage: React.FC = () => {
    const [users, setUsers] = useState<IUser[]>([]);
    const [loading, setLoading] = useState(true);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editingUser, setEditingUser] = useState<IUser | null>(null);
    const [pagination, setPagination] = useState<IPaginationInfo>({
        currentPage: 1,
        totalPages: 1,
        totalItems: 0,
        itemsPerPage: 10,
        hasNext: false,
        hasPrev: false
    });
    
    // Filter states
    const [showFilters, setShowFilters] = useState(false);
    const [filters, setFilters] = useState<IUsersQuery>({
        page: 1,
        limit: 10,
        role: 'all',
        search: ''
    });
    
    // Confirmation modal states
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [userToDelete, setUserToDelete] = useState<string | null>(null);

    const fetchUsers = useCallback(async (query: IUsersQuery = filters) => {
        try {
            setLoading(true);
            const response = await getAdminUsersPaginated(query);
            setUsers(response.data);
            setPagination(response.pagination);
        } catch (error) {
            console.error("Failed to fetch users", error);
        } finally {
            setLoading(false);
        }
    }, [filters]);

    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

    const handlePageChange = useCallback((page: number) => {
        window.scrollTo(0, 0);
        const newFilters = { ...filters, page };
        setFilters(newFilters);
        fetchUsers(newFilters);
    }, [filters, fetchUsers]);

    const handleFilterChange = useCallback((key: string, value: string) => {
        setFilters(prev => ({ ...prev, [key]: value, page: 1 }));
    }, []);

    const applyFilters = useCallback(() => {
        fetchUsers(filters);
    }, [filters, fetchUsers]);

    const clearFilters = useCallback(() => {
        const clearedFilters = {
            page: 1,
            limit: 10,
            role: 'all',
            search: ''
        };
        setFilters(clearedFilters);
        fetchUsers(clearedFilters);
    }, [fetchUsers]);

    const handleOpenEditModal = (user: IUser) => {
        setEditingUser(user);
        setIsEditModalOpen(true);
    };

    const handleCloseEditModal = () => {
        setIsEditModalOpen(false);
        setEditingUser(null);
    };

    const handleSaveUser = async (userId: string, userData: any) => {
        try {
            await updateUser(userId, userData);
            handleCloseEditModal();
            fetchUsers();
        } catch (error) {
            alert('Failed to update user');
        }
    };

    const handleDeleteUser = (userId: string) => {
        setUserToDelete(userId);
        setShowConfirmModal(true);
    };

    const confirmDeleteUser = async () => {
        if (!userToDelete) return;
        
        try {
            await deleteUser(userToDelete);
            fetchUsers(filters);
            setShowConfirmModal(false);
            setUserToDelete(null);
        } catch (error) {
            console.error('Failed to delete user:', error);
        }
    };

    const cancelDelete = () => {
        setShowConfirmModal(false);
        setUserToDelete(null);
    };

    const formatDate = (dateString?: string) => {
        if (!dateString) return 'N/A';
        return new Date(dateString).toLocaleString('en-US', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    if (loading) return <div className={styles.loadingContainer}><LoadingSpinner size="large" /></div>;

    // Calculate statistics for current page
    const totalUsers = pagination.totalItems;
    const totalAdmins = users.filter(user => user.role === 'ADMIN').length;
    const totalBalance = users.reduce((sum, user) => sum + user.balance, 0);
    const activeUsers = users.filter(user => user.lastLogin &&
        new Date(user.lastLogin) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)).length;

    return (
        <>
            <div className={styles.pageContainer}>
                <div className={styles.pageHeader}>
                    <div className={styles.headerContent}>
                        <div className={styles.titleSection}>
                            <Users className={styles.pageIcon} />
                            <div>
                                <h1 className={styles.pageTitle}>User Management</h1>
                                <p className={styles.pageSubtitle}>Monitor and manage platform users</p>
                            </div>
                        </div>
                        <div className={styles.headerActions}>
                            <button
                                onClick={() => setShowFilters(!showFilters)}
                                className={`${styles.filterToggle} ${showFilters ? styles.active : ''}`}
                            >
                                <Filter size={18} />
                                <span>Filters</span>
                                <ChevronDown size={16} className={showFilters ? styles.rotated : ''} />
                            </button>
                            <button
                                onClick={() => fetchUsers(filters)}
                                className={`${styles.refreshButton} ${loading ? styles.loading : ''}`}
                                disabled={loading}
                            >
                                <RefreshCw size={18} />
                                <span>Refresh</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Filters Section */}
                {showFilters && (
                    <div className={styles.filtersSection}>
                        <div className={styles.filtersGrid}>
                            <div className={styles.filterGroup}>
                                <label className={styles.filterLabel}>User Role</label>
                                <select
                                    className={styles.filterSelect}
                                    value={filters.role || 'all'}
                                    onChange={(e) => handleFilterChange('role', e.target.value)}
                                >
                                    <option value="all">All Roles</option>
                                    <option value="USER">👤 User</option>
                                    <option value="ADMIN">🛡️ Admin</option>
                                </select>
                            </div>

                            <div className={styles.filterGroup}>
                                <label className={styles.filterLabel}>Search</label>
                                <div className={styles.searchInputWrapper}>
                                    <Search className={styles.searchIcon} size={16} />
                                    <input
                                        type="text"
                                        className={styles.searchInput}
                                        placeholder="Search by username, email or ID..."
                                        value={filters.search || ''}
                                        onChange={(e) => handleFilterChange('search', e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className={styles.filterActions}>
                            <button
                                className={styles.filterButton}
                                onClick={applyFilters}
                            >
                                Apply Filters
                            </button>
                            <button
                                className={styles.clearButton}
                                onClick={clearFilters}
                            >
                                Clear
                            </button>
                        </div>
                    </div>
                )}

                {/* Statistics Cards */}
                <div className={styles.statsGrid}>
                    <div className={styles.statCard}>
                        <div className={styles.statIcon}>
                            <Users size={24} />
                        </div>
                        <div className={styles.statContent}>
                            <div className={styles.statValue}>{totalUsers}</div>
                            <div className={styles.statLabel}>Total Users</div>
                        </div>
                    </div>
                    
                    <div className={styles.statCard}>
                        <div className={`${styles.statIcon} ${styles.statIconAdmins}`}>
                            <Shield size={24} />
                        </div>
                        <div className={styles.statContent}>
                            <div className={styles.statValue}>{totalAdmins}</div>
                            <div className={styles.statLabel}>Administrators</div>
                        </div>
                    </div>
                    
                    <div className={styles.statCard}>
                        <div className={`${styles.statIcon} ${styles.statIconBalance}`}>
                            <DollarSign size={24} />
                        </div>
                        <div className={styles.statContent}>
                            <div className={styles.statValue}>${totalBalance.toFixed(0)}</div>
                            <div className={styles.statLabel}>Total Balance</div>
                        </div>
                    </div>
                    
                    <div className={styles.statCard}>
                        <div className={`${styles.statIcon} ${styles.statIconActive}`}>
                            <Activity size={24} />
                        </div>
                        <div className={styles.statContent}>
                            <div className={styles.statValue}>{activeUsers}</div>
                            <div className={styles.statLabel}>Active Users</div>
                        </div>
                    </div>
                </div>

                {/* User Cards */}
                {totalUsers > 0 ? (
                    <div className={styles.usersGrid}>
                        {users.map(user => (
                            <div key={user._id} className={styles.userCard}>
                                <div className={styles.cardHeader}>
                                    <div className={styles.cardTitle}>
                                        <div className={styles.avatar}>
                                            {user.username.substring(0, 2).toUpperCase()}
                                        </div>
                                        <div className={styles.userInfo}>
                                            <h3>{user.username}</h3>
                                            <p>{user.email}</p>
                                        </div>
                                    </div>
                                    <div className={`${styles.roleBadge} ${user.role === 'ADMIN' ? styles.roleAdmin : styles.roleUser}`}>
                                        {user.role === 'ADMIN' && <Shield size={14} />}
                                        {user.role === 'USER' && <UserCheck size={14} />}
                                        {user.role}
                                    </div>
                                </div>

                                <div className={styles.cardContent}>
                                    <div className={styles.cardInfo}>
                                        <div className={styles.infoItem}>
                                            <Mail size={16} />
                                            <span>{user.email}</span>
                                        </div>
                                        
                                        <div className={styles.infoItem}>
                                            <UserCheck size={16} />
                                            <span>ID: {user._id.slice(-6)}</span>
                                        </div>
                                        
                                        <div className={styles.infoItem}>
                                            <Calendar size={16} />
                                            <span>{formatDate(user.createdAt)}</span>
                                        </div>
                                        
                                        <div className={styles.infoItem}>
                                            <Activity size={16} />
                                            <span>{formatDate(user.lastLogin)}</span>
                                        </div>

                                        <div className={styles.balanceSection}>
                                            <div className={styles.balance}>
                                                ${user.balance.toFixed(2)}
                                            </div>
                                            <div className={styles.balanceLabel}>
                                                Account Balance
                                            </div>
                                        </div>
                                    </div>

                                    <div className={styles.cardActions}>
                                        <button
                                            className={`${styles.actionBtn} ${styles.editBtn}`}
                                            onClick={() => handleOpenEditModal(user)}
                                            title="Edit User"
                                        >
                                            <Edit size={16} />
                                            <span>Edit</span>
                                        </button>
                                        <button
                                            className={`${styles.actionBtn} ${styles.deleteBtn}`}
                                            onClick={() => handleDeleteUser(user._id)}
                                            title="Delete User"
                                        >
                                            <Trash2 size={16} />
                                            <span>Delete</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className={styles.emptyState}>
                        <Users size={48} />
                        <h3>No users found</h3>
                        <p>There are currently no users in the system. User data will appear here as people register on the platform.</p>
                    </div>
                )}

                {/* Pagination */}
                {pagination.totalPages > 1 && (
                    <div className={styles.paginationSection}>
                        <Pagination
                            currentPage={pagination.currentPage}
                            totalPages={pagination.totalPages}
                            totalItems={pagination.totalItems}
                            itemsPerPage={pagination.itemsPerPage}
                            onPageChange={handlePageChange}
                            hasNext={pagination.hasNext}
                            hasPrev={pagination.hasPrev}
                        />
                    </div>
                )}
            </div>
            
            <EditUserModal
                isOpen={isEditModalOpen}
                user={editingUser}
                onClose={handleCloseEditModal}
                onSave={handleSaveUser}
            />
            
            <ConfirmationModal
                isOpen={showConfirmModal}
                title="Delete User"
                message="Are you sure you want to delete this user? This action cannot be undone."
                onConfirm={confirmDeleteUser}
                onClose={cancelDelete}
                confirmText="Delete"
                cancelText="Cancel"
            />
        </>
    );
};

export default UsersPage;