import React, {useEffect, useState, useMemo} from "react";
import {useParams, Link, useNavigate} from "react-router-dom";
import {motion} from "framer-motion";
import Layout from '../components/Layout';
import VideoPlayer from "../components/VideoPlayer"; // <-- our component above
import {CheckCircle, PlayCircle, ArrowLeft, ChevronLeft, ChevronRight} from "lucide-react";

/**
 * Demo page for course player.
 * - Does NOT include Layout here (wrap your Routes with Layout once in App.jsx)
 * - Persists progress in localStorage under key `course_progress_{courseId}`
 */

/* Demo data — replace with API call in production */
const COURSES = [
    {
        id: "1",
        title: "Docker Fundamentals",
        image: "https://images.unsplash.com/photo-1605745341112-85968b19335b?w=1200&h=600&fit=crop",
        curriculum: [
            {title: "Intro to Containers & Docker", duration: "12m", src: "https://www.w3schools.com/html/mov_bbb.mp4"},
            {title: "Images, Registries & Layers", duration: "28m", src: "https://www.w3schools.com/html/movie.mp4"},
            {title: "Volumes & Networking", duration: "36m", src: "https://www.w3schools.com/html/mov_bbb.mp4"},
            {title: "Dockerfile Deep Dive", duration: "41m", src: "https://www.w3schools.com/html/movie.mp4"},
            {title: "docker-compose Workshop", duration: "30m", src: "https://www.w3schools.com/html/mov_bbb.mp4"},
        ],
    },
];

export default function CoursePlayerPage() {
    const {id, lessonIndex} = useParams();
    const navigate = useNavigate();

    // find course (fallback to first for demo)
    const course = useMemo(() => (id ? COURSES.find((c) => c.id === id) : COURSES[0]), [id]);

    // derived index from URL
    const parsedIndex = typeof lessonIndex !== "undefined" ? Math.max(0, Math.min((course?.curriculum?.length ?? 1) - 1, parseInt(lessonIndex, 10) || 0)) : 0;
    const [currentIndex, setCurrentIndex] = useState(parsedIndex);
    const [completed, setCompleted] = useState([]);

    // load persisted progress
    useEffect(() => {
        if (!course) return;
        try {
            const saved = JSON.parse(localStorage.getItem(`course_progress_${course.id}`) || "[]");
            if (Array.isArray(saved)) setCompleted(saved);
        } catch (e) {
        }
        // sync currentIndex from route param
        setCurrentIndex(parsedIndex);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [course, lessonIndex, id]);

    if (!course) {
        return (
            <div className="max-w-4xl mx-auto py-20 text-center">
                <h2 className="text-2xl font-semibold text-gray-800">Course not found</h2>
                <Link to="/courses" className="mt-4 inline-block text-lime-600 hover:underline">Back to Courses</Link>
            </div>
        );
    }

    const curriculum = course.curriculum || [];
    const completedCount = completed.length;
    const percentComplete = Math.round((completedCount / curriculum.length) * 100);

    // helpers to persist
    const persistCompleted = (arr) => {
        try {
            localStorage.setItem(`course_progress_${course.id}`, JSON.stringify(arr));
        } catch (e) {
        }
    };

    const markComplete = (index) => {
        setCompleted((prev) => {
            if (prev.includes(index)) return prev;
            const next = [...prev, index];
            persistCompleted(next);
            return next;
        });
    };

    const gotoLesson = (idx) => {
        navigate(`/courses/${course.id}/player/${idx}`);
    };

    // when video ends, mark complete + auto navigate to next if available
    const onVideoEnded = () => {
        markComplete(currentIndex);
        const next = currentIndex + 1;
        if (next < curriculum.length) {
            navigate(`/courses/${course.id}/player/${next}`);
        }
    };

    const handleCompleteAndNext = () => {
        markComplete(currentIndex);
        const next = currentIndex + 1;
        if (next < curriculum.length) navigate(`/courses/${course.id}/player/${next}`);
    };

    const handlePrev = () => {
        const prev = Math.max(0, currentIndex - 1);
        navigate(`/courses/${course.id}/player/${prev}`);
    };

    const handleNext = () => {
        const next = Math.min(curriculum.length - 1, currentIndex + 1);
        navigate(`/courses/${course.id}/player/${next}`);
    };

    return (
        <Layout>
            <div className="min-h-[calc(100vh-64px-56px)] bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 grid lg:grid-cols-4 gap-8">
                    {/* left column: course card & progress */}
                    <aside className="lg:col-span-1 order-2 lg:order-1">
                        <div className="bg-white rounded-lg shadow border border-gray-100 overflow-hidden">
                            <img src={course.image} alt={course.title} className="w-full h-36 object-cover"
                                 loading="lazy"/>
                            <div className="p-4">
                                <h3 className="text-lg font-semibold text-gray-900">{course.title}</h3>
                                <div className="mt-3">
                                    <div className="flex items-center justify-between text-sm text-gray-600">
                                        <span>Progress</span>
                                        <span className="font-medium text-gray-800">{percentComplete}%</span>
                                    </div>
                                    <div className="w-full h-2 bg-gray-200 rounded-full mt-2 overflow-hidden">
                                        <div className="h-full bg-lime-600" style={{width: `${percentComplete}%`}}/>
                                    </div>
                                    <div className="mt-4 flex gap-2">
                                        <button onClick={() => persistCompleted([])}
                                                className="flex-1 text-sm py-2 px-3 border rounded-md text-gray-700 hover:bg-gray-50">Reset
                                            Progress
                                        </button>
                                        <Link to={`/courses/${course.id}`}
                                              className="flex-1 text-sm py-2 px-3 bg-lime-600 text-white rounded-md text-center hover:bg-lime-700">Back</Link>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Curriculum list (compact) */}
                        <div className="mt-6 bg-white rounded-lg shadow border border-gray-100 p-3">
                            <h4 className="text-sm font-semibold text-gray-900 mb-2">Curriculum</h4>
                            <ul className="divide-y divide-gray-100 max-h-[48vh] overflow-auto">
                                {curriculum.map((item, idx) => {
                                    const active = idx === currentIndex;
                                    const done = completed.includes(idx);
                                    return (
                                        <li key={idx}
                                            className={`flex items-center justify-between px-2 py-3 cursor-pointer rounded-md ${active ? "bg-lime-50" : "hover:bg-gray-50"}`}
                                            onClick={() => gotoLesson(idx)}>
                                            <div className="flex items-center gap-3 min-w-0">
                                                <div
                                                    className={`flex items-center justify-center h-9 w-9 rounded-md ${active ? "bg-lime-600 text-white" : "bg-gray-100 text-gray-700"}`}>
                                                    {done ? <CheckCircle className="h-5 w-5"/> :
                                                        <PlayCircle className="h-5 w-5"/>}
                                                </div>

                                                <div className="min-w-0">
                                                    <div
                                                        className={`text-sm font-medium truncate ${active ? "text-lime-700" : "text-gray-800"}`}>{item.title}</div>
                                                    <div
                                                        className="text-xs text-gray-500 truncate">{item.duration}</div>
                                                </div>
                                            </div>

                                            <div className="ml-3 text-xs text-gray-500">
                                                {done ? "Done" : ""}
                                            </div>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    </aside>

                    {/* main player */}
                    <main className="lg:col-span-3 order-1 lg:order-2">
                        <motion.div initial={{opacity: 0, y: 8}} animate={{opacity: 1, y: 0}}
                                    transition={{duration: 0.35}}>

                            <div className="bg-white rounded-xl shadow overflow-hidden">
                                {/* Video */}
                                <div className="bg-black">
                                    <VideoPlayer
                                        src={curriculum[currentIndex]?.src}
                                        poster={course.image}
                                        title={curriculum[currentIndex]?.title}
                                        onEnded={onVideoEnded}
                                        className="rounded-t-xl"
                                    />
                                </div>

                                {/* Lesson info + actions */}
                                <div className="p-6">
                                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                                        <div>
                                            <h2 className="text-2xl font-bold text-gray-900">{curriculum[currentIndex]?.title}</h2>
                                            <p className="mt-1 text-sm text-gray-600">{curriculum[currentIndex]?.duration}</p>
                                        </div>

                                        <div className="flex items-center gap-3">
                                            <button onClick={handlePrev} disabled={currentIndex === 0}
                                                    className="inline-flex items-center gap-2 px-3 py-2 border rounded-md text-gray-700 hover:bg-gray-50 disabled:opacity-50">
                                                <ChevronLeft className="h-4 w-4"/> Prev
                                            </button>

                                            <button onClick={handleCompleteAndNext}
                                                    className="inline-flex items-center gap-2 px-4 py-2 bg-lime-600 text-white rounded-md hover:bg-lime-700">
                                                <CheckCircle className="h-4 w-4"/> Mark Complete & Next
                                            </button>

                                            <button onClick={handleNext}
                                                    disabled={currentIndex === curriculum.length - 1}
                                                    className="inline-flex items-center gap-2 px-3 py-2 border rounded-md text-gray-700 hover:bg-gray-50 disabled:opacity-50">
                                                Next <ChevronRight className="h-4 w-4"/>
                                            </button>
                                        </div>
                                    </div>

                                    {/* small description / course tips area (optional) */}
                                    <div className="mt-4 text-sm text-gray-700">
                                        Tip: finish a lesson to unlock the next one automatically. Progress is saved
                                        locally in your browser (demo).
                                    </div>
                                </div>
                            </div>

                            {/* small footer note */}
                            <div className="mt-6 text-sm text-gray-600">
                                <strong>{completedCount}</strong> of <strong>{curriculum.length}</strong> lessons
                                completed — {percentComplete}% done.
                            </div>
                        </motion.div>
                    </main>
                </div>
            </div>
        </Layout>
    );
}
