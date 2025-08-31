import React from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const pages = [...Array(totalPages)].map((_, i) => i + 1);

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) onPageChange(page);
    };

    return (
        <div className="flex justify-center items-center gap-2 flex-wrap mt-8">
            <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="p-2 rounded-full border border-gray-300 bg-white text-gray-700 hover:bg-lime-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            >
                <ChevronLeft className="w-4 h-4" />
            </motion.button>

            {pages.map((page) => (
                <motion.button
                    key={page}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handlePageChange(page)}
                    className={`px-4 py-2 rounded-full transition-all duration-200 font-medium ${
                        page === currentPage
                            ? 'bg-lime-600 text-white shadow-md'
                            : 'bg-white text-gray-700 border border-gray-200 hover:bg-lime-50'
                    }`}
                >
                    {page}
                </motion.button>
            ))}

            <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="p-2 rounded-full border border-gray-300 bg-white text-gray-700 hover:bg-lime-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            >
                <ChevronRight className="w-4 h-4" />
            </motion.button>
        </div>
    );
};

export default Pagination;
