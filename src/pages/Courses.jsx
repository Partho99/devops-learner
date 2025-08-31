import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Layout from '../components/Layout';
import CourseCard from '../components/CourseCard';
import Pagination from '../components/Pagination';

const Courses = () => {
    const courses = [
        {
            id: 1,
            title: 'Docker Fundamentals',
            description: 'Learn containerization with Docker from basics to advanced concepts. Master container creation, management, and deployment strategies.',
            duration: '6 weeks',
            students: '2,340',
            image: 'https://images.unsplash.com/photo-1605745341112-85968b19335b?w=400&h=300&fit=crop',
        },
        {
            id: 2,
            title: 'Kubernetes Mastery',
            description: 'Master container orchestration with Kubernetes. Learn pods, services, deployments, and cluster management.',
            duration: '8 weeks',
            students: '1,890',
            image: 'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=400&h=300&fit=crop',
        },
        {
            id: 3,
            title: 'CI/CD with Jenkins',
            description: 'Build robust continuous integration and deployment pipelines using Jenkins and modern DevOps practices.',
            duration: '5 weeks',
            students: '3,120',
            image: 'https://images.unsplash.com/photo-1556075798-4825dfaaf498?w=400&h=300&fit=crop',
        },
        {
            id: 4,
            title: 'AWS DevOps',
            description: 'Learn cloud DevOps with Amazon Web Services. Master EC2, S3, Lambda, and infrastructure as code.',
            duration: '10 weeks',
            students: '2,750',
            image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=300&fit=crop',
        },
        {
            id: 5,
            title: 'Terraform Infrastructure',
            description: 'Master infrastructure as code with Terraform. Learn to provision and manage cloud resources efficiently.',
            duration: '7 weeks',
            students: '1,650',
            image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=300&fit=crop',
        },
        {
            id: 6,
            title: 'Monitoring & Logging',
            description: 'Implement comprehensive monitoring and logging solutions using Prometheus, Grafana, and ELK stack.',
            duration: '6 weeks',
            students: '1,420',
            image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop',
        },
    ];

    const itemsPerPage = 4; // Number of courses per page
    const totalPages = Math.ceil(courses.length / itemsPerPage);
    const [currentPage, setCurrentPage] = useState(1);

    // Get the courses for the current page
    const currentCourses = courses.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <Layout>
            <div className="bg-gray-50 min-h-screen">
                {/* Header Section */}
                <section className="bg-white py-16">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="text-center"
                        >
                            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 font-inter">
                                DevOps Courses
                            </h1>
                            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                                Master DevOps tools and practices with our comprehensive, hands-on courses
                                designed by industry experts
                            </p>
                        </motion.div>
                    </div>
                </section>

                {/* Courses Grid */}
                <section className="py-16">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {currentCourses.map((course, index) => (
                                <CourseCard
                                    key={course.id}
                                    course={course}
                                    delay={index * 0.1}
                                />
                            ))}
                        </div>

                        {/* Pagination */}
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={handlePageChange}
                        />
                    </div>
                </section>
            </div>
        </Layout>
    );
};

export default Courses;
