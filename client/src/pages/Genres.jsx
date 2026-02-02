// src/pages/Genres.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    Film,
    Music,
    Book,
    Podcast,
    Tv,
    Zap,
    FileVideo,
    Clapperboard
} from "lucide-react";
import { useShopContext } from "../context/shopcontext";


export default function Genres() {
    const [selectedContentType, setSelectedContentType] = useState("");
    const navigate = useNavigate();
    const { updatePreferences, userPreferences } = useShopContext();

    // Content types with icons (this is your "genres" selection)
    const contentTypes = [
        { label: "Movies", icon: <Film className="w-6 h-6" />, color: "from-pink-500 to-rose-500" },
        { label: "Music", icon: <Music className="w-6 h-6" />, color: "from-blue-500 to-cyan-500" },
        { label: "Books", icon: <Book className="w-6 h-6" />, color: "from-emerald-500 to-green-500" },
        { label: "Podcasts", icon: <Podcast className="w-6 h-6" />, color: "from-orange-500 to-amber-500" },
        { label: "Web Series", icon: <Tv className="w-6 h-6" />, color: "from-purple-500 to-violet-500" },
        { label: "Anime", icon: <Zap className="w-6 h-6" />, color: "from-indigo-500 to-blue-500" },
        { label: "Documentaries", icon: < Clapperboard className="w-6 h-6" />, color: "from-red-500 to-pink-500" },

    ];

    // Handle content type selection
    function handleSelect(contentType) {
        setSelectedContentType(contentType);

    }

    // Handle next button click
    function handleNext() {
        if (!selectedContentType) return;

        updatePreferences({ selectedContentType});
        // Navigate to the corresponding page based on selection
        switch (selectedContentType.toLowerCase()) {
            case "movies":
                navigate("/movies");
                break;
            case "music":
                navigate("/music");
                break;
            case "books":
                navigate("/books");
                break;
            case "podcasts":
                navigate("/podcasts");
                break;
            case "web series":
                navigate("/webseries");
                break;
            case "anime":
                navigate("/anime");
                break;
            case "documentaries":
                navigate("/documentaries");
                break;

            default:
                navigate("/home");
        }
    }

    function handleBack() {
        navigate("/language");
    }

    // Show user's previous selections
    const userMood = userPreferences.selectedMood;
    const userLanguages = userPreferences.selectedLanguages;

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0B1020] to-[#0F172A] text-white px-4">
            <div className="max-w-4xl w-full space-y-8">

                {/* Header with user info */}
                <div className="text-center space-y-4">
                    <h1 className="text-3xl font-bold">
                        What do you enjoy the most today?
                    </h1>
                    <p className="text-white/60">
                        Select your favorite content types to personalize your experience
                    </p>

                    {/* Show user's previous selections */}
                    {(userMood || userLanguages.length > 0) && (
                        <div className="flex flex-wrap justify-center gap-3 mt-4">
                            {userMood && (
                                <span className="px-3 py-1 rounded-full bg-pink-500/20 border border-pink-400 text-sm">
                                    Mood: {userMood}
                                </span>
                            )}
                            {userLanguages.map((lang, index) => (
                                <span
                                    key={index}
                                    className="px-3 py-1 rounded-full bg-purple-500/20 border border-purple-400 text-sm"
                                >
                                    {lang}
                                </span>
                            ))}
                        </div>
                    )}
                </div>

                {/* Content Type Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {contentTypes.map(({ label, icon, color }) => {
                        const isSelected = selectedContentType === label;

                        return (
                            <button
                                key={label}
                                onClick={() => handleSelect(label)}
                                className={`flex flex-col items-center justify-center p-6 rounded-2xl border transition-all duration-300
                                    ${isSelected
                                        ? `bg-gradient-to-br ${color} border-white scale-105 shadow-lg`
                                        : "bg-white/5 border-white/20 hover:bg-white/10 hover:scale-102"
                                    }`}
                            >
                                <div className={`mb-3 p-3 rounded-full ${isSelected ? 'bg-white/20' : 'bg-white/10'}`}>
                                    <div className={isSelected ? 'text-white' : 'text-white/80'}>
                                        {icon}
                                    </div>
                                </div>
                                <span className="text-sm font-medium">{label}</span>
                            </button>
                        );
                    })}
                </div>

                {/* Selected Content Display */}
                {selectedContentType && (
                    <div className="text-center">
                        <p className="text-white/70">
                            You selected:{" "}
                            <span className="font-semibold text-pink-300">
                                {selectedContentType}
                            </span>
                        </p>
                        <p className="text-sm text-white/50 mt-1">
                            Click "Next" to explore {selectedContentType.toLowerCase()} recommendations
                        </p>
                    </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex justify-between items-center pt-8">
                    <button
                        onClick={handleBack}
                        className="px-6 py-3 rounded-xl border border-white/30 hover:bg-white/10 transition"
                    >
                        ← Back
                    </button>

                    <button
                        onClick={handleNext}
                        disabled={!selectedContentType}
                        className={`px-8 py-3 rounded-xl font-medium transition-all
                            ${selectedContentType
                                ? "bg-gradient-to-r from-pink-500 to-purple-500 hover:scale-105"
                                : "bg-white/10 text-white/40 cursor-not-allowed"
                            }`}
                    >
                        Explore {selectedContentType || "Content"} →
                    </button>
                </div>

            </div>
        </div>
    );
}