import React from 'react';
import { motion } from 'framer-motion';
import { Target, Users, Award, Zap } from 'lucide-react';
import Layout from '../components/Layout';

const About = () => {
    const values = [
        {
            icon: Target,
            title: 'Our Mission',
            description: 'To democratize DevOps education by providing accessible, hands-on learning experiences for everyone.',
        },
        {
            icon: Users,
            title: 'Community Driven',
            description: 'Built by the community, for the community. We believe in collaborative learning and knowledge sharing.',
        },
        {
            icon: Award,
            title: 'Quality Content',
            description: 'All our courses are created by industry experts with real-world experience in DevOps and cloud technologies.',
        },
        {
            icon: Zap,
            title: 'Practical Learning',
            description: 'Learn by doing with our interactive terminal, real projects, and hands-on exercises.',
        },
    ];

    return (
        <Layout>
            <div className="bg-gray-50 min-h-screen">
                {/* Hero Section */}
                <section className="bg-white py-20">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="text-center"
                        >
                            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 font-inter">
                                About DevOps Learner
                            </h1>
                            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                                We're passionate about making DevOps education accessible to everyone. Our platform
                                combines interactive learning with practical experience to help you master the skills
                                needed in today's technology landscape.
                            </p>
                        </motion.div>
                    </div>
                </section>

                {/* Mission Section */}
                <section className="py-20">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="text-center mb-16"
                        >
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-inter">
                                Why We Exist
                            </h2>
                            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                                DevOps skills are in high demand, but quality education can be hard to find.
                                We're here to change that.
                            </p>
                        </motion.div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {values.map((value, index) => (
                                <motion.div
                                    key={value.title}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: index * 0.1 }}
                                    className="bg-white rounded-lg shadow-md p-6 text-center"
                                >
                                    <div className="flex items-center justify-center w-12 h-12 bg-lime-100 rounded-lg mx-auto mb-4">
                                        <value.icon className="h-6 w-6 text-lime-600" />
                                    </div>
                                    <h3 className="text-xl font-semibold text-gray-900 mb-3 font-inter">
                                        {value.title}
                                    </h3>
                                    <p className="text-gray-600 leading-relaxed">
                                        {value.description}
                                    </p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Story Section */}
                <section className="py-20 bg-white">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="prose prose-lg mx-auto"
                        >
                            <h2 className="text-3xl font-bold text-gray-900 mb-6 font-inter text-center">
                                Our Story
                            </h2>
                            <div className="text-gray-600 space-y-6">
                                <p>
                                    DevOps Learner was born from a simple observation: while DevOps practices were
                                    revolutionizing how software is built and deployed, quality educational resources
                                    remained scattered and often inaccessible to beginners.
                                </p>
                                <p>
                                    We set out to create a comprehensive platform that combines theoretical knowledge
                                    with practical, hands-on experience. Our interactive web terminal allows learners
                                    to practice commands safely, while our structured courses provide the guidance
                                    needed to master complex DevOps concepts.
                                </p>
                                <p>
                                    Today, thousands of learners use our platform to develop the skills they need to
                                    succeed in DevOps roles. From complete beginners to experienced developers looking
                                    to expand their skillset, our community continues to grow and learn together.
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </section>
            </div>
        </Layout>
    );
};

export default About;