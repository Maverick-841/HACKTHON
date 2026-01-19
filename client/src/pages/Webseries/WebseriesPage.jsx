import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { webseriesData } from "./WebseriesData";
import WebseriesFiltersSidebar from "./WebseriesFiltersSidebar";
import WebseriesGrid from "./WebseriesGrid";
import WebseriesTopBar from "./WebseriesTopBar";
import { useShopContext } from "../../context/shopcontext";

const WebseriesPage = () => {
    const navigate = useNavigate();
    const { userPreferences } = useShopContext();
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [filteredSeries, setFilteredSeries] = useState([]);

    const handleFilterChange = (category) => {
        setSelectedCategories((prev) =>
            prev.includes(category)
                ? prev.filter((c) => c !== category)
                : [...prev, category]
        );
    };

    // Go back to genres selection
    const handleBackToGenres = () => {
        navigate('/genres');
    };

    // Apply filters based on user preferences
    useEffect(() => {
        let result = [...webseriesData];

        // 1. Filter by user's selected languages
        if (userPreferences.selectedLanguages && userPreferences.selectedLanguages.length > 0) {
            result = result.filter((series) => {
                // If series has no language property, show it
                if (!series.language) return true;
                // Check if series language matches any selected language
                return userPreferences.selectedLanguages.some(lang =>
                    series.language.toLowerCase().includes(lang.toLowerCase()) ||
                    lang.toLowerCase().includes(series.language.toLowerCase())
                );
            });
        }

        // 2. Filter by selected categories (genres)
        if (selectedCategories.length > 0) {
            result = result.filter((s) => selectedCategories.includes(s.category));
        }

        // 3. Filter by mood
        if (userPreferences.selectedMood) {
            // Map mood to webseries categories
            const moodToCategory = {
                "Need Motivation": ["Action", "Thriller", "Crime"],
                "Feeling Low": ["Comedy", "Romance", "Drama"],
                "Want Focus": ["Thriller", "Mystery", "Sci-Fi"],
                "Want Peace": ["Drama", "Romance", "Comedy"],
                "Just for Fun": ["Comedy", "Action", "Adventure"]
            };

            const recommendedCategories = moodToCategory[userPreferences.selectedMood] || [];
            if (recommendedCategories.length > 0 && selectedCategories.length === 0) {
                // If no categories selected, suggest based on mood
                result = result.filter((s) => recommendedCategories.includes(s.category));
            }
        }

        setFilteredSeries(result);
    }, [selectedCategories, userPreferences]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#0B1020] to-[#0F172A] text-white">
            {/* Header with Back Button */}
            <div className="p-6 border-b border-gray-700">
                <p className="text-white/60">
                    Based on your preferences • {filteredSeries.length} series found
                </p>
            </div>

            <div className="flex flex-col lg:flex-row p-6 gap-6">
                {/* LEFT SIDEBAR */}
                <div className="lg:w-64">
                    <WebseriesFiltersSidebar
                        selected={selectedCategories}
                        onChange={handleFilterChange}
                    />
                </div>

                {/* MAIN CONTENT AREA */}
                <div className="flex-1">
                    {/* TOP SEARCH BAR */}
                    <div className="mb-6">
                        <WebseriesTopBar />
                    </div>

                    {/* GRID BELOW */}
                    <WebseriesGrid series={filteredSeries} />
                </div>
            </div>

            {/* Mobile Preferences Display */}
            <div className="p-6 border-t border-gray-700 md:hidden">
                <div className="flex flex-wrap gap-2">
                    {userPreferences.selectedMood && (
                        <span className="px-3 py-1 rounded-full bg-pink-500/20 border border-pink-400 text-sm">
                            Mood: {userPreferences.selectedMood}
                        </span>
                    )}
                    {userPreferences.selectedLanguages && userPreferences.selectedLanguages.map((lang, index) => (
                        <span
                            key={index}
                            className="px-3 py-1 rounded-full bg-purple-500/20 border border-purple-400 text-sm"
                        >
                            {lang}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default WebseriesPage;