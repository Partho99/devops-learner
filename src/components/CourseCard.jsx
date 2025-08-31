import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
    Clock,
    Users,
    Heart,
    ThumbsUp,
    ThumbsDown,
    Star,
    StarHalf,
    StarOff,
    ShoppingCart,
    User,
    UserPlus
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CourseCard = ({ course, delay = 0 }) => {
    const navigate = useNavigate();
    const [liked, setLiked] = useState(false);
    const [disliked, setDisliked] = useState(false);
    const [loved, setLoved] = useState(false);

    const renderStars = (rating) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            if (rating >= i) stars.push(<Star key={i} className="w-4 h-4 text-yellow-400" />);
            else if (rating >= i - 0.5) stars.push(<StarHalf key={i} className="w-4 h-4 text-yellow-400" />);
            else stars.push(<StarOff key={i} className="w-4 h-4 text-gray-300" />);
        }
        return stars;
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay }}
            whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(0,0,0,0.15)' }}
            className="bg-white rounded-2xl overflow-hidden border border-gray-100 cursor-pointer transition-all duration-300"
        >
            <div className="relative">
                <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-52 object-cover"
                    loading="lazy"
                />
                <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/70 via-transparent to-transparent p-4">
                    <h3 className="text-lg md:text-xl font-bold text-white line-clamp-2">{course.title}</h3>
                </div>

                <div className="absolute top-3 right-3 bg-lime-600 text-white text-sm px-3 py-1 rounded-full font-semibold shadow-lg">
                    ${course.price}
                </div>
            </div>

            <div className="p-5 flex flex-col gap-3">
                <p className="text-gray-700 text-sm md:text-base line-clamp-3">{course.description}</p>

                {/* Instructor & Rating */}
                <div className="flex justify-between items-center text-gray-500 text-sm mt-1">
                    <div className="flex items-center gap-2">
                        <User className="w-4 h-4" />
                        <span className="text-gray-700">{course.instructor}</span>
                    </div>
                    <div className="flex items-center gap-1">
                        {renderStars(course.rating)}
                        <span className="ml-1 text-gray-600 text-xs font-semibold">{course.rating.toFixed(1)}</span>
                    </div>
                </div>

                {/* Duration & Students */}
                <div className="flex justify-between items-center text-gray-500 text-sm mt-2">
                    <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{course.duration}</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        <span>{course.students} students</span>
                    </div>
                </div>

                {/* Engagement & Enroll */}
                <div className="flex items-center justify-between mt-3">
                    <div className="flex gap-2">
                        <button
                            onClick={() => { setLiked(!liked); setDisliked(false); }}
                            className={`p-2 rounded-full transition-colors duration-200 ${liked ? 'bg-lime-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-lime-50'}`}
                        >
                            <ThumbsUp className="w-4 h-4" />
                        </button>
                        <button
                            onClick={() => { setDisliked(!disliked); setLiked(false); }}
                            className={`p-2 rounded-full transition-colors duration-200 ${disliked ? 'bg-red-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-red-50'}`}
                        >
                            <ThumbsDown className="w-4 h-4" />
                        </button>
                        <button
                            onClick={() => setLoved(!loved)}
                            className={`p-2 rounded-full transition-colors duration-200 ${loved ? 'bg-pink-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-pink-50'}`}
                        >
                            <Heart className="w-4 h-4" />
                        </button>
                    </div>

                    <button
                        onClick={() => navigate(`/courses/${course.id}`)}
                        className="flex items-center gap-1 bg-lime-600 text-white px-4 py-2 rounded-xl hover:bg-lime-700 transition-colors font-medium"
                    >
                        <UserPlus className="w-4 h-4" /> Enroll
                    </button>
                </div>
            </div>
        </motion.div>
    );
};

export default CourseCard;
