import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Compass, Heart, Github, Twitter, Mail, Zap, Shield, Database } from 'lucide-react';

export function Footer() {
    const navigate = useNavigate();

    // Function to handle Privacy click - Now uses React Router
    const handlePrivacyClick = () => {
        navigate('/privacy'); // Navigate to Privacy page
    };

    // Function to handle Data Usage click - Now uses React Router
    const handleDataUsageClick = () => {
        navigate('/privacy'); // Can be same page or different route
    };

    // Function to handle Terms click
    const handleTermsClick = () => {
        alert("📄 Terms of Service:\n• Use MoodMitra responsibly\n• Content recommendations are AI-generated\n• We're not responsible for third-party content");
    };

    // Function to handle Cookies click
    const handleCookiesClick = () => {
        alert("🍪 Cookie Policy:\n• We use only essential cookies\n• No tracking cookies\n• Cookies are stored locally");
    };

    // Function to handle Clear Data click
    const handleClearDataClick = () => {
        if (window.confirm("🗑️ Clear all local data?\nThis will reset your preferences and mood history.")) {
            localStorage.removeItem('moodHistory');
            localStorage.removeItem('userPreferences');
            alert("✅ All local data cleared!");
        }
    };

    return (
        <footer className="bg-black/5 backdrop-blur-xl border-t border-white/10 mt-20">
            <div className="max-w-6xl mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Brand */}
                    <div className="space-y-4">
                        <div className="flex items-center space-x-2">
                            <div className="bg-gradient-to-br from-blue-400 to-purple-500 p-2 rounded-xl">
                                <Zap className="w-6 h-6 text-white" />
                            </div>
                            <span className="text-2xl font-bold text-white">MoodMitra</span>
                        </div>
                        <p className="text-white/60 text-sm">
                            Personalized mood-based recommendations. Explore movies, music, web series, books, and anime that match your vibe today.
                        </p>

                        {/* Data Management - ADDED */}
                        <div className="pt-4">
                            <button
                                onClick={handleClearDataClick}
                                className="text-xs text-white/40 hover:text-white/70 transition-colors flex items-center gap-1"
                            >
                                <Database className="w-3 h-3" />
                                Clear Local Data
                            </button>
                        </div>
                    </div>

                    {/* Product */}
                    <div className="space-y-4">
                        <h3 className="text-white font-semibold">Product</h3>
                        <div className="space-y-2">
                            <a href="#" className="block text-white/60 hover:text-white transition-colors text-sm">
                                Features
                            </a>
                            <a href="#" className="block text-white/60 hover:text-white transition-colors text-sm">
                                How it Works
                            </a>
                            <a href="#" className="block text-white/60 hover:text-white transition-colors text-sm">
                                Recommendations
                            </a>
                            <a href="#" className="block text-white/60 hover:text-white transition-colors text-sm">
                                API
                            </a>
                        </div>
                    </div>

                    {/* Company */}
                    <div className="space-y-4">
                        <h3 className="text-white font-semibold">Company</h3>
                        <div className="space-y-2">
                            <a href="#" className="block text-white/60 hover:text-white transition-colors text-sm">
                                About
                            </a>
                            <a href="#" className="block text-white/60 hover:text-white transition-colors text-sm">
                                Blog
                            </a>
                            <a href="#" className="block text-white/60 hover:text-white transition-colors text-sm">
                                Careers
                            </a>
                            <a href="#" className="block text-white/60 hover:text-white transition-colors text-sm">
                                Contact
                            </a>
                        </div>
                    </div>

                    {/* Connect */}
                    <div className="space-y-4">
                        <h3 className="text-white font-semibold">Connect</h3>
                        <div className="flex space-x-3">
                            <a
                                href="#"
                                className="p-2 bg-white/5 hover:bg-white/10 rounded-xl transition-colors"
                                title="Twitter"
                            >
                                <Twitter className="w-5 h-5 text-white/60 hover:text-white" />
                            </a>
                            <a
                                href="#"
                                className="p-2 bg-white/5 hover:bg-white/10 rounded-xl transition-colors"
                                title="GitHub"
                            >
                                <Github className="w-5 h-5 text-white/60 hover:text-white" />
                            </a>
                            <a
                                href="#"
                                className="p-2 bg-white/5 hover:bg-white/10 rounded-xl transition-colors"
                                title="Email"
                            >
                                <Mail className="w-5 h-5 text-white/60 hover:text-white" />
                            </a>
                        </div>
                    </div>
                </div>

                {/* Privacy Links Section - UPDATED */}
                <div className="mt-8 pt-6 border-t border-white/10">
                    <div className="flex flex-col md:flex-row items-center justify-center space-y-3 md:space-y-0 md:space-x-8">
                        <button
                            onClick={handlePrivacyClick}
                            className="flex items-center gap-2 text-white/60 hover:text-white transition-colors text-sm"
                        >
                            <Shield className="w-4 h-4" />
                            Privacy Policy
                        </button>

                        <span className="hidden md:inline text-white/20">|</span>

                        <button
                            onClick={handleDataUsageClick}
                            className="text-white/60 hover:text-white transition-colors text-sm"
                        >
                            📊 Data Usage
                        </button>

                        <span className="hidden md:inline text-white/20">|</span>

                        <button
                            onClick={handleTermsClick}
                            className="text-white/60 hover:text-white transition-colors text-sm"
                        >
                            Terms of Service
                        </button>

                        <span className="hidden md:inline text-white/20">|</span>

                        <button
                            onClick={handleCookiesClick}
                            className="text-white/60 hover:text-white transition-colors text-sm"
                        >
                            Cookie Policy
                        </button>
                    </div>
                </div>

                {/* Bottom */}
                <div className="border-t border-white/10 mt-8 pt-8 flex flex-col md:flex-row items-center justify-between">
                    <div>
                        <p className="text-white/60 text-sm">
                            © 2026 MoodMitra. All rights reserved.
                        </p>
                        {/* Privacy Status Indicator - ADDED */}
                        <div className="mt-2 flex items-center gap-2">
                            <div className={`w-2 h-2 rounded-full ${localStorage.getItem('privacyAccepted') ? 'bg-green-400' : 'bg-yellow-400'}`}></div>
                            <span className="text-xs text-white/40">
                                {localStorage.getItem('privacyAccepted') ? 'Privacy accepted' : 'Privacy pending'}
                            </span>
                        </div>
                    </div>

                    <div className="flex items-center space-x-1 mt-4 md:mt-0">
                        <span className="text-white/60 text-sm">Made with</span>
                        <Heart className="w-4 h-4 text-red-400" />
                        <span className="text-white/60 text-sm">for mood explorers</span>
                    </div>
                </div>

                {/* API Credits - UPDATED */}
                <div className="mt-6 text-center">
                    <p className="text-white/40 text-xs">
                        Powered by: TMDB • Spotify Web API • YouTube Data API • Jikan API
                    </p>
                    <p className="text-white/20 text-xs mt-1">
                        All trademarks belong to their respective owners
                    </p>
                </div>
            </div>
        </footer>
    );
}