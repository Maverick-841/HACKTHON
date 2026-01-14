import React from "react";
import { Link } from "react-router-dom";
import { Compass } from "lucide-react";

const Navbar = () => {
    return (
        <header className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-full max-w-6xl px-4">
            <div className="bg-black/20 backdrop-blur-xl border border-white/10 rounded-2xl px-6 py-3">
                <div className="flex items-center justify-between">

                    {/* Logo */}
                    <Link to="/" className="flex items-center space-x-2">
                        <div className="bg-gradient-to-br from-purple-500 to-pink-500 p-2 rounded-xl">
                            <Compass className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-2xl font-bold text-white">
                            MoodMitra
                        </span>
                    </Link>

                    {/* Navigation */}
                    <nav className="flex items-center space-x-8">
                        <Link
                            to="/features"
                            className="text-sm font-medium text-white/80 hover:text-white transition-colors"
                        >
                            Features
                        </Link>

                        <Link
                            to="/about"
                            className="text-sm font-medium text-white/80 hover:text-white transition-colors"
                        >
                            About
                        </Link>
                        <Link
                            to="/language"
                            className="text-sm font-medium text-white/80 hover:text-white transition-colors"
                        >
                            Sign In
                        </Link>
                    </nav>

                </div>
            </div>
        </header>
    );
};

export default Navbar;
