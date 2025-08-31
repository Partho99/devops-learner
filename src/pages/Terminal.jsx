import React from 'react';
import {motion} from 'framer-motion';
import Layout from '../components/Layout';
import WebTerminal from '../components/WebTerminal';

const Terminal = () => {
    return (
        <Layout>
            <div className="bg-gray-50 min-h-screen">
                {/* Header Section */}
                <section className="bg-white py-16">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <motion.div
                            initial={{opacity: 0, y: 20}}
                            animate={{opacity: 1, y: 0}}
                            transition={{duration: 0.6}}
                            className="text-center"
                        >
                            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 font-inter">
                                Linux Terminal
                            </h1>
                            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                                Practice DevOps commands in a safe, interactive terminal environment.
                                Perfect for learning without affecting your system.
                            </p>
                        </motion.div>
                    </div>
                </section>

                {/* Terminal Section */}
                <section className="py-16">
                    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                        <WebTerminal/>

                        <motion.div
                            initial={{opacity: 0, y: 20}}
                            animate={{opacity: 1, y: 0}}
                            transition={{duration: 0.6, delay: 0.3}}
                            className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6"
                        >
                            <h3 className="text-lg font-semibold text-blue-900 mb-2 font-inter">
                                💡 Getting Started
                            </h3>
                            <p className="text-blue-800">
                                Type your commands here to practice safely. This terminal simulates a Linux environment
                                where you can experiment with basic commands without any risk to your system.
                            </p>
                        </motion.div>
                    </div>
                </section>
            </div>
        </Layout>
    );
};

export default Terminal;