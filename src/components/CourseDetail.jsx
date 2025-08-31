import React from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
    Clock, Users, Layers, BookOpen, PlayCircle, Star
} from 'lucide-react';

const SectionCard = ({ children, className = '' }) => (
    <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={`bg-white rounded-lg shadow-md border border-gray-100 p-6 ${className}`}
    >
        {children}
    </motion.div>
);

const MetaItem = ({ icon: Icon, children }) => (
    <div className="flex items-center gap-2 text-gray-600">
        <Icon className="h-4 w-4" />
        <span className="text-sm">{children}</span>
    </div>
);

const Bullet = ({ children }) => (
    <li className="flex items-start gap-2">
        <span className="mt-2 h-2 w-2 rounded-full bg-lime-600" />
        <span className="text-gray-700">{children}</span>
    </li>
);

const CurriculumItem = ({ title, duration, index }) => (
    <li className="flex items-center justify-between py-2 border-b last:border-none">
        <Link
            to={`/course/lesson/${index}`}
            className="flex items-center gap-2 text-gray-800 hover:text-lime-600 transition-colors"
        >
            <PlayCircle className="h-4 w-4" />
            <span>{title}</span>
        </Link>
        <span className="text-sm text-gray-500">{duration}</span>
    </li>
);

const CourseDetail = ({ course }) => {
    if (!course) return null;

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            {/* Top: Cover + Title */}
            <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                whileHover={{ scale: 1.02 }}
                className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100"
            >
                <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-64 object-cover"
                    loading="lazy"
                />
                <div className="p-6">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 font-inter">
                        {course.title}
                    </h1>
                    <p className="mt-3 text-gray-600">{course.description}</p>

                    <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
                        <MetaItem icon={Clock}>{course.duration}</MetaItem>
                        <MetaItem icon={Users}>{course.students} students</MetaItem>
                        <MetaItem icon={Layers}>{course.level ?? 'All levels'}</MetaItem>
                        <MetaItem icon={Star}>{course.rating ?? '4.7'} rating</MetaItem>
                    </div>

                    <button className="mt-6 w-full sm:w-auto bg-lime-600 text-white py-2 px-5 rounded-md hover:bg-lime-700 transition-colors font-medium">
                        Enroll Now
                    </button>
                </div>
            </motion.div>

            {/* Body: 2-col layout */}
            <div className="mt-8 grid lg:grid-cols-3 gap-8">
                {/* Left content */}
                <div className="lg:col-span-2 space-y-6">
                    <SectionCard>
                        <h2 className="text-xl font-semibold text-gray-900 mb-3 font-inter">What you’ll learn</h2>
                        <ul className="space-y-2">
                            {(course.learn ?? [
                                'Core concepts explained with real-world examples',
                                'Hands-on practice with common workflows',
                                'Best practices and production tips',
                                'Troubleshooting and debugging strategies',
                            ]).map((item, i) => (
                                <Bullet key={i}>{item}</Bullet>
                            ))}
                        </ul>
                    </SectionCard>

                    <SectionCard>
                        <h2 className="text-xl font-semibold text-gray-900 mb-3 font-inter">Curriculum</h2>
                        <ul>
                            {(course.curriculum ?? [
                                { title: 'Introduction & Setup', duration: '10m' },
                                { title: 'Core Concepts Deep Dive', duration: '35m' },
                                { title: 'Hands-on Lab', duration: '45m' },
                                { title: 'Deploy & Verify', duration: '25m' },
                                { title: 'Best Practices & Next Steps', duration: '15m' },
                            ]).map((item, i) => (
                                <CurriculumItem
                                    key={i}
                                    title={item.title}
                                    duration={item.duration}
                                    index={i} // pass index for routing
                                />
                            ))}
                        </ul>
                    </SectionCard>
                </div>

                {/* Right sidebar */}
                <div className="space-y-6">
                    <SectionCard>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2 font-inter">Prerequisites</h3>
                        <ul className="list-disc pl-5 text-gray-700 space-y-1">
                            {(course.prerequisites ?? [
                                'Basic command line familiarity',
                                'A computer with internet access',
                            ]).map((p, i) => <li key={i}>{p}</li>)}
                        </ul>
                    </SectionCard>

                    <SectionCard>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2 font-inter">This course includes</h3>
                        <div className="space-y-2 text-gray-700">
                            <MetaItem icon={BookOpen}>Downloadable resources</MetaItem>
                            <MetaItem icon={PlayCircle}>Hands-on labs</MetaItem>
                            <MetaItem icon={Users}>Community support</MetaItem>
                            <MetaItem icon={Star}>Certificate of completion</MetaItem>
                        </div>
                    </SectionCard>
                </div>
            </div>
        </div>
    );
};

export default CourseDetail;
