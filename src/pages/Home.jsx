import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Terminal, Code, Wrench } from 'lucide-react';
import Layout from '../components/Layout';
import FeatureCard from '../components/FeatureCard';

const Home = () => {
    const features = [
        {
            icon: Terminal,
            title: 'Learn DevOps Commands',
            description: 'Master essential DevOps tools and commands through interactive tutorials and hands-on practice sessions.',
        },
        {
            icon: Code,
            title: 'Practice Programming',
            description: 'Enhance your coding skills with real-world programming challenges and projects in multiple languages.',
        },
        {
            icon: Wrench,
            title: 'Build Real Projects',
            description: 'Apply your knowledge by building actual DevOps pipelines and infrastructure automation projects.',
        },
    ];

    return (
        <Layout>
            {/* Hero Section */}
            <section className="bg-gradient-to-br from-lime-50 to-blue-50 py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 font-inter"
                        >
                            Practice DevOps &{' '}
                            <span className="text-lime-600">Programming</span> Online
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed"
                        >
                            Master DevOps tools, practice programming, and build real projects in a safe,
                            interactive learning environment designed for hands-on experience.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                        >
                            <Link
                                to="/courses"
                                className="inline-flex items-center px-8 py-4 bg-lime-600 text-white font-semibold rounded-lg hover:bg-lime-700 transition-colors duration-200 shadow-lg hover:shadow-xl"
                            >
                                Start Learning
                            </Link>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-inter">
                            Why Choose DevOps Learner?
                        </h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Our platform provides everything you need to master DevOps and programming skills
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {features.map((feature, index) => (
                            <FeatureCard
                                key={feature.title}
                                icon={feature.icon}
                                title={feature.title}
                                description={feature.description}
                                delay={index * 0.2}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-gray-900 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-3xl md:text-4xl font-bold mb-4 font-inter">
                            Ready to Start Your DevOps Journey?
                        </h2>
                        <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                            Join thousands of learners who are already mastering DevOps and programming skills
                        </p>
                        <Link
                            to="/terminal"
                            className="inline-flex items-center px-8 py-4 bg-lime-600 text-white font-semibold rounded-lg hover:bg-lime-700 transition-colors duration-200"
                        >
                            Try Web Terminal
                        </Link>
                    </motion.div>
                </div>
            </section>
        </Layout>
    );
};

export default Home;