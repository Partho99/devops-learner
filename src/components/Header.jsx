import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Terminal, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Header = ({ onSearch }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [query, setQuery] = useState('');
    const [showSuggestions, setShowSuggestions] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const inputRef = useRef(null);

    const navigation = [
        { name: 'Home', href: '/' },
        { name: 'Courses', href: '/courses' },
        { name: 'Linux Terminal', href: '/terminal' },
        { name: 'Code Editor', href: '/code-editor' },
        { name: 'About', href: '/about' },
        { name: 'Contact', href: '/contact' },
        { name: 'Video Player', href: '/video-player' }
    ];

    const isActive = (path) => location.pathname === path;

    const suggestionsBase = navigation.map((n) => n.name).concat([
        'Docker',
        'Kubernetes',
        'Vim Tips',
        'Bash Cheatsheet',
        'CI/CD'
    ]);

    const filteredSuggestions = suggestionsBase.filter(
        (s) => query.trim() !== '' && s.toLowerCase().includes(query.toLowerCase())
    );

    useEffect(() => {
        if (isMenuOpen) {
            setTimeout(() => inputRef.current?.focus(), 80);
        }
    }, [isMenuOpen]);

    useEffect(() => {
        const onKey = (e) => {
            if (e.key === 'Escape') {
                setIsMenuOpen(false);
                setShowSuggestions(false);
            }
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, []);

    const handleSearch = (e) => {
        e?.preventDefault();
        const q = query.trim();
        if (!q) return;
        if (onSearch) {
            onSearch(q);
        } else {
            navigate(`/search?q=${encodeURIComponent(q)}`);
        }
        setIsMenuOpen(false);
        setShowSuggestions(false);
    };

    const handleSuggestionClick = (s) => {
        setQuery(s);
        if (onSearch) onSearch(s);
        else navigate(`/search?q=${encodeURIComponent(s)}`);
        setShowSuggestions(false);
        setIsMenuOpen(false);
    };

    return (
        <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-sm border-b border-gray-200 shadow-sm">
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2 text-lime-600 hover:text-lime-700 transition-colors">
            <span className="p-1 rounded-lg bg-lime-50 shadow-inner">
              <Terminal className="h-8 w-8" />
            </span>
                        <span className="font-bold text-xl tracking-tight font-inter">DevOps Learner</span>
                    </Link>

                    {/* Centered search for md+ */}
                    <div className="flex-1 flex justify-center px-4">
                        <form onSubmit={handleSearch} role="search" className="w-full max-w-md">
                            <div className="relative">
                                <input
                                    ref={inputRef}
                                    value={query}
                                    onChange={(e) => {
                                        setQuery(e.target.value);
                                        setShowSuggestions(true);
                                    }}
                                    onFocus={() => setShowSuggestions(true)}
                                    onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
                                    className="w-full rounded-2xl border border-gray-200 bg-white/60 placeholder-gray-400 py-2 pl-10 pr-10 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-lime-200"
                                    placeholder="Search courses, tutorials, commands (e.g. 'docker run')..."
                                    aria-label="Search"
                                />
                                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                                {query && (
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setQuery('');
                                            inputRef.current?.focus();
                                        }}
                                        className="absolute right-3 top-2.5 h-5 w-5 text-gray-400"
                                        aria-label="Clear search"
                                    >
                                        <X className="h-5 w-5" />
                                    </button>
                                )}

                                <AnimatePresence>
                                    {showSuggestions && filteredSuggestions.length > 0 && (
                                        <motion.div
                                            initial={{ opacity: 0, y: -6 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -6 }}
                                            className="absolute mt-2 w-full max-w-lg bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden z-50"
                                        >
                                            {filteredSuggestions.map((s) => (
                                                <button
                                                    key={s}
                                                    type="button"
                                                    onMouseDown={(e) => e.preventDefault()}
                                                    onClick={() => handleSuggestionClick(s)}
                                                    className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50"
                                                >
                                                    {s}
                                                </button>
                                            ))}
                                            <div className="px-3 py-2 text-xs text-gray-500">Press Enter to search</div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </form>
                    </div>

                    {/* Desktop navigation (right aligned) */}
                    <div className="hidden md:flex items-center space-x-6">
                        {navigation.map((item) => (
                            <Link
                                key={item.name}
                                to={item.href}
                                className={`text-sm font-medium transition-colors ${
                                    isActive(item.href)
                                        ? 'text-lime-600 border-b-2 border-lime-600 pb-1'
                                        : 'text-gray-700 hover:text-lime-600'
                                }`}
                            >
                                {item.name}
                            </Link>
                        ))}
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden flex items-center gap-2">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="p-2 rounded-md text-gray-700 hover:text-lime-600 hover:bg-gray-100 transition"
                            aria-label="Toggle menu"
                        >
                            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>

                {/* Mobile menu (animated) */}
                <AnimatePresence>
                    {isMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="md:hidden py-4 border-t border-gray-200"
                        >
                            <div className="flex flex-col gap-3 px-1">
                                <form onSubmit={handleSearch} className="w-full">
                                    <div className="relative">
                                        <input
                                            ref={inputRef}
                                            value={query}
                                            onChange={(e) => {
                                                setQuery(e.target.value);
                                                setShowSuggestions(true);
                                            }}
                                            placeholder="Search courses, commands..."
                                            aria-label="Search"
                                            className="w-full rounded-2xl border border-gray-200 py-2 pl-10 pr-10 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-lime-200"
                                        />
                                        <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                                        {query && (
                                            <button type="button" onClick={() => setQuery('')} className="absolute right-3 top-2.5 h-5 w-5 text-gray-400">
                                                <X className="h-5 w-5" />
                                            </button>
                                        )}
                                    </div>

                                    {showSuggestions && filteredSuggestions.length > 0 && (
                                        <div className="mt-2 bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
                                            {filteredSuggestions.map((s) => (
                                                <button key={s} type="button" onClick={() => handleSuggestionClick(s)} className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50">
                                                    {s}
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </form>

                                <div className="flex flex-col pt-2">
                                    {navigation.map((item) => (
                                        <Link
                                            key={item.name}
                                            to={item.href}
                                            onClick={() => setIsMenuOpen(false)}
                                            className={`px-3 py-2 rounded-md font-medium transition-colors ${
                                                isActive(item.href) ? 'text-lime-600 bg-lime-50' : 'text-gray-700 hover:text-lime-600 hover:bg-gray-50'
                                            }`}
                                        >
                                            {item.name}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </nav>
        </header>
    );
};

export default Header;
