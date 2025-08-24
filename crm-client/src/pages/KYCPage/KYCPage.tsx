import React, { useState, useEffect, useCallback } from 'react';
import { 
  Shield, 
  FileCheck, 
  Clock, 
  CheckCircle, 
  XCircle, 
  User, 
  Mail, 
  Eye, 
  Download,
  AlertTriangle,
  FileText,
  Users,
  TrendingUp
} from 'lucide-react';
import {
    getEnhancedKycSubmissions,
    reviewKycSubmission,
    getKycDocumentFile,
    getSumsubApplicantInfo,
    syncSumsubStatus,
    type IEnhancedKycSubmission
} from '../../services/adminService';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import styles from './KYCPage.module.css';

type KycFilter = 'PENDING' | 'APPROVED' | 'REJECTED' | 'ALL';

interface KycStats {
  total: number;
  pending: number;
  approved: number;
  rejected: number;
}

const KYCPage: React.FC = () => {
    const [submissions, setSubmissions] = useState<IEnhancedKycSubmission[]>([]);
    const [loading, setLoading] = useState(true);
    const [viewingDoc, setViewingDoc] = useState<string | null>(null);
    const [filter, setFilter] = useState<KycFilter>('PENDING');
    const [stats, setStats] = useState<KycStats>({ total: 0, pending: 0, approved: 0, rejected: 0 });
    const [sumsubDetails, setSumsubDetails] = useState<{[userId: string]: any}>({});
    const [syncing, setSyncing] = useState<{[userId: string]: boolean}>({});

    const fetchSubmissions = useCallback(async () => {
        try {
            setLoading(true);
            const data = await getEnhancedKycSubmissions(filter);
            setSubmissions(data);
        } catch (error) {
            console.error("Failed to fetch KYC submissions", error);
        } finally {
            setLoading(false);
        }
    }, [filter]);

    const fetchStats = useCallback(async () => {
        try {
            // Fetch all submissions to calculate stats
            const allSubmissions = await getEnhancedKycSubmissions('ALL');
            const stats = {
                total: allSubmissions.length,
                pending: allSubmissions.filter(sub => sub.kycStatus === 'PENDING').length,
                approved: allSubmissions.filter(sub => sub.kycStatus === 'APPROVED').length,
                rejected: allSubmissions.filter(sub => sub.kycStatus === 'REJECTED').length,
            };
            setStats(stats);
        } catch (error) {
            console.error("Failed to fetch KYC stats", error);
        }
    }, []);

    useEffect(() => {
        fetchSubmissions();
        fetchStats();
    }, [fetchSubmissions, fetchStats]);

    const handleReview = async (userId: string, username: string, action: 'APPROVE' | 'REJECT') => {
        let reason: string | null = null;
        const actionText = action === 'APPROVE' ? 'approve' : 'reject';

        if (!window.confirm(`Are you sure you want to ${actionText} verification request from user ${username}?`)) {
            return;
        }

        if (action === 'REJECT') {
            reason = prompt('Please provide the reason for rejection:');
            if (!reason) return;
        }

        try {
            await reviewKycSubmission(userId, action, reason || undefined);
            fetchSubmissions();
            fetchStats(); // Refresh stats after review
        } catch (error) {
            alert('Failed to process the verification request.');
        }
    };

    const handleViewDocument = async (userId: string, filePath: string) => {
        const fileName = filePath.split(/[\\/]/).pop();
        if (!fileName) return;

        setViewingDoc(filePath);
        try {
            const fileBlob = await getKycDocumentFile(userId, fileName);
            const fileURL = URL.createObjectURL(fileBlob);
            window.open(fileURL, '_blank');
        } catch (error) {
            alert('Failed to load document.');
            console.error(error);
        } finally {
            setViewingDoc(null);
        }
    };

    const handleViewSumsubDetails = async (userId: string) => {
        try {
            setLoading(true);
            const details = await getSumsubApplicantInfo(userId);
            setSumsubDetails(prev => ({ ...prev, [userId]: details }));
        } catch (error) {
            console.error('Failed to fetch Sumsub details:', error);
            alert('Failed to fetch Sumsub details');
        } finally {
            setLoading(false);
        }
    };

    const handleSyncSumsubStatus = async (userId: string) => {
        try {
            setSyncing(prev => ({ ...prev, [userId]: true }));
            const result = await syncSumsubStatus(userId);
            
            // Обновляем локальные данные
            await fetchSubmissions();
            await fetchStats();
            
            alert(`Status synchronized successfully. Old: ${result.oldStatus}, New: ${result.newStatus}`);
        } catch (error: any) {
            console.error('Failed to sync Sumsub status:', error);
            alert(`Failed to sync status: ${error.response?.data?.message || error.message}`);
        } finally {
            setSyncing(prev => ({ ...prev, [userId]: false }));
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'PENDING':
                return <Clock className={styles.statusIcon} />;
            case 'APPROVED':
                return <CheckCircle className={styles.statusIcon} />;
            case 'REJECTED':
                return <XCircle className={styles.statusIcon} />;
            default:
                return <AlertTriangle className={styles.statusIcon} />;
        }
    };

    const getStatusClass = (status: string) => {
        switch (status) {
            case 'PENDING':
                return styles.statusPending;
            case 'APPROVED':
                return styles.statusApproved;
            case 'REJECTED':
                return styles.statusRejected;
            default:
                return styles.statusPending;
        }
    };

    const getProviderBadge = (provider: string) => {
        return (
            <span
                className={`${styles.providerBadge} ${provider === 'SUMSUB' ? styles.sumsubProvider : styles.legacyProvider}`}
                style={{
                    padding: '2px 8px',
                    borderRadius: '12px',
                    fontSize: '0.75rem',
                    fontWeight: '600',
                    background: provider === 'SUMSUB' ? '#6366f1' : '#64748b',
                    color: 'white'
                }}
            >
                {provider || 'LEGACY'}
            </span>
        );
    };

    if (loading && submissions.length === 0) {
        return (
            <div className={styles.container}>
                <div className={styles.loading}>
                    <Shield className={styles.loadingIcon} />
                    <p>Loading verification requests...</p>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            {/* Header with Stats */}
            <div className={styles.header}>
                <h1 className={styles.title}>
                    <Shield className={styles.titleIcon} />
                    Verification Requests (KYC)
                </h1>
                <p className={styles.subtitle}>
                    Review and manage user identity verification requests and documents
                </p>
                
                <div className={styles.statsGrid}>
                    <div className={styles.statCard}>
                        <Users className={styles.statIcon} />
                        <div>
                            <p className={styles.statValue}>{stats.total}</p>
                            <p className={styles.statLabel}>Total Requests</p>
                        </div>
                    </div>
                    <div className={styles.statCard}>
                        <Clock className={styles.statIcon} style={{ color: '#f59e0b' }} />
                        <div>
                            <p className={styles.statValue}>{stats.pending}</p>
                            <p className={styles.statLabel}>Pending Review</p>
                        </div>
                    </div>
                    <div className={styles.statCard}>
                        <CheckCircle className={styles.statIcon} style={{ color: '#10b981' }} />
                        <div>
                            <p className={styles.statValue}>{stats.approved}</p>
                            <p className={styles.statLabel}>Approved</p>
                        </div>
                    </div>
                    <div className={styles.statCard}>
                        <XCircle className={styles.statIcon} style={{ color: '#ef4444' }} />
                        <div>
                            <p className={styles.statValue}>{stats.rejected}</p>
                            <p className={styles.statLabel}>Rejected</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className={styles.card}>
                <div className={styles.filterBar}>
                    <button 
                        onClick={() => setFilter('PENDING')} 
                        className={`${styles.filterButton} ${filter === 'PENDING' ? styles.active : ''}`}
                    >
                        <Clock className={styles.btnIcon} />
                        Pending
                    </button> 
                    <button 
                        onClick={() => setFilter('APPROVED')} 
                        className={`${styles.filterButton} ${filter === 'APPROVED' ? styles.active : ''}`}
                    >
                        <CheckCircle className={styles.btnIcon} />
                        Approved
                    </button> 
                    <button 
                        onClick={() => setFilter('REJECTED')} 
                        className={`${styles.filterButton} ${filter === 'REJECTED' ? styles.active : ''}`}
                    >
                        <XCircle className={styles.btnIcon} />
                        Rejected
                    </button> 
                    <button 
                        onClick={() => setFilter('ALL')} 
                        className={`${styles.filterButton} ${filter === 'ALL' ? styles.active : ''}`}
                    >
                        <Users className={styles.btnIcon} />
                        All Requests
                    </button>
                </div>

                {loading ? (
                    <div className={styles.loading}>
                        <LoadingSpinner />
                        <p>Loading requests...</p>
                    </div>
                ) : submissions.length === 0 ? (
                    <div className={styles.emptyState}>
                        <FileCheck className={styles.emptyStateIcon} />
                        <h3>No Verification Requests</h3>
                        <p>There are no verification requests in this category. New requests will appear here when users submit their documents for verification.</p>
                    </div>
                ) : (
                    <div className={styles.submissionList}>
                        {submissions.map(sub => (
                            <div key={sub._id} className={styles.submissionCard}>
                                <div className={styles.submissionHeader}>
                                    <div className={styles.userInfo}>
                                        <h3 className={styles.userName}>
                                            <User className={styles.documentIcon} />
                                            {sub.username}
                                        </h3>
                                        <p className={styles.userEmail}>
                                            <Mail className={styles.documentIcon} />
                                            {sub.email}
                                        </p>
                                    </div>
                                    <div className={`${styles.statusBadge} ${getStatusClass(sub.kycStatus)}`}>
                                        {getStatusIcon(sub.kycStatus)}
                                        {sub.kycStatus}
                                    </div>
                                </div>

                                <div className={styles.submissionInfo}>
                                    <p><strong>Request ID:</strong> {sub._id}</p>
                                    <p><strong>Status:</strong> {sub.kycStatus}</p>
                                    <p><strong>Provider:</strong> {getProviderBadge(sub.kycProvider || 'LEGACY')}</p>
                                    {sub.sumsubData?.applicantId && (
                                        <p><strong>Sumsub Applicant ID:</strong> {sub.sumsubData.applicantId}</p>
                                    )}
                                </div>

                                {/* Documents */}
                                {sub.kycDocuments && sub.kycDocuments.map((doc: any, index: number) => (
                                    <div key={index} className={styles.documentSection}>
                                        <p className={styles.documentType}>
                                            <FileText className={styles.documentIcon} />
                                            <strong>Document Type:</strong> {doc.documentType}
                                        </p>
                                        <button 
                                            onClick={() => handleViewDocument(sub._id, doc.filePath)}
                                            className={styles.documentLink}
                                            disabled={viewingDoc === doc.filePath}
                                        >
                                            {viewingDoc === doc.filePath ? (
                                                <>
                                                    <Clock className={styles.documentLinkIcon} />
                                                    Loading...
                                                </>
                                            ) : (
                                                <>
                                                    <Eye className={styles.documentLinkIcon} />
                                                    View Document
                                                </>
                                            )}
                                        </button>
                                    </div>
                                ))}

                                {/* Sumsub specific info and actions */}
                                {sub.kycProvider === 'SUMSUB' && sub.sumsubData?.applicantId && (
                                    <div className={styles.sumsubSection}>
                                        <div className={styles.sumsubActions}>
                                            <button
                                                onClick={() => handleViewSumsubDetails(sub._id)}
                                                className={styles.sumsubButton}
                                                disabled={loading}
                                            >
                                                <Eye className={styles.documentLinkIcon} />
                                                View Sumsub Details
                                            </button>
                                            <button
                                                onClick={() => handleSyncSumsubStatus(sub._id)}
                                                className={styles.sumsubButton}
                                                disabled={syncing[sub._id]}
                                            >
                                                {syncing[sub._id] ? (
                                                    <>
                                                        <Clock className={styles.documentLinkIcon} />
                                                        Syncing...
                                                    </>
                                                ) : (
                                                    <>
                                                        <TrendingUp className={styles.documentLinkIcon} />
                                                        Sync Status
                                                    </>
                                                )}
                                            </button>
                                        </div>

                                        {sumsubDetails[sub._id] && (
                                            <div className={styles.sumsubDetails}>
                                                <h4>Sumsub Details:</h4>
                                                <div className={styles.detailsGrid}>
                                                    <p><strong>Applicant ID:</strong> {sumsubDetails[sub._id].sumsub.applicantId}</p>
                                                    <p><strong>Level:</strong> {sumsubDetails[sub._id].sumsub.levelName}</p>
                                                    <p><strong>Review Status:</strong> {sumsubDetails[sub._id].sumsub.verificationStatus.status}</p>
                                                    {sumsubDetails[sub._id].sumsub.verificationStatus.reviewResult && (
                                                        <p><strong>Review Result:</strong> {sumsubDetails[sub._id].sumsub.verificationStatus.reviewResult}</p>
                                                    )}
                                                    {sumsubDetails[sub._id].sumsub.verificationStatus.moderationComment && (
                                                        <p><strong>Comment:</strong> {sumsubDetails[sub._id].sumsub.verificationStatus.moderationComment}</p>
                                                    )}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                )}

                                {/* Actions for pending requests - only show for legacy KYC or manual review needed */}
                                {sub.kycStatus === 'PENDING' && sub.kycProvider !== 'SUMSUB' && (
                                    <div className={styles.actions}>
                                        <button 
                                            onClick={() => handleReview(sub._id, sub.username, 'APPROVE')} 
                                            className={`${styles.btn} ${styles.btnApprove}`}
                                        >
                                            <CheckCircle className={styles.btnIcon} />
                                            Approve Request
                                        </button>
                                        <button 
                                            onClick={() => handleReview(sub._id, sub.username, 'REJECT')} 
                                            className={`${styles.btn} ${styles.btnReject}`}
                                        >
                                            <XCircle className={styles.btnIcon} />
                                            Reject Request
                                        </button>
                                    </div>
                                )}

                                {/* Warning for Sumsub pending requests */}
                                {sub.kycStatus === 'PENDING' && sub.kycProvider === 'SUMSUB' && (
                                    <div className={styles.sumsubWarning}>
                                        <AlertTriangle className={styles.warningIcon} />
                                        <span>This verification is processed automatically by Sumsub. Manual review is not available.</span>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default KYCPage;