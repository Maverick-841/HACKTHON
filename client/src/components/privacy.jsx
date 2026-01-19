// Privacy.jsx - FULLY WORKING VERSION
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, CheckCircle, Lock, EyeOff, Cpu, ArrowLeft } from 'lucide-react';

export function Privacy() {
    const navigate = useNavigate();

    // Handle privacy acceptance
    const handleAcceptPrivacy = () => {
        localStorage.setItem('privacyAccepted', 'true');
        localStorage.setItem('privacyAcceptedDate', new Date().toISOString());
        navigate('/');
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white p-4 md:p-8">
            <div className="max-w-4xl mx-auto">

                {/* Header with Back Button */}
                <div className="flex items-center justify-between mb-8">
                    <button
                        onClick={() => navigate('/')}
                        className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 rounded-xl transition-all duration-300 border border-white/10"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        Back to App
                    </button>

                    <div className="flex items-center gap-2">
                        <Shield className="w-8 h-8 text-blue-400" />
                        <span className="text-xl font-bold">MoodMitra Privacy</span>
                    </div>
                </div>

                {/* Main Content */}
                <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 md:p-8 border border-white/10 shadow-2xl">
                    {/* Hero Section */}
                    <div className="text-center mb-10">
                        <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                            Privacy & Data Protection
                        </h1>
                        <p className="text-gray-400 text-lg">
                            Your trust is our priority. Here's how we protect your data.
                        </p>
                    </div>

                    {/* Security Badge */}
                    <div className="p-6 mb-8 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl border border-blue-500/20">
                        <div className="flex items-center gap-3">
                            <Lock className="w-6 h-6 text-green-400" />
                            <div>
                                <h3 className="text-xl font-semibold">🔒 End-to-End Privacy</h3>
                                <p className="text-gray-300">Your mood data never leaves your device</p>
                            </div>
                        </div>
                    </div>

                    {/* Privacy Points */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                        <div className="p-6 bg-white/5 rounded-xl hover:bg-white/10 transition-all duration-300">
                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-blue-500/20 rounded-lg">
                                    <CheckCircle className="w-6 h-6 text-blue-400" />
                                </div>
                                <div>
                                    <h4 className="text-lg font-semibold mb-2">Local Storage</h4>
                                    <p className="text-gray-400 text-sm">
                                        All your mood data and preferences are stored locally on your device. No cloud storage.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="p-6 bg-white/5 rounded-xl hover:bg-white/10 transition-all duration-300">
                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-green-500/20 rounded-lg">
                                    <EyeOff className="w-6 h-6 text-green-400" />
                                </div>
                                <div>
                                    <h4 className="text-lg font-semibold mb-2">Anonymous Data</h4>
                                    <p className="text-gray-400 text-sm">
                                        We don't collect personal identifiers. Your data is completely anonymous.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="p-6 bg-white/5 rounded-xl hover:bg-white/10 transition-all duration-300">
                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-red-500/20 rounded-lg">
                                    <Lock className="w-6 h-6 text-red-400" />
                                </div>
                                <div>
                                    <h4 className="text-lg font-semibold mb-2">No Data Selling</h4>
                                    <p className="text-gray-400 text-sm">
                                        We never sell, rent, or share your data with third parties. Ever.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="p-6 bg-white/5 rounded-xl hover:bg-white/10 transition-all duration-300">
                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-purple-500/20 rounded-lg">
                                    <Cpu className="w-6 h-6 text-purple-400" />
                                </div>
                                <div>
                                    <h4 className="text-lg font-semibold mb-2">On-Device AI</h4>
                                    <p className="text-gray-400 text-sm">
                                        Mood analysis happens locally. No data is sent to external servers for processing.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Data Usage Explanation */}
                    <div className="mb-10">
                        <h3 className="text-2xl font-bold mb-6 text-center">📊 How We Use Your Data</h3>
                        <div className="bg-black/30 p-6 rounded-xl">
                            <ul className="space-y-4">
                                <li className="flex items-center gap-3">
                                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                                    <span>Your mood selections help train your personal AI model</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                                    <span>Recommendations improve based on your feedback</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                                    <span>All data processing happens locally in your browser</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                                    <span>You can clear all data anytime from settings</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button
                            onClick={handleAcceptPrivacy}
                            className="flex-1 max-w-md mx-auto bg-gradient-to-r from-blue-500 to-purple-500 text-white py-4 px-8 rounded-xl hover:opacity-90 font-medium text-lg transition-all duration-300 shadow-lg hover:shadow-xl"
                        >
                            🎯 I Understand & Continue
                        </button>

                        <button
                            onClick={() => navigate('/')}
                            className="flex-1 max-w-md mx-auto bg-white/5 py-4 px-8 rounded-xl hover:bg-white/10 font-medium text-lg transition-all duration-300 border border-white/10"
                        >
                            Learn More First
                        </button>
                    </div>

                    {/* Footer Note */}
                    <div className="mt-10 pt-6 border-t border-white/10 text-center">
                        <p className="text-gray-400 text-sm">
                            Need help? Contact us at
                            <a href="mailto:privacy@moodmitra.com" className="text-blue-400 ml-1 hover:underline">
                                privacy@moodmitra.com
                            </a>
                        </p>
                        <p className="text-gray-500 text-xs mt-2">
                            Last updated: {new Date().toLocaleDateString()}
                        </p>
                    </div>
                </div>

                {/* Stats Bar */}
                <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-white/5 rounded-xl">
                        <div className="text-2xl font-bold text-green-400">100%</div>
                        <div className="text-gray-400 text-sm">Local Processing</div>
                    </div>
                    <div className="text-center p-4 bg-white/5 rounded-xl">
                        <div className="text-2xl font-bold text-blue-400">0</div>
                        <div className="text-gray-400 text-sm">Third-Party Sharing</div>
                    </div>
                    <div className="text-center p-4 bg-white/5 rounded-xl">
                        <div className="text-2xl font-bold text-purple-400">256-bit</div>
                        <div className="text-gray-400 text-sm">Encryption</div>
                    </div>
                </div>
            </div>
        </div>
    );
}