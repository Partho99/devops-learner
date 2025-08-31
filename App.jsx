import React from 'react';
import '@radix-ui/themes/styles.css';
import { Theme } from '@radix-ui/themes';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './src/pages/Home.jsx';
import Courses from './src/pages/Courses.jsx';
import Terminal from './src/pages/Terminal.jsx';
import About from './src/pages/About.jsx';
import Contact from './src/pages/Contact.jsx';
import NotFound from './src/pages/NotFound.jsx';
import CourseDetails from './src/pages/CourseDetails.jsx';
import CodeEditorPage from "./src/pages/CodeEditorPage.jsx";
import VideoPlayer from "./src/components/VideoPlayer.jsx";
import CoursePlayerPage from "./src/pages/CoursePlayerPage.jsx";

export default function App() {
    return (
        <Theme appearance="inherit" radius="large" scaling="100%">
            <Router>
                <main className="min-h-screen bg-gray-50 text-gray-900">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/courses" element={<Courses />} />
                        <Route path="/terminal" element={<Terminal />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/contact" element={<Contact />} />
                        <Route path="/code-editor" element={<CodeEditorPage />} />
                        <Route path="/video-player" element={<VideoPlayer />} />
                        <Route path="*" element={<NotFound />} />
                        <Route path="/courses/:id" element={<CourseDetails />} />
                        <Route path="/course/lesson/:lessonId" element={<CoursePlayerPage />} />
                    </Routes>
                    <ToastContainer
                        position="top-right"
                        autoClose={3000}
                        newestOnTop
                        closeOnClick
                        pauseOnHover
                    />
                </main>
            </Router>
        </Theme>
    );
}