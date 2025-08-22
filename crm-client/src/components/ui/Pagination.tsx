import React from 'react';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';
import styles from './Pagination.module.css';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
    hasNext: boolean;
    hasPrev: boolean;
    onPageChange: (page: number) => void;
    className?: string;
}

const Pagination: React.FC<PaginationProps> = ({
    currentPage,
    totalPages,
    totalItems,
    itemsPerPage,
    hasNext,
    hasPrev,
    onPageChange,
    className = ''
}) => {
    const startItem = (currentPage - 1) * itemsPerPage + 1;
    const endItem = Math.min(currentPage * itemsPerPage, totalItems);

    const getVisiblePages = () => {
        const pages: (number | string)[] = [];
        const maxVisible = 7;
        
        if (totalPages <= maxVisible) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            if (currentPage <= 4) {
                for (let i = 1; i <= 5; i++) {
                    pages.push(i);
                }
                pages.push('...');
                pages.push(totalPages);
            } else if (currentPage >= totalPages - 3) {
                pages.push(1);
                pages.push('...');
                for (let i = totalPages - 4; i <= totalPages; i++) {
                    pages.push(i);
                }
            } else {
                pages.push(1);
                pages.push('...');
                for (let i = currentPage - 1; i <= currentPage + 1; i++) {
                    pages.push(i);
                }
                pages.push('...');
                pages.push(totalPages);
            }
        }
        
        return pages;
    };

    if (totalPages <= 1) return null;

    return (
        <div className={`${styles.container} ${className}`}>
            <div className={styles.info}>
                Showing {startItem}-{endItem} of {totalItems} items
            </div>
            
            <div className={styles.controls}>
                <button
                    onClick={() => onPageChange(1)}
                    disabled={!hasPrev}
                    className={`${styles.button} ${styles.navButton}`}
                    title="First page"
                >
                    <ChevronsLeft size={16} />
                </button>
                
                <button
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={!hasPrev}
                    className={`${styles.button} ${styles.navButton}`}
                    title="Previous page"
                >
                    <ChevronLeft size={16} />
                </button>
                
                <div className={styles.pages}>
                    {getVisiblePages().map((page, index) => (
                        <React.Fragment key={index}>
                            {page === '...' ? (
                                <span className={styles.ellipsis}>...</span>
                            ) : (
                                <button
                                    onClick={() => onPageChange(page as number)}
                                    className={`${styles.button} ${styles.pageButton} ${
                                        page === currentPage ? styles.active : ''
                                    }`}
                                >
                                    {page}
                                </button>
                            )}
                        </React.Fragment>
                    ))}
                </div>
                
                <button
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={!hasNext}
                    className={`${styles.button} ${styles.navButton}`}
                    title="Next page"
                >
                    <ChevronRight size={16} />
                </button>
                
                <button
                    onClick={() => onPageChange(totalPages)}
                    disabled={!hasNext}
                    className={`${styles.button} ${styles.navButton}`}
                    title="Last page"
                >
                    <ChevronsRight size={16} />
                </button>
            </div>
        </div>
    );
};

export default Pagination;