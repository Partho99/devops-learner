import React, {useEffect, useMemo, useState, useCallback, useRef} from "react";
import {useParams, Link, useNavigate} from "react-router-dom";
import {motion, AnimatePresence} from "framer-motion";
import VideoPlayer from "../components/VideoPlayer";
import Layout from "../components/Layout";
import {
    ArrowLeft,
    BookOpen,
    CheckCircle,
    ChevronDown,
    ChevronLeft,
    ChevronRight,
    ChevronUp,
    Clock,
    Filter,
    ListTree,
    PlayCircle,
    Search,
    Share2,
    Users,
    Download as DownloadIcon,
} from "lucide-react";

// -------------------------------------------------------
// Demo data (mix of nested sections and single lessons)
// Replace with API results in production
// -------------------------------------------------------
const COURSES = [
    {
        id: "1",
        title: "Docker Fundamentals",
        image:
            "https://images.unsplash.com/photo-1605745341112-85968b19335b?w=1600&h=800&fit=crop&q=80",
        duration: "6 weeks",
        students: "2,340",
        level: "Beginner – Intermediate",
        // Mixed curriculum: some sections with many lessons, some single lessons
        curriculum: [
            {
                title: "Module 1 • Intro to Containers & Docker",
                items: [
                    {
                        title: "What are Containers?",
                        duration: "08m",
                        src: "https://www.w3schools.com/html/mov_bbb.mp4",
                    },
                    {
                        title: "Docker vs VMs",
                        duration: "12m",
                        src: "https://www.w3schools.com/html/movie.mp4",
                    },
                    {
                        title: "Installing Docker",
                        duration: "10m",
                        src: "https://www.w3schools.com/html/mov_bbb.mp4",
                    },
                ],
            },
            {
                title: "Module 2 • Images, Registries & Layers",
                items: [
                    {
                        title: "Understanding Images & Layers",
                        duration: "14m",
                        src: "https://www.w3schools.com/html/movie.mp4",
                    },
                    {
                        title: "Working with Docker Hub",
                        duration: "09m",
                        src: "https://www.w3schools.com/html/mov_bbb.mp4",
                    },
                    {
                        title: "Caching Strategy Deep Dive",
                        duration: "13m",
                        src: "https://www.w3schools.com/html/movie.mp4",
                    },
                ],
            },
            // Single lesson at the root (no items): we'll normalize it internally
            {
                title: "Volumes & Networking",
                duration: "36m",
                src: "https://www.w3schools.com/html/mov_bbb.mp4",
            },
            {
                title: "Dockerfile Deep Dive",
                duration: "41m",
                src: "https://www.w3schools.com/html/movie.mp4",
            },
            {
                title: "Workshop • docker-compose",
                items: [
                    {
                        title: "Compose Basics",
                        duration: "12m",
                        src: "https://www.w3schools.com/html/mov_bbb.mp4",
                    },
                    {
                        title: "Multi-service Apps",
                        duration: "18m",
                        src: "https://www.w3schools.com/html/movie.mp4",
                    },
                ],
            },
        ],
    },
];

// ------------------------- helpers -------------------------
const clamp = (v, min, max) => Math.max(min, Math.min(max, v));
const storageKeys = (courseId) => ({
    progress: `course_progress_${courseId}`,
    notes: `course_notes_${courseId}`,
});

/** Normalize the mixed curriculum into a flat list of lessons while keeping
 *  section/lesson relationships. Also return section metadata for rendering.
 */
function buildStructure(curriculum) {
    const sections = [];
    const flat = [];
    const sectionStarts = [];
    const perSectionCounts = [];

    let flatIndex = 0;
    curriculum.forEach((node, sIdx) => {
        // A node may be a section with items or a single lesson
        const isSection = Array.isArray(node.items);

        sectionStarts[sIdx] = flatIndex;

        if (isSection) {
            const normalizedItems = node.items.map((lesson, i) => ({
                ...lesson,
                sectionTitle: node.title,
                sectionIndex: sIdx,
                itemIndex: i,
                flatIndex: flatIndex + i,
            }));
            perSectionCounts[sIdx] = normalizedItems.length;
            sections.push({
                sectionIndex: sIdx,
                title: node.title,
                items: normalizedItems,
                type: "section",
            });
            flat.push(...normalizedItems);
            flatIndex += normalizedItems.length;
        } else {
            // Single lesson becomes a one-item section for UI consistency
            const one = {
                title: node.title,
                duration: node.duration,
                src: node.src,
                sectionTitle: null,
                sectionIndex: sIdx,
                itemIndex: 0,
                flatIndex,
            };
            perSectionCounts[sIdx] = 1;
            sections.push({
                sectionIndex: sIdx,
                title: node.title,
                items: [one],
                type: "single",
            });
            flat.push(one);
            flatIndex += 1;
        }
    });

    return {sections, flat, sectionStarts, perSectionCounts};
}

export default function CoursePlayerPage() {
    const {id, lessonIndex} = useParams();
    const navigate = useNavigate();

    // get course (fallback to first)
    const course = useMemo(
        () => (id ? COURSES.find((c) => c.id === id) : COURSES[0]),
        [id]
    );

    // Build structure (flat lessons + section metadata)
    const structure = useMemo(() => {
        return buildStructure(course?.curriculum || []);
    }, [course]);

    const totalLessons = structure.flat.length || 1;

    // parse index from URL
    const parsedIndex = useMemo(() => {
        if (!course) return 0;
        if (typeof lessonIndex === "undefined") return 0;
        const parsed = parseInt(lessonIndex, 10);
        if (Number.isNaN(parsed)) return 0;
        return clamp(parsed, 0, totalLessons - 1);
    }, [lessonIndex, course, totalLessons]);

    const [currentIndex, setCurrentIndex] = useState(parsedIndex);
    const [completed, setCompleted] = useState([]); // stores flat indices
    const [searchQuery, setSearchQuery] = useState("");
    const [notes, setNotes] = useState({});
    const [isSavingNote, setIsSavingNote] = useState(false);
    const [expandedSections, setExpandedSections] = useState(() => new Set());

    // ensure index sync when route changes
    useEffect(() => {
        setCurrentIndex(parsedIndex);
    }, [parsedIndex]);

    // Initialize expanded sections (open the current one by default)
    useEffect(() => {
        if (!structure.sections.length) return;
        const s = structure.sections.find((sec) =>
            sec.items.some((it) => it.flatIndex === currentIndex)
        );
        if (s) setExpandedSections(new Set([s.sectionIndex]));
    }, [structure, currentIndex]);

    // load persisted progress & notes when course changes
    useEffect(() => {
        if (!course) return;
        const keys = storageKeys(course.id);
        try {
            const saved = JSON.parse(localStorage.getItem(keys.progress) || "[]");
            if (Array.isArray(saved)) setCompleted(saved);
        } catch (e) {
            setCompleted([]);
        }
        try {
            const savedNotes = JSON.parse(localStorage.getItem(keys.notes) || "{}");
            setNotes(savedNotes);
        } catch (e) {
            setNotes({});
        }
    }, [course]);

    // persist helpers
    const persistCompleted = useCallback(
        (arr) => {
            if (!course) return;
            try {
                localStorage.setItem(storageKeys(course.id).progress, JSON.stringify(arr));
            } catch {
            }
        },
        [course]
    );

    // persist notes (debounced)
    useEffect(() => {
        if (!course) return;
        setIsSavingNote(true);
        const t = setTimeout(() => {
            try {
                localStorage.setItem(storageKeys(course.id).notes, JSON.stringify(notes || {}));
            } catch {
            }
            setIsSavingNote(false);
        }, 600);
        return () => clearTimeout(t);
    }, [notes, course]);

    // deriveds
    const completedCount = completed.length;
    const percentComplete = Math.round((completedCount / totalLessons) * 100);
    const currentLesson = structure.flat[currentIndex] || {};

    // navigation helpers
    const gotoLesson = useCallback(
        (idx) => {
            setCurrentIndex(idx);
            if (course) navigate(`/courses/${course.id}/player/${idx}`);
        },
        [course, navigate]
    );

    const markComplete = useCallback(
        (idx) => {
            setCompleted((prev) => {
                if (prev.includes(idx)) return prev;
                const next = [...prev, idx].sort((a, b) => a - b);
                persistCompleted(next);
                return next;
            });
        },
        [persistCompleted]
    );

    const onVideoEnded = useCallback(() => {
        markComplete(currentIndex);
        const next = currentIndex + 1;
        if (next < totalLessons) gotoLesson(next);
    }, [currentIndex, totalLessons, markComplete, gotoLesson]);

    const handlePrev = () => gotoLesson(Math.max(0, currentIndex - 1));
    const handleNext = () => gotoLesson(Math.min(totalLessons - 1, currentIndex + 1));
    const handleCompleteAndNext = () => {
        markComplete(currentIndex);
        handleNext();
    };

    // keyboard shortcuts
    useEffect(() => {
        const handler = (e) => {
            const tag = document.activeElement?.tagName;
            if (["INPUT", "TEXTAREA", "SELECT"].includes(tag)) return;
            if (e.key === "ArrowLeft") handlePrev();
            if (e.key === "ArrowRight") handleNext();
            if (e.key.toLowerCase() === "m") markComplete(currentIndex);
        };
        window.addEventListener("keydown", handler);
        return () => window.removeEventListener("keydown", handler);
    }, [currentIndex, totalLessons, markComplete]);

    // notes helpers
    const lessonNoteKey = (idx) => `lesson_${idx}`;
    const handleNoteChange = (idx, value) => {
        setNotes((prev) => ({...(prev || {}), [lessonNoteKey(idx)]: value}));
    };
    const handleSaveNoteNow = () => {
        if (!course) return;
        try {
            localStorage.setItem(storageKeys(course.id).notes, JSON.stringify(notes || {}));
            setIsSavingNote(false);
            toastNotify("Notes saved");
        } catch {
        }
    };

    // simple toast via CustomEvent (hook into your global toast if any)
    const toastNotify = (msg) => {
        if (window && window?.dispatchEvent) {
            window.dispatchEvent(new CustomEvent("app-toast", {detail: msg}));
        } else {
            alert(msg); // fallback
        }
    };

    // searching (lessons only)
    const normalizedQuery = (searchQuery || "").trim().toLowerCase();
    const sectionsFiltered = useMemo(() => {
        if (!normalizedQuery) return structure.sections;
        return structure.sections
            .map((sec) => ({
                ...sec,
                items: sec.items.filter((it) => {
                    const idxText = String(it.flatIndex + 1);
                    return (
                        (it.title || "").toLowerCase().includes(normalizedQuery) ||
                        (sec.title || "").toLowerCase().includes(normalizedQuery) ||
                        idxText.includes(normalizedQuery)
                    );
                }),
            }))
            .filter((sec) => sec.items.length > 0);
    }, [structure.sections, normalizedQuery]);

    // expand/collapse helpers
    const toggleSection = (sectionIndex) => {
        setExpandedSections((prev) => {
            const next = new Set(prev);
            if (next.has(sectionIndex)) next.delete(sectionIndex);
            else next.add(sectionIndex);
            return next;
        });
    };

    // share
    const shareCourse = async () => {
        const url = window.location.href;
        try {
            if (navigator.share) {
                await navigator.share({title: course.title, text: course.title, url});
            } else {
                await navigator.clipboard.writeText(url);
                toastNotify("Course link copied to clipboard");
            }
        } catch {
        }
    };

    if (!course) {
        return (
            <Layout>
                <div className="max-w-4xl mx-auto py-20 text-center">
                    <h2 className="text-2xl font-semibold text-gray-800">Course not found</h2>
                    <Link
                        to="/courses"
                        className="mt-4 inline-block text-lime-600 hover:underline"
                    >
                        Back to Courses
                    </Link>
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            <div className="min-h-[calc(100vh-64px-56px)] bg-gray-50 pb-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    {/* Header */}
                    <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                            <Link
                                to="/courses"
                                className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900"
                            >
                                <ArrowLeft className="h-4 w-4"/> Back
                            </Link>
                            <h1 className="text-xl font-semibold text-gray-900">
                                {course.title}
                            </h1>
                            <div className="hidden md:inline-flex items-center gap-2 ml-4 text-sm text-gray-500">
                                <Clock className="h-4 w-4"/> {course.duration}
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="hidden sm:flex items-center gap-2 text-sm text-gray-600">
                                <Users className="h-4 w-4"/> {course.students}
                            </div>
                            <button
                                onClick={shareCourse}
                                className="inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm border hover:bg-gray-50"
                            >
                                <Share2 className="h-4 w-4"/> Share
                            </button>
                        </div>
                    </div>

                    <div className="mt-6 grid grid-cols-1 lg:grid-cols-4 gap-8">
                        {/* LEFT: Player + meta */}
                        <main className="lg:col-span-3 order-1 lg:order-1">
                            <motion.div
                                initial={{opacity: 0, y: 6}}
                                animate={{opacity: 1, y: 0}}
                                transition={{duration: 0.35}}
                            >
                                <div className="bg-white rounded-xl shadow overflow-hidden">
                                    {/* video */}
                                    <div className="bg-black">
                                        <VideoPlayer
                                            src={currentLesson?.src}
                                            poster={course.image}
                                            title={currentLesson?.title}
                                            onEnded={onVideoEnded}
                                            className="w-full h-auto rounded-t-xl"
                                        />
                                    </div>

                                    {/* Lesson header */}
                                    <div className="p-5 border-t border-gray-100">
                                        <div
                                            className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                                            <div>
                                                <div className="text-xs uppercase tracking-wider text-gray-500">
                                                    {currentLesson?.sectionTitle || "Lesson"}
                                                </div>
                                                <h2 className="text-2xl font-semibold text-gray-900">
                                                    {currentLesson?.title}
                                                </h2>
                                                <div className="mt-1 text-sm text-gray-600">
                                                    {currentLesson?.duration || ""}
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-2">
                                                <button
                                                    onClick={handlePrev}
                                                    disabled={currentIndex === 0}
                                                    className="inline-flex items-center gap-2 px-3 py-2 border rounded-md text-gray-700 hover:bg-gray-50 disabled:opacity-50"
                                                >
                                                    <ChevronLeft className="h-4 w-4"/> Prev
                                                </button>

                                                <button
                                                    onClick={handleCompleteAndNext}
                                                    className="inline-flex items-center gap-2 px-4 py-2 bg-lime-600 text-white rounded-md hover:bg-lime-700"
                                                >
                                                    <CheckCircle className="h-4 w-4"/> Mark Complete & Next
                                                </button>

                                                <button
                                                    onClick={handleNext}
                                                    disabled={currentIndex === totalLessons - 1}
                                                    className="inline-flex items-center gap-2 px-3 py-2 border rounded-md text-gray-700 hover:bg-gray-50 disabled:opacity-50"
                                                >
                                                    Next <ChevronRight className="h-4 w-4"/>
                                                </button>
                                            </div>
                                        </div>

                                        <div className="mt-4 text-sm text-gray-700">
                                            Tip: finish a lesson or click <em>Mark Complete & Next</em> to
                                            advance. Progress is saved locally in your browser.
                                        </div>
                                    </div>
                                </div>

                                {/* notes */}
                                <div className="mt-6 bg-white rounded-lg border border-gray-100 p-4 shadow-sm">
                                    <div className="flex items-start justify-between">
                                        <div>
                                            <h3 className="text-sm font-semibold text-gray-900">
                                                Notes for this lesson
                                            </h3>
                                            <p className="text-xs text-gray-500 mt-1">
                                                Your notes are saved locally and auto-saved.
                                            </p>
                                        </div>
                                        <div className="text-xs text-gray-500">
                                            {isSavingNote ? "Saving..." : "Saved"}
                                        </div>
                                    </div>
                                    <textarea
                                        value={notes[lessonNoteKey(currentIndex)] || ""}
                                        onChange={(e) => handleNoteChange(currentIndex, e.target.value)}
                                        placeholder="Write a short summary, code snippets, or timestamps you want to remember..."
                                        className="mt-3 w-full min-h-[120px] resize-vertical rounded-md border border-gray-200 p-3 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-lime-500"
                                    />
                                    <div className="mt-3 flex items-center gap-2">
                                        <button
                                            onClick={handleSaveNoteNow}
                                            className="inline-flex items-center gap-2 px-3 py-2 rounded-md bg-gray-50 border hover:bg-gray-100"
                                        >
                                            <DownloadIcon className="h-4 w-4"/> Save Note
                                        </button>
                                        <button
                                            onClick={() => {
                                                handleNoteChange(currentIndex, "");
                                                toastNotify("Note cleared");
                                            }}
                                            className="inline-flex items-center gap-2 px-3 py-2 rounded-md border hover:bg-gray-50"
                                        >
                                            Clear
                                        </button>
                                        <div className="ml-auto text-xs text-gray-500">
                                            Tip: press <kbd className="rounded bg-gray-100 px-1">←</kbd>/<kbd
                                            className="rounded bg-gray-100 px-1">→</kbd>
                                            to navigate, <kbd className="rounded bg-gray-100 px-1">M</kbd> to mark
                                            complete.
                                        </div>
                                    </div>
                                </div>

                                {/* progress footer */}
                                <div className="mt-6 text-sm text-gray-600">
                                    <strong>{completedCount}</strong> of <strong>{totalLessons}</strong> lessons
                                    completed — {percentComplete}% done.
                                </div>
                            </motion.div>
                        </main>

                        {/* RIGHT: Playlist & course card */}
                        <aside className="lg:col-span-1 order-2 lg:order-2">
                            <div className="sticky top-20 space-y-4">
                                {/* Course card */}
                                <div className="bg-white rounded-lg border border-gray-100 p-4 shadow-sm">
                                    <div className="flex items-center gap-3">
                                        <img
                                            src={course.image}
                                            alt={course.title}
                                            className="h-12 w-12 rounded object-cover"
                                        />
                                        <div>
                                            <div className="text-sm font-semibold text-gray-900">
                                                {course.title}
                                            </div>
                                            <div className="text-xs text-gray-500">
                                                {course.duration} • {course.level}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-4 flex items-center gap-2">
                                        <div
                                            className="h-12 w-12 flex items-center justify-center rounded-full bg-lime-50">
                                            <div className="text-sm font-semibold text-lime-700">
                                                {percentComplete}%
                                            </div>
                                        </div>
                                        <div className="flex-1">
                                            <div className="text-sm font-medium">Progress</div>
                                            <div className="text-xs text-gray-500">
                                                {completedCount} of {totalLessons} lessons
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-4 grid grid-cols-2 gap-2">
                                        <button
                                            onClick={() => navigate(`/courses/${course.id}`)}
                                            className="px-3 py-2 text-sm border rounded-md"
                                        >
                                            Course Page
                                        </button>
                                        <button
                                            onClick={() => toastNotify("Resources not implemented in demo")}
                                            className="px-3 py-2 text-sm border rounded-md"
                                        >
                                            Resources
                                        </button>
                                    </div>
                                </div>

                                {/* playlist */}
                                <div className="bg-white rounded-lg border border-gray-100 p-3 shadow-sm">
                                    <div className="flex items-center gap-2">
                                        <Search className="h-4 w-4 text-gray-400"/>
                                        <input
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            placeholder="Search lessons or sections"
                                            className="w-full text-sm placeholder:text-gray-400 bg-transparent outline-none"
                                        />
                                    </div>

                                    <div className="mt-3 max-h-[52vh] overflow-auto">
                                        {/* Sections with collapsible lists */}
                                        <ul className="space-y-2">
                                            {sectionsFiltered.map((sec) => {
                                                const doneInSection = completed.filter(
                                                    (i) => structure.flat[i]?.sectionIndex === sec.sectionIndex
                                                ).length;
                                                const totalInSection = sec.items.length;
                                                const isExpanded = expandedSections.has(sec.sectionIndex);

                                                // auto-expand current section
                                                const hasActive = sec.items.some((it) => it.flatIndex === currentIndex);

                                                return (
                                                    <li key={sec.sectionIndex}
                                                        className="border border-gray-100 rounded-lg">
                                                        {/* Section header */}
                                                        <button
                                                            onClick={() => toggleSection(sec.sectionIndex)}
                                                            className={`w-full flex items-center justify-between gap-2 px-3 py-2 ${
                                                                hasActive ? "bg-lime-50" : "bg-white"
                                                            }`}
                                                        >
                                                            <div className="flex items-center gap-2 min-w-0">
                                                                <ListTree className="h-4 w-4 text-gray-500"/>
                                                                <span className={`text-sm font-medium truncate ${
                                                                    hasActive ? "text-lime-700" : "text-gray-800"
                                                                }`}>
                                  {sec.title}
                                </span>
                                                            </div>
                                                            <div className="flex items-center gap-3 shrink-0">
                                <span className="text-xs text-gray-500">
                                  {doneInSection}/{totalInSection}
                                </span>
                                                                {isExpanded ? (
                                                                    <ChevronUp className="h-4 w-4 text-gray-500"/>
                                                                ) : (
                                                                    <ChevronDown className="h-4 w-4 text-gray-500"/>
                                                                )}
                                                            </div>
                                                        </button>

                                                        <AnimatePresence initial={false}>
                                                            {isExpanded && (
                                                                <motion.ul
                                                                    initial={{height: 0, opacity: 0}}
                                                                    animate={{height: "auto", opacity: 1}}
                                                                    exit={{height: 0, opacity: 0}}
                                                                    className="divide-y divide-gray-100"
                                                                >
                                                                    {sec.items.map((item) => {
                                                                        const active = item.flatIndex === currentIndex;
                                                                        const done = completed.includes(item.flatIndex);
                                                                        return (
                                                                            <li key={item.flatIndex}
                                                                                className={`px-2 py-3 ${
                                                                                    active ? "bg-lime-50" : "hover:bg-gray-50"
                                                                                }`}>
                                                                                <div className="flex items-start gap-3">
                                                                                    <button
                                                                                        onClick={() => gotoLesson(item.flatIndex)}
                                                                                        className={`flex items-center justify-center h-9 w-9 rounded-md ${
                                                                                            active
                                                                                                ? "bg-lime-600 text-white"
                                                                                                : "bg-gray-100 text-gray-700"
                                                                                        }`}
                                                                                        aria-label="Play lesson"
                                                                                    >
                                                                                        {done ? (
                                                                                            <CheckCircle
                                                                                                className="h-5 w-5"/>
                                                                                        ) : (
                                                                                            <PlayCircle
                                                                                                className="h-5 w-5"/>
                                                                                        )}
                                                                                    </button>
                                                                                    <div className="flex-1 min-w-0">
                                                                                        <div
                                                                                            className={`text-sm font-medium truncate ${
                                                                                                active ? "text-lime-700" : "text-gray-800"
                                                                                            }`}
                                                                                        >
                                                                                            {item.title}
                                                                                        </div>
                                                                                        <div
                                                                                            className="text-xs text-gray-500 truncate">
                                                                                            {item.duration}
                                                                                        </div>
                                                                                    </div>
                                                                                    <div
                                                                                        className="ml-3 text-xs text-gray-500">
                                                                                        {done ? "Done" : ""}
                                                                                    </div>
                                                                                </div>
                                                                            </li>
                                                                        );
                                                                    })}
                                                                </motion.ul>
                                                            )}
                                                        </AnimatePresence>
                                                    </li>
                                                );
                                            })}
                                        </ul>
                                    </div>

                                    <div className="mt-3 flex items-center gap-2">
                                        <button
                                            onClick={() => {
                                                setCompleted([]);
                                                persistCompleted([]);
                                                toastNotify("Progress reset");
                                            }}
                                            className="flex-1 px-3 py-2 text-sm border rounded-md"
                                        >
                                            Reset
                                        </button>
                                        <button
                                            onClick={() => gotoLesson(0)}
                                            className="flex-1 px-3 py-2 bg-lime-600 text-white rounded-md"
                                        >
                                            Start
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </aside>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
