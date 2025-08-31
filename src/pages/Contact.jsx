import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'react-toastify';
import { Mail, MessageSquare, Send } from 'lucide-react';
import Layout from '../components/Layout';

const contactSchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Please enter a valid email address'),
    message: z.string().min(10, 'Message must be at least 10 characters'),
});

const Contact = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(contactSchema),
    });

    const onSubmit = async (data) => {
        setIsSubmitting(true);

        // Simulate form submission
        await new Promise(resolve => setTimeout(resolve, 1000));

        toast.success('Message sent successfully! We\'ll get back to you soon.');
        reset();
        setIsSubmitting(false);
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
                                Get in Touch
                            </h1>
                            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                                Have questions about our courses or platform? We'd love to hear from you.
                                Send us a message and we'll respond as soon as possible.
                            </p>
                        </motion.div>
                    </div>
                </section>

                {/* Contact Form Section */}
                <section className="py-16">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid lg:grid-cols-2 gap-12">
                            {/* Contact Info */}
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6 }}
                            >
                                <h2 className="text-2xl font-bold text-gray-900 mb-6 font-inter">
                                    Let's Start a Conversation
                                </h2>
                                <p className="text-gray-600 mb-8">
                                    Whether you're a beginner looking to start your DevOps journey or an
                                    experienced professional seeking to expand your skills, we're here to help.
                                </p>

                                <div className="space-y-6">
                                    <div className="flex items-start space-x-4">
                                        <div className="flex items-center justify-center w-10 h-10 bg-lime-100 rounded-lg">
                                            <Mail className="h-5 w-5 text-lime-600" />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-gray-900">Email Us</h3>
                                            <p className="text-gray-600">hello@devopslearner.com</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start space-x-4">
                                        <div className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-lg">
                                            <MessageSquare className="h-5 w-5 text-blue-600" />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-gray-900">Live Chat</h3>
                                            <p className="text-gray-600">Available 24/7 for premium members</p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Contact Form */}
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                                className="bg-white rounded-lg shadow-md p-8"
                            >
                                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                                    <div>
                                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                                            Name *
                                        </label>
                                        <input
                                            {...register('name')}
                                            type="text"
                                            id="name"
                                            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-lime-500 focus:border-lime-500 transition-colors"
                                            placeholder="Your full name"
                                        />
                                        {errors.name && (
                                            <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                            Email *
                                        </label>
                                        <input
                                            {...register('email')}
                                            type="email"
                                            id="email"
                                            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-lime-500 focus:border-lime-500 transition-colors"
                                            placeholder="your.email@example.com"
                                        />
                                        {errors.email && (
                                            <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                                            Message *
                                        </label>
                                        <textarea
                                            {...register('message')}
                                            id="message"
                                            rows={5}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-lime-500 focus:border-lime-500 transition-colors resize-vertical"
                                            placeholder="Tell us how we can help you..."
                                        />
                                        {errors.message && (
                                            <p className="mt-1 text-sm text-red-600">{errors.message.message}</p>
                                        )}
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full flex items-center justify-center px-6 py-3 bg-lime-600 text-white font-semibold rounded-md hover:bg-lime-700 focus:ring-2 focus:ring-lime-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {isSubmitting ? (
                                            'Sending...'
                                        ) : (
                                            <>
                                                <Send className="h-4 w-4 mr-2" />
                                                Send Message
                                            </>
                                        )}
                                    </button>
                                </form>
                            </motion.div>
                        </div>
                    </div>
                </section>
            </div>
        </Layout>
    );
};

export default Contact;