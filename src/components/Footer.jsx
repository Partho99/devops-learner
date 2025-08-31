import React from 'react';
import { Github, Linkedin, Twitter } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                    <div className="text-center md:text-left">
                        <p className="text-gray-300">© 2025 DevOps Learner. All rights reserved.</p>
                    </div>

                    <div className="flex items-center space-x-6">
                        <a
                            href="https://github.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-400 hover:text-white transition-colors"
                            aria-label="GitHub"
                        >
                            <Github className="h-5 w-5" />
                        </a>
                        <a
                            href="https://linkedin.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-400 hover:text-white transition-colors"
                            aria-label="LinkedIn"
                        >
                            <Linkedin className="h-5 w-5" />
                        </a>
                        <a
                            href="https://twitter.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-400 hover:text-white transition-colors"
                            aria-label="Twitter"
                        >
                            <Twitter className="h-5 w-5" />
                        </a>
                    </div>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-800 text-center">
                    <p className="text-gray-400 text-sm">
                        Built with ❤️ by{' '}
                        <a
                            href="https://meku.dev"
                            target="_blank"
                            rel="nofollow"
                            className="text-lime-400 hover:text-lime-300 transition-colors"
                        >
                            prodxit.com
                        </a>
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;