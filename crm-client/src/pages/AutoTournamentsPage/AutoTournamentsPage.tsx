import React, { useState, useEffect } from 'react';
import { tournamentTemplateService } from '../../services/tournamentTemplateService.ts';
import type { TournamentTemplate, SchedulerStats } from '../../services/tournamentTemplateService.ts';
import TemplateCard from '../../components/AutoTournaments/TemplateCard.tsx';
import TemplateFormModal from '../../components/AutoTournaments/TemplateFormModal.tsx';
import SchedulerStatsCard from '../../components/AutoTournaments/SchedulerStatsCard.tsx';
import styles from './AutoTournamentsPage.module.css';

const AutoTournamentsPage: React.FC = () => {
    const [templates, setTemplates] = useState<TournamentTemplate[]>([]);
    const [schedulerStats, setSchedulerStats] = useState<SchedulerStats | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [editingTemplate, setEditingTemplate] = useState<TournamentTemplate | null>(null);
    const [filter, setFilter] = useState<'all' | 'active' | 'inactive'>('all');

    useEffect(() => {
        loadData();
        // Update data every 30 seconds
        const interval = setInterval(loadData, 30000);
        return () => clearInterval(interval);
    }, []);

    const loadData = async () => {
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
    };

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
        return (
            <div className={styles.container}>
                <div className={styles.loading}>Loading...</div>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1>Auto Tournaments</h1>
                <div className={styles.headerActions}>
                    <button
                        onClick={loadData}
                        className={styles.refreshButton}
                        disabled={loading}
                    >
                        🔄 Refresh
                    </button>
                    <button
                        onClick={() => setShowCreateModal(true)}
                        className={styles.createButton}
                    >
                        ➕ Create Template
                    </button>
                    <button
                        onClick={handleCreateDefaultTemplates}
                        className={styles.defaultsButton}
                    >
                        📋 Default Templates
                    </button>
                </div>
            </div>

            {error && (
                <div className={styles.error}>
                    ❌ {error}
                    <button onClick={loadData} className={styles.retryButton}>
                        Retry
                    </button>
                </div>
            )}

            {/* Scheduler Statistics */}
            {schedulerStats && (
                <SchedulerStatsCard 
                    stats={schedulerStats}
                    onSchedulerAction={handleSchedulerAction}
                />
            )}

            {/* Filters */}
            <div className={styles.filters}>
                <div className={styles.filterGroup}>
                    <label>Status:</label>
                    <select
                        value={filter}
                        onChange={(e) => setFilter(e.target.value as any)}
                        className={styles.filterSelect}
                    >
                        <option value="all">All</option>
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                    </select>
                </div>
                <div className={styles.filterInfo}>
                    Showing: {filteredTemplates.length} of {templates.length} templates
                </div>
            </div>

            {/* Templates List */}
            <div className={styles.templatesList}>
                {filteredTemplates.length === 0 ? (
                    <div className={styles.emptyState}>
                        <h3>No Templates Found</h3>
                        <p>
                            {filter === 'all'
                                ? 'Create your first template or load default templates'
                                : 'Change filter or create a new template'
                            }
                        </p>
                        {filter === 'all' && (
                            <div className={styles.emptyActions}>
                                <button
                                    onClick={() => setShowCreateModal(true)}
                                    className={styles.createButton}
                                >
                                    Create Template
                                </button>
                                <button
                                    onClick={handleCreateDefaultTemplates}
                                    className={styles.defaultsButton}
                                >
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
            </div>

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