import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Users } from 'lucide-react';
import { useNavigate } from "react-router-dom";

const CourseCard = ({ course, delay = 0 }) => {
    const navigate = useNavigate();
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay }}
            whileHover={{ scale: 1.10 }}
            className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100"
        >
            <img
                src={course.image}
                alt={course.title}
                className="w-full h-48 object-cover"
                loading="lazy"
            />
            <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2 font-inter">{course.title}</h3>
                <p className="text-gray-600 mb-4 line-clamp-3">{course.description}</p>

                <div className="flex items-center justify-between mb-4 text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                        <Clock className="h-4 w-4" />
                        <span>{course.duration}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                        <Users className="h-4 w-4" />
                        <span>{course.students} students</span>
                    </div>
                </div>

                <button
                    onClick={() => navigate(`/courses/${course.id}`)}
                    className="w-full bg-lime-600 text-white py-2 px-4 rounded-md hover:bg-lime-700 transition-colors duration-200 font-medium"
                >
                    Enroll Now
                </button>
            </div>
        </motion.div>
    );
};

export default CourseCard;