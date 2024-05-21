import React, {useState} from 'react';

const Pagination = ({ totalPages, currentPage, handlePageChange }) => {
    const [inputPage, setInputPage] = useState('');

    const getPaginationRange = () => {
        const range = [];

        // Always include the first 3 pages
        for (let i = 1; i <= Math.min(3, totalPages); i++) {
            range.push(i);
        }

        // Calculate the range around the current page
        const startPage = Math.max(4, currentPage - 2);
        const endPage = Math.min(totalPages - 3, currentPage + 2);

        // Add ellipsis if there's a gap between the initial range and the calculated range
        if (startPage > 4) {
            range.push('...');
        }

        // Add pages around the current page
        for (let i = startPage; i <= endPage; i++) {
            range.push(i);
        }

        // Add ellipsis if there's a gap between the end of the range and the last few pages
        if (endPage < totalPages - 3) {
            range.push('...');
        }

        // Always include the last 3 pages
        for (let i = Math.max(totalPages - 2, 1); i <= totalPages; i++) {
            if (!range.includes(i)) {
                range.push(i);
            }
        }

        return range;
    };

    const paginationRange = getPaginationRange();

    const handleInputChange = (e) => {setInputPage(e.target.value)};


    const handleGoToPage = () => {
        const pageNumber = parseInt(inputPage, 10);
        if (!isNaN(pageNumber) && pageNumber >= 1 && pageNumber <= totalPages) {
            handlePageChange(pageNumber);
        } else {
            alert(`Please enter a valid page number between 1 and ${totalPages}`);
        }
        setInputPage('');
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleGoToPage();
        }
    };

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
            <div className="pagination-input">
                <input
                    type="number"
                    value={inputPage}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    placeholder="Go to page"
                    min="1"
                    max={totalPages}
                />
                <button onClick={handleGoToPage}>Go</button>
            </div>
        </div>
    );
};

export default Pagination;
