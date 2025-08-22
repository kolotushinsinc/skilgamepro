import React, { useState, useEffect, useCallback } from 'react';
import { tournamentTemplateService } from '../../services/tournamentTemplateService.ts';
import type { TournamentTemplate, SchedulerStats, IPaginationInfo, ITemplatesResponse } from '../../services/tournamentTemplateService.ts';
import TemplateCard from '../../components/AutoTournaments/TemplateCard.tsx';
import TemplateFormModal from '../../components/AutoTournaments/TemplateFormModal.tsx';
import SchedulerStatsCard from '../../components/AutoTournaments/SchedulerStatsCard.tsx';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import ConfirmationModal from '../../components/modals/ConfirmationModal';
import Pagination from '../../components/ui/Pagination';
import styles from './AutoTournamentsPage.module.css';
import {
    RefreshCw,
    Plus,
    FileStack,
    Zap,
    Activity,
    Clock,
    CheckCircle,
    XCircle,
    Settings
} from 'lucide-react';

const AutoTournamentsPage: React.FC = () => {
    const [templates, setTemplates] = useState<TournamentTemplate[]>([]);
    const [pagination, setPagination] = useState<IPaginationInfo>({
        currentPage: 1,
        totalPages: 1,
        totalItems: 0,
        itemsPerPage: 5,
        hasNext: false,
        hasPrev: false
    });
    const [schedulerStats, setSchedulerStats] = useState<SchedulerStats | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [editingTemplate, setEditingTemplate] = useState<TournamentTemplate | null>(null);
    const [filters, setFilters] = useState({
        status: 'all',
        gameType: 'all',
        search: ''
    });
    const [showDefaultTemplatesConfirm, setShowDefaultTemplatesConfirm] = useState(false);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [templateToDelete, setTemplateToDelete] = useState<string | null>(null);

    const loadData = useCallback(async (page: number = 1) => {
        try {
            setLoading(true);
            const query = {
                page,
                limit: 5,
                ...(filters.status !== 'all' && { status: filters.status }),
                ...(filters.gameType !== 'all' && { gameType: filters.gameType }),
                ...(filters.search && { search: filters.search })
            };
            
            const [templatesResponse, statsData] = await Promise.all([
                tournamentTemplateService.getAllTemplates(query),
                tournamentTemplateService.getSchedulerStats()
            ]);
            setTemplates(templatesResponse.data);
            setPagination(templatesResponse.pagination);
            setSchedulerStats(statsData);
            setError(null);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, [filters]);

    useEffect(() => {
        loadData(1);
    }, [loadData]);

    const handlePageChange = (page: number) => {
        // Scroll to top for better UX
        window.scrollTo({ top: 0, behavior: 'smooth' });
        loadData(page);
    };

    const handleFilterChange = (newFilters: Partial<typeof filters>) => {
        setFilters(prev => ({ ...prev, ...newFilters }));
    };

    const applyFilters = () => {
        // Scroll to top for better UX
        window.scrollTo({ top: 0, behavior: 'smooth' });
        loadData(1);
    };

    const clearFilters = () => {
        setFilters({
            status: 'all',
            gameType: 'all',
            search: ''
        });
        // Scroll to top for better UX
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleCreateTemplate = async (templateData: any) => {
        try {
            await tournamentTemplateService.createTemplate(templateData);
            await loadData(pagination.currentPage);
            setShowCreateModal(false);
        } catch (err: any) {
            throw new Error(err.message);
        }
    };

    const handleUpdateTemplate = async (templateId: string, updateData: any) => {
        try {
            await tournamentTemplateService.updateTemplate(templateId, updateData);
            await loadData(pagination.currentPage);
            setEditingTemplate(null);
        } catch (err: any) {
            throw new Error(err.message);
        }
    };

    const handleDeleteTemplate = (templateId: string) => {
        setTemplateToDelete(templateId);
        setShowDeleteConfirm(true);
    };

    const handleConfirmDeleteTemplate = async () => {
        if (templateToDelete) {
            try {
                await tournamentTemplateService.deleteTemplate(templateToDelete);
                await loadData(pagination.currentPage);
            } catch (err: any) {
                setError(`Delete error: ${err.message}`);
            }
        }
        setShowDeleteConfirm(false);
        setTemplateToDelete(null);
    };

    const handleCancelDeleteTemplate = () => {
        setShowDeleteConfirm(false);
        setTemplateToDelete(null);
    };

    const handleToggleActive = async (templateId: string) => {
        try {
            await tournamentTemplateService.toggleTemplateActive(templateId);
            await loadData(pagination.currentPage);
        } catch (err: any) {
            setError(`Toggle error: ${err.message}`);
        }
    };

    const handleSchedulerAction = async (action: 'start' | 'stop' | 'forceCheck') => {
        try {
            switch (action) {
                case 'start':
                    await tournamentTemplateService.startScheduler();
                    break;
                case 'stop':
                    await tournamentTemplateService.stopScheduler();
                    break;
                case 'forceCheck':
                    await tournamentTemplateService.forceSchedulerCheck();
                    break;
            }
            await loadData(pagination.currentPage);
        } catch (err: any) {
            setError(`Scheduler action error: ${err.message}`);
        }
    };

    const handleCreateDefaultTemplates = () => {
        setShowDefaultTemplatesConfirm(true);
    };

    const handleConfirmCreateDefaultTemplates = async () => {
        setShowDefaultTemplatesConfirm(false);
        try {
            await tournamentTemplateService.createDefaultTemplates();
            await loadData(pagination.currentPage);
            // You could add a success notification here instead of alert
        } catch (err: any) {
            setError(`Template creation error: ${err.message}`);
        }
    };

    const handleCancelCreateDefaultTemplates = () => {
        setShowDefaultTemplatesConfirm(false);
    };

    if (loading && templates.length === 0) {
        return <div className={styles.loadingContainer}><LoadingSpinner size="large" /></div>;
    }

    // Calculate statistics from pagination data
    const totalTemplates = pagination.totalItems;
    const activeTemplates = templates.filter(t => t.isActive).length;
    const inactiveTemplates = templates.filter(t => !t.isActive).length;
    const schedulerRunning = schedulerStats?.isRunning || false;

    return (
        <div className={styles.pageContainer}>
            <div className={styles.pageHeader}>
                <div className={styles.headerContent}>
                    <div className={styles.titleSection}>
                        <Zap className={styles.pageIcon} />
                        <div>
                            <h1 className={styles.pageTitle}>Auto Tournaments</h1>
                            <p className={styles.pageSubtitle}>Automated tournament scheduling and management</p>
                        </div>
                    </div>
                    <div className={styles.headerActions}>
                        <button
                            onClick={() => loadData(pagination.currentPage)}
                            className={`${styles.btn} ${styles.refreshButton} ${loading ? styles.loading : ''}`}
                            disabled={loading}
                        >
                            <RefreshCw size={18} />
                            <span>Refresh</span>
                        </button>
                        <button
                            onClick={() => setShowCreateModal(true)}
                            className={`${styles.btn} ${styles.createButton}`}
                        >
                            <Plus size={18} />
                            <span>Create Template</span>
                        </button>
                        <button
                            onClick={handleCreateDefaultTemplates}
                            className={`${styles.btn} ${styles.defaultsButton}`}
                        >
                            <FileStack size={18} />
                            <span>Default Templates</span>
                        </button>
                    </div>
                </div>
            </div>

            {error && (
                <div className={styles.errorContainer}>
                    <p>{error}</p>
                    <button onClick={() => loadData(pagination.currentPage)} className={`${styles.btn} ${styles.retryButton}`}>
                        <RefreshCw size={16} />
                        Retry
                    </button>
                </div>
            )}

            {/* Statistics Cards */}
            <div className={styles.statsGrid}>
                <div className={styles.statCard}>
                    <div className={styles.statIcon}>
                        <FileStack size={24} />
                    </div>
                    <div className={styles.statContent}>
                        <div className={styles.statValue}>{totalTemplates}</div>
                        <div className={styles.statLabel}>Total Templates</div>
                    </div>
                </div>
                
                <div className={styles.statCard}>
                    <div className={styles.statIcon}>
                        <CheckCircle size={24} />
                    </div>
                    <div className={styles.statContent}>
                        <div className={styles.statValue}>{activeTemplates}</div>
                        <div className={styles.statLabel}>Active Templates</div>
                    </div>
                </div>
                
                <div className={styles.statCard}>
                    <div className={styles.statIcon}>
                        <XCircle size={24} />
                    </div>
                    <div className={styles.statContent}>
                        <div className={styles.statValue}>{inactiveTemplates}</div>
                        <div className={styles.statLabel}>Inactive Templates</div>
                    </div>
                </div>
                
                <div className={styles.statCard}>
                    <div className={styles.statIcon}>
                        {schedulerRunning ? <Activity size={24} /> : <Clock size={24} />}
                    </div>
                    <div className={styles.statContent}>
                        <div className={styles.statValue}>{schedulerRunning ? 'Running' : 'Stopped'}</div>
                        <div className={styles.statLabel}>Scheduler Status</div>
                    </div>
                </div>
            </div>

            {/* Scheduler Statistics */}
            {schedulerStats && (
                <SchedulerStatsCard 
                    stats={schedulerStats}
                    onSchedulerAction={handleSchedulerAction}
                />
            )}

            {/* Filters */}
            <div className={styles.filtersSection}>
                <div className={styles.filterGroup}>
                    <label>Status:</label>
                    <select
                        value={filters.status}
                        onChange={(e) => handleFilterChange({ status: e.target.value })}
                        className={styles.filterSelect}
                    >
                        <option value="all">All Templates</option>
                        <option value="active">Active Only</option>
                        <option value="inactive">Inactive Only</option>
                    </select>
                </div>
                <div className={styles.filterGroup}>
                    <label>Game Type:</label>
                    <select
                        value={filters.gameType}
                        onChange={(e) => handleFilterChange({ gameType: e.target.value })}
                        className={styles.filterSelect}
                    >
                        <option value="all">All Games</option>
                        <option value="chess">♔ Chess</option>
                        <option value="checkers">⚫ Checkers</option>
                        <option value="tic-tac-toe">⭕ Tic-Tac-Toe</option>
                        <option value="backgammon">🎲 Backgammon</option>
                        <option value="durak">🃏 Durak</option>
                        <option value="domino">🀰 Domino</option>
                        <option value="dice">🎲 Dice</option>
                        <option value="bingo">🎯 Bingo</option>
                    </select>
                </div>
                <div className={styles.filterGroup}>
                    <input
                        type="text"
                        placeholder="Search templates..."
                        value={filters.search}
                        onChange={(e) => handleFilterChange({ search: e.target.value })}
                        onKeyPress={(e) => e.key === 'Enter' && applyFilters()}
                        className={styles.searchInput}
                    />
                </div>
                <div className={styles.filterActions}>
                    <button
                        onClick={applyFilters}
                        className={`${styles.btn} ${styles.btnPrimary}`}
                    >
                        Apply Filters
                    </button>
                    <button
                        onClick={clearFilters}
                        className={`${styles.btn} ${styles.btnSecondary}`}
                    >
                        Clear
                    </button>
                </div>
                <div className={styles.filterInfo}>
                    Showing: {templates.length} of {pagination.totalItems} templates
                </div>
            </div>

            {/* Templates List */}
            {templates.length === 0 ? (
                <div className={styles.emptyState}>
                    <Settings size={48} />
                    <h3>No Templates Found</h3>
                    <p>
                        {filters.status === 'all' && filters.gameType === 'all' && !filters.search
                            ? 'Create your first template or load default templates to get started'
                            : 'Change filter or create a new template to see results'
                        }
                    </p>
                    {filters.status === 'all' && filters.gameType === 'all' && !filters.search && (
                        <div className={styles.emptyActions}>
                            <button
                                onClick={() => setShowCreateModal(true)}
                                className={`${styles.btn} ${styles.createButton}`}
                            >
                                <Plus size={16} />
                                Create Template
                            </button>
                            <button
                                onClick={handleCreateDefaultTemplates}
                                className={`${styles.btn} ${styles.defaultsButton}`}
                            >
                                <FileStack size={16} />
                                Default Templates
                            </button>
                        </div>
                    )}
                </div>
            ) : (
                <div className={styles.templatesGrid}>
                    {templates.map(template => (
                        <TemplateCard
                            key={template._id}
                            template={template}
                            onEdit={() => setEditingTemplate(template)}
                            onDelete={() => handleDeleteTemplate(template._id)}
                            onToggleActive={() => handleToggleActive(template._id)}
                        />
                    ))}
                </div>
            )}

            {/* Pagination */}
            {templates.length > 0 && (
                <Pagination
                    currentPage={pagination.currentPage}
                    totalPages={pagination.totalPages}
                    totalItems={pagination.totalItems}
                    itemsPerPage={pagination.itemsPerPage}
                    hasNext={pagination.hasNext}
                    hasPrev={pagination.hasPrev}
                    onPageChange={handlePageChange}
                />
            )}

            {/* Modal Windows */}
            {showCreateModal && (
                <TemplateFormModal
                    isOpen={showCreateModal}
                    onClose={() => setShowCreateModal(false)}
                    onSubmit={handleCreateTemplate}
                    title="Create Tournament Template"
                />
            )}

            {editingTemplate && (
                <TemplateFormModal
                    isOpen={!!editingTemplate}
                    onClose={() => setEditingTemplate(null)}
                    onSubmit={(data) => handleUpdateTemplate(editingTemplate._id, data)}
                    template={editingTemplate}
                    title="Edit Template"
                />
            )}

            {/* Default Templates Confirmation Modal */}
            <ConfirmationModal
                isOpen={showDefaultTemplatesConfirm}
                onClose={handleCancelCreateDefaultTemplates}
                onConfirm={handleConfirmCreateDefaultTemplates}
                title="Create Default Templates"
                message="Create default tournament templates? This will create standard templates for all games."
                confirmText="Create Templates"
                cancelText="Cancel"
                type="info"
            />

            {/* Delete Template Confirmation Modal */}
            <ConfirmationModal
                isOpen={showDeleteConfirm}
                onClose={handleCancelDeleteTemplate}
                onConfirm={handleConfirmDeleteTemplate}
                title="Delete Template"
                message="Are you sure you want to delete this template? This action cannot be undone."
                confirmText="Delete Template"
                cancelText="Cancel"
                type="danger"
            />
        </div>
    );
};

export default AutoTournamentsPage;