import React from 'react';

const Pagination = ({ totalPages, currentPage, handlePageChange }) => {
    const getPaginationRange = () => {
        const range = [];
        const showLeftEllipsis = currentPage > 5;
        const showRightEllipsis = currentPage < totalPages - 4;

        if (showLeftEllipsis) {
            range.push(1);
            range.push(2);
            range.push(3);
            range.push(4);
            range.push(5);
        } else {
            for (let i = 1; i <= Math.min(5, totalPages); i++) {
                range.push(i);
            }
        }

        if (showRightEllipsis) {
            if (showLeftEllipsis) {
                range.push('...');
            }
            for (let i = totalPages - 1; i <= totalPages; i++) {
                range.push(i);
            }
        } else {
            for (let i = 6; i <= totalPages; i++) {
                range.push(i);
            }
        }

        return range;
    };

    const paginationRange = getPaginationRange();

    return (
        <div className="pagination">
            {paginationRange.map((page, index) => (
                <React.Fragment key={index}>
                    {page === '...' ? (
                        <span className="pagination-ellipsis">...</span>
                    ) : (
                        <button
                            onClick={() => handlePageChange(page)}
                            disabled={page === currentPage}
                            className={page === currentPage ? 'active' : ''}
                        >
                            {page}&nbsp;
                        </button>
                    )}
                </React.Fragment>
            ))}
        </div>
    );
};

export default Pagination;
