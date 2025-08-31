import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            onPageChange(page);
        }
    };

    return (
        <div className="flex justify-center mt-8">
            <button
                onClick={() => handlePageChange(currentPage - 1)}
                className="px-4 py-2 mx-1 text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-100 disabled:opacity-50"
                disabled={currentPage === 1}
            >
                Previous
            </button>

            {/* Page Numbers */}
            <span className="flex items-center space-x-2">
                {[...Array(totalPages)].map((_, index) => {
                    const pageNumber = index + 1;
                    return (
                        <button
                            key={pageNumber}
                            onClick={() => handlePageChange(pageNumber)}
                            className={`px-4 py-2 mx-1 rounded-md ${currentPage === pageNumber ? 'bg-lime-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
                        >
                            {pageNumber}
                        </button>
                    );
                })}
            </span>

            <button
                onClick={() => handlePageChange(currentPage + 1)}
                className="px-4 py-2 mx-1 text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-100 disabled:opacity-50"
                disabled={currentPage === totalPages}
            >
                Next
            </button>
        </div>
    );
};

export default Pagination;
