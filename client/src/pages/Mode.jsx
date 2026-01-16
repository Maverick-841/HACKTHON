import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Smile } from "lucide-react";

export default function Mode() {
    const [selectedMood, setSelectedMood] = useState(null);
    const navigate = useNavigate();

    const moods = [
        { label: "Feeling Low", icon: "😔" },
        { label: "Need Motivation", icon: "🔥" },
        { label: "Want Focus", icon: "🧠" },
        { label: "Want Peace", icon: "😌" },
        { label: "Just for Fun", icon: "😄" },
    ];

    function handleNext() {
        if (!selectedMood) return;
        navigate("/language"); // 👉 next page
    }

    function handleBack() {
        navigate("/");
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0B1020] to-[#0F172A] text-white px-4">
            <div className="max-w-xl w-full space-y-8">

                {/* Icon */}
                <div className="flex justify-center">
                    <div className="p-3 rounded-full bg-white/10 border border-white/20">
                        <Smile className="w-7 h-7 text-pink-400" />
                    </div>
                </div>

                {/* Title */}
                <div className="text-center">
                    <h1 className="text-3xl font-bold">How are you feeling today?</h1>
                    <p className="text-white/60 mt-2">
                        Your mood helps us suggest the right content
                    </p>
                </div>

                {/* Selected Mood */}
                {selectedMood && (
                    <div className="flex justify-center">
                        <span className="px-4 py-1 rounded-full bg-pink-500/20 border border-pink-400 text-sm">
                            {selectedMood}
                        </span>
                    </div>
                )}

                {/* Mood Options */}
                <div className="flex flex-wrap justify-center gap-4">
                    {moods.map((mood) => (
                        <button
                            key={mood.label}
                            onClick={() => setSelectedMood(mood.label)}
                            className={`flex items-center gap-3 px-6 py-3 rounded-full border transition-all
                                ${selectedMood === mood.label
                                    ? "bg-pink-600 border-pink-400 scale-105"
                                    : "bg-white/5 border-white/20 hover:bg-white/10"
                                }`}
                        >
                            <span className="text-xl">{mood.icon}</span>
                            <span className="text-sm">{mood.label}</span>
                        </button>
                    ))}
                </div>

                {/* Bottom Buttons */}
                <div className="flex justify-between items-center pt-6">
                    <button
                        onClick={handleBack}
                        className="px-6 py-2 rounded-xl border border-white/30 hover:bg-white/10 transition"
                    >
                        ← Back
                    </button>

                    <button
                        onClick={handleNext}
                        disabled={!selectedMood}
                        className={`px-8 py-3 rounded-xl font-medium transition-all
                            ${selectedMood
                                ? "bg-gradient-to-r from-pink-500 to-purple-500 hover:scale-105"
                                : "bg-white/10 text-white/40 cursor-not-allowed"
                            }`}
                    >
                        Next →
                    </button>
                </div>

            </div>
        </div>
    );
}
