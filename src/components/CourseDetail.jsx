// CourseDetail.jsx
import React from "react";
import { motion } from "framer-motion";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
    Clock,
    Users,
    Layers,
    BookOpen,
    PlayCircle,
    Star,
    Share2,
    Heart,
    Tag,
    CheckCircle,
    User,
} from "lucide-react";

/**
 * Reusable card wrapper with subtle animation.
 */
const SectionCard = ({ children, className = "" }) => (
    <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.36 }}
        className={`bg-white rounded-lg shadow-sm border border-gray-100 p-6 ${className}`}
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
    <li className="flex items-start gap-3">
        <span className="mt-1 h-2 w-2 rounded-full bg-lime-600" />
        <span className="text-gray-700">{children}</span>
    </li>
);

const CurriculumItem = ({ title, duration, lessonId }) => (
    <li className="flex items-center justify-between py-3 border-b last:border-none">
        <Link
            to={`/course/lesson/${lessonId}`}
            className="flex items-center gap-3 text-gray-800 hover:text-lime-600 transition-colors"
        >
            <PlayCircle className="h-4 w-4" />
            <span className="font-medium">{title}</span>
        </Link>
        <span className="text-sm text-gray-500">{duration}</span>
    </li>
);

const InstructorCard = ({ instructor }) => (
    <div className="flex items-center gap-3">
        <img
            src={instructor?.avatar}
            alt={instructor?.name}
            className="h-12 w-12 rounded-full object-cover border border-gray-100"
            loading="lazy"
        />
        <div>
            <div className="text-sm font-semibold text-gray-900">{instructor?.name}</div>
            <div className="text-xs text-gray-500">{instructor?.title}</div>
        </div>
    </div>
);

/**
 * Main CourseDetail component
 */
const CourseDetail = ({ course }) => {
    const navigate = useNavigate();
    const location = useLocation();

    if (!course) return null;

    const ratingRounded = Math.round(course.rating * 10) / 10;
    const lessonCount = (course.curriculum || []).length;

    const onEnroll = () => {
        // send user to sign-in or checkout flow (preserve redirect)
        navigate("/sign-in", { state: { from: location.pathname } });
    };

    const onPreview = () => {
        // open first lesson preview (if available)
        const firstLessonId = `${course.id}-0`;
        navigate(`/course/lesson/${firstLessonId}`, { state: { preview: true } });
    };

    const onShare = async () => {
        const shareData = {
            title: course.title,
            text: course.description,
            url: window.location.href,
        };
        if (navigator.share) {
            try {
                await navigator.share(shareData);
            } catch (err) {
                // user aborted or not supported
            }
        } else {
            await navigator.clipboard.writeText(window.location.href);
            alert("Course link copied to clipboard");
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            {/* HERO */}
            <motion.div
                initial={{ opacity: 0, scale: 0.995 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="rounded-lg overflow-hidden bg-white shadow-md border border-gray-100"
            >
                <div className="relative">
                    <img
                        src={course.image}
                        alt={course.title}
                        className="w-full h-64 object-cover"
                        loading="lazy"
                    />
                    {/* overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                    <div className="absolute left-6 bottom-6 right-6">
                        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
                            <div className="text-white">
                                <div className="inline-flex items-center gap-2 rounded-full bg-black/30 px-3 py-1 text-xs font-medium backdrop-blur">
                                    <Tag className="h-3 w-3" />
                                    {course.tags?.slice(0, 3).join(" · ")}
                                </div>

                                <h1 className="mt-3 text-3xl md:text-4xl font-bold leading-tight">{course.title}</h1>
                                <p className="mt-2 text-sm max-w-2xl text-gray-100">{course.description}</p>

                                <div className="mt-4 flex flex-wrap items-center gap-4 text-sm">
                                    <div className="inline-flex items-center gap-2 text-gray-200">
                                        <Clock className="h-4 w-4" /> {course.duration}
                                    </div>
                                    <div className="inline-flex items-center gap-2 text-gray-200">
                                        <Users className="h-4 w-4" /> {course.students} students
                                    </div>
                                    <div className="inline-flex items-center gap-2 text-gray-200">
                                        <Layers className="h-4 w-4" /> {course.level ?? "All levels"}
                                    </div>
                                    <div className="inline-flex items-center gap-2 text-gray-200">
                                        <Star className="h-4 w-4" /> {ratingRounded}
                                    </div>
                                </div>
                            </div>

                            {/* small CTA group (on hero) */}
                            <div className="flex items-center gap-3">
                                <button
                                    onClick={onPreview}
                                    className="inline-flex items-center gap-2 rounded-md bg-white/90 px-4 py-2 text-sm font-medium text-gray-900 shadow-sm hover:bg-white focus:outline-none focus:ring-2 focus:ring-lime-500 transition"
                                >
                                    <PlayCircle className="h-4 w-4" />
                                    Preview
                                </button>

                                <button
                                    onClick={onEnroll}
                                    className="inline-flex items-center gap-2 rounded-md bg-lime-600 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-lime-700 focus:outline-none focus:ring-2 focus:ring-lime-500 transition"
                                >
                                    Enroll Now
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* body */}
                <div className="p-6 lg:p-8">
                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* Left (main content) */}
                        <div className="lg:col-span-2 space-y-6">
                            <SectionCard>
                                <h2 className="text-xl font-semibold text-gray-900 mb-3">What you'll learn</h2>
                                <ul className="space-y-3">
                                    {(course.learn ?? []).map((item, i) => (
                                        <Bullet key={i}>{item}</Bullet>
                                    ))}
                                </ul>
                            </SectionCard>

                            <SectionCard>
                                <div className="flex items-center justify-between mb-4">
                                    <h2 className="text-xl font-semibold text-gray-900">Curriculum</h2>
                                    <div className="text-sm text-gray-500">{lessonCount} lessons</div>
                                </div>

                                <ul className="divide-y border-t border-gray-100">
                                    {(course.curriculum ?? []).map((item, i) => (
                                        <CurriculumItem
                                            key={i}
                                            title={item.title}
                                            duration={item.duration}
                                            lessonId={`${course.id}-${i}`}
                                        />
                                    ))}
                                </ul>
                            </SectionCard>

                            <SectionCard>
                                <h2 className="text-xl font-semibold text-gray-900 mb-3">Requirements</h2>
                                <ul className="list-disc pl-5 text-gray-700 space-y-1">
                                    {(course.prerequisites ?? []).map((p, i) => (
                                        <li key={i}>{p}</li>
                                    ))}
                                </ul>
                            </SectionCard>

                            <SectionCard>
                                <h2 className="text-xl font-semibold text-gray-900 mb-3">Course Includes</h2>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-gray-700">
                                    <div className="flex items-start gap-3">
                                        <CheckCircle className="h-5 w-5 text-lime-600 mt-1" />
                                        <div>
                                            <div className="font-medium">Downloadable resources</div>
                                            <div className="text-sm text-gray-500">Slides, configs & templates</div>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3">
                                        <PlayCircle className="h-5 w-5 text-lime-600 mt-1" />
                                        <div>
                                            <div className="font-medium">Hands-on labs</div>
                                            <div className="text-sm text-gray-500">Step-by-step guided labs</div>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3">
                                        <Users className="h-5 w-5 text-lime-600 mt-1" />
                                        <div>
                                            <div className="font-medium">Community support</div>
                                            <div className="text-sm text-gray-500">Access to private forum</div>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3">
                                        <Star className="h-5 w-5 text-lime-600 mt-1" />
                                        <div>
                                            <div className="font-medium">Certificate</div>
                                            <div className="text-sm text-gray-500">Certificate of completion</div>
                                        </div>
                                    </div>
                                </div>
                            </SectionCard>
                        </div>

                        {/* Right (sticky card) */}
                        <aside className="space-y-6">
                            <div className="sticky top-24">
                                <div className="bg-white rounded-lg border border-gray-100 p-5 shadow-sm">
                                    <div className="flex items-start justify-between gap-3">
                                        <div>
                                            <div className="text-xs font-semibold text-gray-500">Price</div>
                                            <div className="mt-1 text-2xl font-bold text-gray-900">{course.price ?? "Free"}</div>
                                        </div>

                                        <div className="flex items-center gap-3">
                                            <button
                                                onClick={onShare}
                                                aria-label="Share course"
                                                className="inline-flex items-center justify-center rounded-md p-2 hover:bg-gray-50"
                                            >
                                                <Share2 className="h-5 w-5 text-gray-600" />
                                            </button>
                                            <button
                                                aria-label="Save course"
                                                className="inline-flex items-center justify-center rounded-md p-2 hover:bg-gray-50"
                                            >
                                                <Heart className="h-5 w-5 text-gray-600" />
                                            </button>
                                        </div>
                                    </div>

                                    <div className="mt-4 flex items-center gap-3">
                                        <div className="inline-flex items-center gap-2 rounded-full bg-lime-50 px-3 py-1 text-sm font-medium text-lime-700">
                                            <Star className="h-4 w-4" /> {ratingRounded}
                                        </div>
                                        <div className="text-sm text-gray-500">{course.students} students</div>
                                    </div>

                                    <div className="mt-4 border-t border-gray-100 pt-4">
                                        <div className="mb-3">
                                            <InstructorCard instructor={course.instructor ?? { name: "Instructor", title: "", avatar: "" }} />
                                        </div>

                                        <button
                                            onClick={onEnroll}
                                            className="w-full inline-flex items-center justify-center gap-2 rounded-md bg-lime-600 px-4 py-3 text-sm font-semibold text-white shadow hover:bg-lime-700 focus:outline-none focus:ring-2 focus:ring-lime-500 transition"
                                        >
                                            Enroll now
                                        </button>

                                        <button
                                            onClick={onPreview}
                                            className="mt-3 w-full inline-flex items-center justify-center gap-2 rounded-md border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
                                        >
                                            Preview lesson
                                        </button>

                                        <div className="mt-4 text-xs text-gray-500">
                                            Secure payments • 30-day refund policy • Lifetime access
                                        </div>
                                    </div>
                                </div>

                                {/* small secondary card */}
                                <div className="mt-4 bg-white rounded-lg border border-gray-100 p-4 shadow-sm">
                                    <div className="flex items-start gap-3">
                                        <User className="h-5 w-5 text-lime-600 mt-1" />
                                        <div>
                                            <div className="text-sm font-semibold text-gray-900">Need help?</div>
                                            <div className="text-sm text-gray-500">Contact support or join community</div>
                                        </div>
                                    </div>
                                    <div className="mt-4">
                                        <a
                                            href="mailto:hello@devopslearner.com"
                                            className="inline-block w-full text-center rounded-md bg-gray-50 px-4 py-2 text-sm font-medium text-gray-800 hover:bg-gray-100"
                                        >
                                            Contact support
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </aside>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default CourseDetail;
