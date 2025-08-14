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
import { getKycSubmissions, reviewKycSubmission, getKycDocumentFile, type IKycSubmission } from '../../services/adminService';
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
    const [submissions, setSubmissions] = useState<IKycSubmission[]>([]);
    const [loading, setLoading] = useState(true);
    const [viewingDoc, setViewingDoc] = useState<string | null>(null);
    const [filter, setFilter] = useState<KycFilter>('PENDING');
    const [stats, setStats] = useState<KycStats>({ total: 0, pending: 0, approved: 0, rejected: 0 });

    const fetchSubmissions = useCallback(async () => {
        try {
            setLoading(true);
            const data = await getKycSubmissions(filter);
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
            const allSubmissions = await getKycSubmissions('ALL');
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
                                    <p><strong>Documents Count:</strong> {sub.kycDocuments?.length || 0} document(s)</p>
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

                                {/* Actions for pending requests */}
                                {sub.kycStatus === 'PENDING' && (
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
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default KYCPage;