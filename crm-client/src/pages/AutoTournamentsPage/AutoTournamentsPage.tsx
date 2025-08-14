import React, { useState, useEffect, useCallback } from 'react';
import { tournamentTemplateService } from '../../services/tournamentTemplateService.ts';
import type { TournamentTemplate, SchedulerStats } from '../../services/tournamentTemplateService.ts';
import TemplateCard from '../../components/AutoTournaments/TemplateCard.tsx';
import TemplateFormModal from '../../components/AutoTournaments/TemplateFormModal.tsx';
import SchedulerStatsCard from '../../components/AutoTournaments/SchedulerStatsCard.tsx';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
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
    const [schedulerStats, setSchedulerStats] = useState<SchedulerStats | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [editingTemplate, setEditingTemplate] = useState<TournamentTemplate | null>(null);
    const [filter, setFilter] = useState<'all' | 'active' | 'inactive'>('all');

    const loadData = useCallback(async () => {
        try {
            setLoading(true);
            const [templatesData, statsData] = await Promise.all([
                tournamentTemplateService.getAllTemplates(),
                tournamentTemplateService.getSchedulerStats()
            ]);
            setTemplates(templatesData);
            setSchedulerStats(statsData);
            setError(null);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        loadData();
        // Update data every 30 seconds
        const interval = setInterval(loadData, 30000);
        return () => clearInterval(interval);
    }, [loadData]);

    const handleCreateTemplate = async (templateData: any) => {
        try {
            await tournamentTemplateService.createTemplate(templateData);
            await loadData();
            setShowCreateModal(false);
        } catch (err: any) {
            throw new Error(err.message);
        }
    };

    const handleUpdateTemplate = async (templateId: string, updateData: any) => {
        try {
            await tournamentTemplateService.updateTemplate(templateId, updateData);
            await loadData();
            setEditingTemplate(null);
        } catch (err: any) {
            throw new Error(err.message);
        }
    };

    const handleDeleteTemplate = async (templateId: string) => {
        if (window.confirm('Are you sure you want to delete this template?')) {
            try {
                await tournamentTemplateService.deleteTemplate(templateId);
                await loadData();
            } catch (err: any) {
                alert(`Delete error: ${err.message}`);
            }
        }
    };

    const handleToggleActive = async (templateId: string) => {
        try {
            await tournamentTemplateService.toggleTemplateActive(templateId);
            await loadData();
        } catch (err: any) {
            alert(`Toggle error: ${err.message}`);
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
            await loadData();
        } catch (err: any) {
            alert(`Scheduler action error: ${err.message}`);
        }
    };

    const handleCreateDefaultTemplates = async () => {
        if (window.confirm('Create default tournament templates? This will create standard templates for all games.')) {
            try {
                await tournamentTemplateService.createDefaultTemplates();
                await loadData();
                alert('Default templates created successfully!');
            } catch (err: any) {
                alert(`Template creation error: ${err.message}`);
            }
        }
    };

    const filteredTemplates = templates.filter(template => {
        if (filter === 'active') return template.isActive;
        if (filter === 'inactive') return !template.isActive;
        return true;
    });

    if (loading && templates.length === 0) {
        return <div className={styles.loadingContainer}><LoadingSpinner size="large" /></div>;
    }

    // Calculate statistics
    const totalTemplates = templates.length;
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
                            onClick={loadData}
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
                    <button onClick={loadData} className={`${styles.btn} ${styles.retryButton}`}>
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
                        value={filter}
                        onChange={(e) => setFilter(e.target.value as any)}
                        className={styles.filterSelect}
                    >
                        <option value="all">All Templates</option>
                        <option value="active">Active Only</option>
                        <option value="inactive">Inactive Only</option>
                    </select>
                </div>
                <div className={styles.filterInfo}>
                    Showing: {filteredTemplates.length} of {templates.length} templates
                </div>
            </div>

            {/* Templates List */}
            {filteredTemplates.length === 0 ? (
                <div className={styles.emptyState}>
                    <Settings size={48} />
                    <h3>No Templates Found</h3>
                    <p>
                        {filter === 'all'
                            ? 'Create your first template or load default templates to get started'
                            : 'Change filter or create a new template to see results'
                        }
                    </p>
                    {filter === 'all' && (
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
                    {filteredTemplates.map(template => (
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
        </div>
    );
};

export default AutoTournamentsPage;