import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Layers } from "lucide-react";   // genre-style icon

export default function Genres() {
    const [selectedItems, setSelectedItems] = useState([]);
    const navigate = useNavigate();

    const options = [
        { label: "Movies", icon: "🎬" },
        { label: "Music", icon: "🎵" },
        { label: "Books", icon: "📚" },
        { label: "Podcasts", icon: "🎙️" },
        { label: "YouTube Channels", icon: "▶️" },
        { label: "Web Series", icon: "📺" },
        { label: "Anime", icon: "🍥" },
        { label: "Documentaries", icon: "🎥" }
    ];

    function handleSelect(item) {
        setSelectedItems((prev) =>
            prev.includes(item)
                ? prev.filter((i) => i !== item)
                : [...prev, item]
        );
    }

    function handleNext() {
        navigate('/moviesPage');
    }

    function handleBack() {
        navigate('/');
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0B1020] to-[#0F172A] text-white px-4">
            <div className="max-w-xl w-full space-y-8">

                {/* Top Icon */}
                <div className="flex justify-center">
                    <div className="p-3 rounded-full bg-white/10 border border-white/20">
                        <Layers className="w-7 h-7 text-purple-400" />
                    </div>
                </div>

                {/* Title */}
                <div className="text-center">
                    <h1 className="text-3xl font-bold">What do you enjoy the most today?</h1>
                    <p className="text-white/60 mt-2">
                        Select your favorite content types to personalize your experience
                    </p>
                </div>

                {/* Selected Chips */}
                {selectedItems.length > 0 && (
                    <div className="flex flex-wrap justify-center gap-2">
                        {selectedItems.map((item) => (
                            <span
                                key={item}
                                className="px-3 py-1 rounded-full bg-purple-500/20 border border-purple-400 text-sm"
                            >
                                {item}
                            </span>
                        ))}
                    </div>
                )}

                {/* Options */}
                <div className="flex flex-wrap justify-center gap-4">
                    {options.map(({ label, icon }) => (
                        <button
                            key={label}
                            onClick={() => handleSelect(label)}
                            className={`flex items-center gap-2 px-5 py-2 rounded-full border transition-all
                ${selectedItems.includes(label)
                                    ? "bg-purple-600 border-purple-400 scale-105"
                                    : "bg-white/5 border-white/20 hover:bg-white/10"
                                }`}
                        >
                            <span className="text-lg">{icon}</span>
                            <span>{label}</span>
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
                        className="px-8 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 hover:scale-105 transition-all font-medium"
                    >
                        Next →
                    </button>
                </div>

            </div>
        </div>
    );
}
