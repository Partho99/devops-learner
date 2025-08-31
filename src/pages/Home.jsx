import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Terminal, Code, Wrench, BookOpen, UserPlus, Star } from 'lucide-react';
import Layout from '../components/Layout';
import FeatureCard from '../components/FeatureCard';
import CourseCard from '../components/CourseCard';

// React Slick
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Home = () => {
    const heroSlides = [
        {
            title: 'Learn DevOps & Programming Online',
            subtitle: 'Hands-on labs, interactive tutorials, and real projects to accelerate your learning.',
            image: 'https://images.unsplash.com/photo-1581091012184-3a1b7b6f2095?fit=crop&w=1200&h=500',
            ctaText: 'Start Learning',
            ctaLink: '/courses',
        },
        {
            title: 'Master Cloud & Containerization',
            subtitle: 'From Docker to Kubernetes, learn everything you need to deploy modern applications.',
            image: 'https://images.unsplash.com/photo-1612831663402-5f1e2f5a5e8c?fit=crop&w=1200&h=500',
            ctaText: 'Explore Courses',
            ctaLink: '/courses',
        },
    ];

    const features = [
        { icon: Terminal, title: 'Learn DevOps Commands', description: 'Master essential DevOps tools and commands through interactive tutorials and hands-on practice.' },
        { icon: Code, title: 'Practice Programming', description: 'Enhance your coding skills with real-world programming challenges in multiple languages.' },
        { icon: Wrench, title: 'Build Real Projects', description: 'Apply knowledge by building actual DevOps pipelines and automation projects.' },
        { icon: BookOpen, title: 'Courses Library', description: 'Access curated courses from beginner to advanced level designed by experts.' },
        { icon: UserPlus, title: 'Join Community', description: 'Collaborate with thousands of learners and industry professionals.' },
    ];

    const popularCourses = [
        { id: 1, title: 'Docker Fundamentals', description: 'Learn containerization with Docker from basics to advanced concepts.', duration: '6 weeks', students: '2,340', rating: 4.5, image: 'https://images.unsplash.com/photo-1605745341112-85968b19335?w=400&h=300&fit=crop' },
        { id: 2, title: 'Kubernetes Mastery', description: 'Master container orchestration with Kubernetes.', duration: '8 weeks', students: '1,890', rating: 4.8, image: 'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=400&h=300&fit=crop' },
        { id: 3, title: 'CI/CD with Jenkins', description: 'Build robust continuous integration and deployment pipelines using Jenkins.', duration: '5 weeks', students: '3,120', rating: 4.2, image: 'https://images.unsplash.com/photo-1556075798-4825dfaaf498?w=400&h=300&fit=crop' },
        { id: 4, title: 'AWS DevOps', description: 'Learn cloud DevOps with Amazon Web Services.', duration: '10 weeks', students: '2,750', rating: 4.6, image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=300&fit=crop' },
    ];

    // Hero Slider Settings
    const heroSettings = {
        dots: true,
        infinite: true,
        speed: 1000,
        autoplay: true,
        autoplaySpeed: 6000,
        slidesToShow: 1,
        slidesToScroll: 1,
        fade: true,
        arrows: false,
    };

    // Popular Courses Slider Settings
    const coursesSettings = {
        dots: true,
        infinite: true,
        speed: 800,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 4000,
        arrows: true,
        responsive: [
            { breakpoint: 1024, settings: { slidesToShow: 3 } },
            { breakpoint: 768, settings: { slidesToShow: 2 } },
            { breakpoint: 640, settings: { slidesToShow: 1 } },
        ],
    };

    return (
        <Layout>
            {/* Hero Slider */}
            <section className="relative h-[80vh] w-full">
                <Slider {...heroSettings}>
                    {heroSlides.map((slide, index) => (
                        <div key={index} className="relative h-[80vh] w-full bg-cover bg-center" style={{ backgroundImage: `url(${slide.image})` }}>
                            <div className="absolute inset-0 bg-black/50 flex items-center justify-center px-4">
                                <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8 }}>
                                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 font-inter leading-tight text-center">{slide.title}</h1>
                                    <p className="text-lg md:text-xl text-gray-200 mb-6 text-center">{slide.subtitle}</p>
                                    <Link
                                        to={slide.ctaLink}
                                        className="inline-flex items-center gap-2 px-6 py-3 bg-lime-600 text-white font-semibold rounded-xl hover:bg-lime-700 transition-all duration-200 shadow-lg hover:shadow-xl"
                                    >
                                        {slide.ctaText} <UserPlus className="w-5 h-5" />
                                    </Link>
                                </motion.div>
                            </div>
                        </div>
                    ))}
                </Slider>
            </section>

            {/* Features Section */}
            <section className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-inter">Why Choose DevOps Learner?</h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                            Our platform provides everything you need to master DevOps and programming skills.
                        </p>
                    </motion.div>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {features.map((feature, index) => (
                            <FeatureCard key={feature.title} icon={feature.icon} title={feature.title} description={feature.description} delay={index * 0.15} className="hover:scale-105 transition-transform duration-300" />
                        ))}
                    </div>
                </div>
            </section>

            {/* Popular Courses Section */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.h2 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center font-inter">
                        Popular Courses
                    </motion.h2>
                    <Slider {...coursesSettings}>
                        {popularCourses.map(course => (
                            <div key={course.id} className="px-2">
                                <CourseCard course={course} />
                            </div>
                        ))}
                    </Slider>
                </div>
            </section>

            {/* Statistics Section */}
            <section className="py-20 bg-gradient-to-r from-lime-50 to-blue-50">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-around text-center flex-wrap gap-10">
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                        <h3 className="text-4xl font-bold">10k+</h3>
                        <p className="text-lg">Students Enrolled</p>
                    </motion.div>
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                        <h3 className="text-4xl font-bold">50+</h3>
                        <p className="text-lg">Courses</p>
                    </motion.div>
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                        <h3 className="text-4xl font-bold">200+</h3>
                        <p className="text-lg">Projects Completed</p>
                    </motion.div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-gradient-to-r from-lime-600 to-lime-400 text-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <motion.h2 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-3xl md:text-4xl font-bold mb-4 font-inter">
                        Ready to Start Your DevOps Journey?
                    </motion.h2>
                    <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="text-lg md:text-xl mb-8">
                        Join thousands of learners mastering DevOps and programming skills with hands-on practice.
                    </motion.p>
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 }} className="flex justify-center gap-4 flex-wrap">
                        <Link to="/courses" className="inline-flex items-center gap-2 px-6 py-3 bg-white text-lime-600 font-semibold rounded-xl hover:bg-gray-100 transition-all duration-200 shadow-lg hover:shadow-xl">
                            Explore Courses <BookOpen className="w-5 h-5" />
                        </Link>
                        <Link to="/terminal" className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white font-semibold rounded-xl hover:bg-gray-800 transition-all duration-200 shadow-lg hover:shadow-xl">
                            Try Web Terminal <Terminal className="w-5 h-5" />
                        </Link>
                    </motion.div>
                </div>
            </section>
        </Layout>
    );
};

export default Home;
