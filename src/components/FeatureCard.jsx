import React from 'react';
import { motion } from 'framer-motion';

const FeatureCard = ({ icon: Icon, title, description, delay = 0 }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay }}
            className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-6 border border-gray-100"
        >
            <div className="flex items-center justify-center w-12 h-12 bg-lime-100 rounded-lg mb-4">
                <Icon className="h-6 w-6 text-lime-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3 font-inter">{title}</h3>
            <p className="text-gray-600 leading-relaxed">{description}</p>
        </motion.div>
    );
};

export default FeatureCard;