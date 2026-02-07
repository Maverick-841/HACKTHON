import { Mic, BookOpen, BarChart3, Sparkles } from 'lucide-react';

const FutureScope = () => {
    return (
        <div className="mt-12 border-t border-gray-800 pt-8 pb-4">
            <div className="flex items-center gap-2 mb-6">
                <Sparkles className="w-5 h-5 text-purple-400" />
                <h2 className="text-xl font-semibold text-white">Coming Soon to MoodMitra</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                {/* Feature 1 */}
                <div className="bg-gray-900/50 p-4 rounded-xl border border-gray-800">
                    <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center mb-3">
                        <Mic className="w-5 h-5 text-blue-400" />
                    </div>
                    <h3 className="text-white font-medium mb-1">Voice Mood Detection</h3>
                    <p className="text-sm text-gray-400">
                        Just speak to us. We'll analyze your voice tone to understand your mood better.
                    </p>
                </div>

                {/* Feature 2 */}
                <div className="bg-gray-900/50 p-4 rounded-xl border border-gray-800">
                    <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center mb-3">
                        <BarChart3 className="w-5 h-5 text-green-400" />
                    </div>
                    <h3 className="text-white font-medium mb-1">Mood Insights</h3>
                    <p className="text-sm text-gray-400">
                        Track your emotional journey with weekly reports and wellness patterns.
                    </p>
                </div>

                {/* Feature 3 */}
                <div className="bg-gray-900/50 p-4 rounded-xl border border-gray-800">
                    <div className="w-10 h-10 rounded-lg bg-pink-500/20 flex items-center justify-center mb-3">
                        <BookOpen className="w-5 h-5 text-pink-400" />
                    </div>
                    <h3 className="text-white font-medium mb-1">Journaling Mode</h3>
                    <p className="text-sm text-gray-400">
                        Write your thoughts and let AI suggest content based on your diary entries.
                    </p>
                </div>

            </div>
        </div>
    );
};

export default FutureScope;
