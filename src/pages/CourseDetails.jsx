import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import Layout from '../components/Layout';
import CourseDetail from '../components/CourseDetail';
import { ArrowLeft } from 'lucide-react';

const COURSES = [
    {
        id: '1',
        title: 'Docker Fundamentals',
        description:
            'Learn containerization with Docker from basics to advanced concepts. Master container creation, management, and deployment strategies.',
        duration: '6 weeks',
        students: '2,340',
        image:
            'https://images.unsplash.com/photo-1605745341112-85968b19335b?w=1200&h=600&fit=crop',
        level: 'Beginner–Intermediate',
        rating: '4.8',
        learn: [
            'Build, tag, and push Docker images',
            'Work with containers, volumes, and networks',
            'Dockerfile best practices for production',
            'Compose multi-container apps with docker-compose',
        ],
        prerequisites: ['Basic Linux shell commands', 'Docker installed (optional)'],
        curriculum: [
            { title: 'Intro to Containers & Docker', duration: '12m' },
            { title: 'Images, Registries & Layers', duration: '28m' },
            { title: 'Volumes & Networking', duration: '36m' },
            { title: 'Dockerfile Deep Dive', duration: '41m' },
            { title: 'docker-compose Workshop', duration: '30m' },
        ],
    },
    {
        id: '2',
        title: 'Kubernetes Mastery',
        description:
            'Master container orchestration with Kubernetes. Learn pods, services, deployments, and cluster management.',
        duration: '8 weeks',
        students: '1,890',
        image:
            'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=1200&h=600&fit=crop',
        level: 'Intermediate',
        rating: '4.7',
    },
    // add other courses here if you like
];

const CourseDetails = () => {
    const { id } = useParams();
    const course = COURSES.find((c) => c.id === id);

    return (
        <Layout>
            <div className="bg-gray-50 min-h-screen">
                {/* Header */}
                <section className="bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                        <motion.div
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="flex items-center gap-2"
                        >
                            <Link
                                to="/courses"
                                className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900"
                            >
                                <ArrowLeft className="h-4 w-4" />
                                Back to Courses
                            </Link>
                        </motion.div>
                    </div>
                </section>

                {/* Body */}
                <section>
                    {course ? (
                        <CourseDetail course={course} />
                    ) : (
                        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                            <motion.div
                                initial={{ opacity: 0, y: 8 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4 }}
                                className="bg-white border border-gray-100 rounded-lg shadow-md p-8 text-center"
                            >
                                <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                                    Course not found
                                </h2>
                                <p className="text-gray-600">
                                    The course you’re looking for doesn’t exist or was removed.
                                </p>
                                <Link
                                    to="/courses"
                                    className="inline-block mt-6 bg-lime-600 text-white py-2 px-4 rounded-md hover:bg-lime-700 transition-colors"
                                >
                                    Browse all courses
                                </Link>
                            </motion.div>
                        </div>
                    )}
                </section>
            </div>
        </Layout>
    );
};

export default CourseDetails;
