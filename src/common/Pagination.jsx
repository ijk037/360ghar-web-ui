import { useMemo } from 'react';

/**
 * Functional Pagination component
 * @param {number} currentPage - Current active page (1-indexed)
 * @param {number} totalPages - Total number of pages
 * @param {function} onPageChange - Callback when page changes
 * @param {number} maxVisiblePages - Maximum visible page numbers (default: 5)
 */
const Pagination = ({ currentPage = 1, totalPages = 1, onPageChange, maxVisiblePages = 5 }) => {
    // Generate page numbers to display
    const pageNumbers = useMemo(() => {
        const pages = [];

        if (totalPages <= maxVisiblePages) {
            // Show all pages if total is less than max visible
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            // Calculate range around current page
            const halfVisible = Math.floor(maxVisiblePages / 2);
            let startPage = Math.max(1, currentPage - halfVisible);
            let endPage = Math.min(totalPages, currentPage + halfVisible);

            // Adjust if we're near the start
            if (currentPage <= halfVisible) {
                endPage = maxVisiblePages;
            }

            // Adjust if we're near the end
            if (currentPage > totalPages - halfVisible) {
                startPage = totalPages - maxVisiblePages + 1;
            }

            // Add first page and ellipsis if needed
            if (startPage > 1) {
                pages.push(1);
                if (startPage > 2) {
                    pages.push('ellipsis-start');
                }
            }

            // Add visible page numbers
            for (let i = startPage; i <= endPage; i++) {
                if (!pages.includes(i)) {
                    pages.push(i);
                }
            }

            // Add ellipsis and last page if needed
            if (endPage < totalPages) {
                if (endPage < totalPages - 1) {
                    pages.push('ellipsis-end');
                }
                if (!pages.includes(totalPages)) {
                    pages.push(totalPages);
                }
            }
        }

        return pages;
    }, [currentPage, totalPages, maxVisiblePages]);

    // Don't render if there's only one page or no pages
    if (totalPages <= 1) {
        return null;
    }

    const handlePageClick = (page) => {
        if (page !== currentPage && onPageChange) {
            onPageChange(page);
        }
    };

    const handlePrevClick = () => {
        if (currentPage > 1 && onPageChange) {
            onPageChange(currentPage - 1);
        }
    };

    const handleNextClick = () => {
        if (currentPage < totalPages && onPageChange) {
            onPageChange(currentPage + 1);
        }
    };

    return (
        <nav aria-label="Page navigation" className="mt-4">
            <ul className="pagination common-pagination justify-content-center">
                {/* Previous Button */}
                <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                    <button
                        className="page-link"
                        onClick={handlePrevClick}
                        disabled={currentPage === 1}
                        aria-label="Previous page"
                    >
                        <i className="fas fa-chevron-left"></i>
                    </button>
                </li>

                {/* Page Numbers */}
                {pageNumbers.map((page, index) => {
                    if (page === 'ellipsis-start' || page === 'ellipsis-end') {
                        return (
                            <li key={page} className="page-item disabled">
                                <span className="page-link">...</span>
                            </li>
                        );
                    }

                    return (
                        <li
                            key={page}
                            className={`page-item ${currentPage === page ? 'active' : ''}`}
                        >
                            <button
                                className="page-link"
                                onClick={() => handlePageClick(page)}
                                aria-label={`Page ${page}`}
                                aria-current={currentPage === page ? 'page' : undefined}
                            >
                                {page}
                            </button>
                        </li>
                    );
                })}

                {/* Next Button */}
                <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                    <button
                        className="page-link"
                        onClick={handleNextClick}
                        disabled={currentPage === totalPages}
                        aria-label="Next page"
                    >
                        <i className="fas fa-chevron-right"></i>
                    </button>
                </li>
            </ul>
        </nav>
    );
};

export default Pagination;
