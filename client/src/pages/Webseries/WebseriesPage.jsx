import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import WebseriesGrid from "./WebseriesGrid";
import { webSeriesData } from "./WebseriesData";
import { useShopContext } from "../../context/shopcontext";

const WebseriesPage = () => {

    const navigate = useNavigate();
    const { userPreferences } = useShopContext();

    /* -----------------------------
          LOAD SAVED MOOD
    ----------------------------- */

    const activeMood =
        userPreferences.selectedMood ||
        localStorage.getItem("selectedMood");

    const [filteredSeries, setFilteredSeries] = useState([]);

    /* -----------------------------
          SAVE MOOD
    ----------------------------- */

    useEffect(() => {
        if (userPreferences.selectedMood) {
            localStorage.setItem(
                "selectedMood",
                userPreferences.selectedMood
            );
        }
    }, [userPreferences.selectedMood]);

    /* -----------------------------
          BACK BUTTON
    ----------------------------- */

    const handleBackToGenres = () => {
        navigate("/genres");
    };

    /* -----------------------------
          FILTER LOGIC
    ----------------------------- */

    useEffect(() => {

        let result = [...webSeriesData];

        // FILTER BY LANGUAGE
        if (userPreferences.selectedLanguages?.length > 0) {
            result = result.filter((series) => {
                if (!series.language) return true;

                return userPreferences.selectedLanguages.some(
                    (lang) =>
                        series.language.toLowerCase().includes(lang.toLowerCase()) ||
                        lang.toLowerCase().includes(series.language.toLowerCase())
                );
            });
        }

        // MOOD → CATEGORY MAP
        const moodToCategory = {
            "Need Motivation": ["Action", "Thriller", "Crime"],
            "Feeling Low": ["Comedy", "Romance", "Drama"],
            "Want Focus": ["Thriller", "Mystery", "Sci-Fi"],
            "Want Peace": ["Drama", "Romance", "Comedy"],
            "Just for Fun": ["Comedy", "Action", "Adventure"]
        };

        // APPLY MOOD FILTER
        if (activeMood) {

            const recommended =
                moodToCategory[activeMood] || [];

            if (recommended.length > 0) {
                result = result.filter((s) =>
                    recommended.includes(s.category)
                );
            }
        }

        setFilteredSeries(result);

    }, [activeMood, userPreferences.selectedLanguages]);

    /* -----------------------------
          UI
    ----------------------------- */

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#0B1020] to-[#0F172A] text-white">

            {/* HEADER */}
            <div className="p-6 border-b border-gray-700">

                <h1 className="text-2xl md:text-3xl font-bold">
                    Web Series Recommendations
                </h1>

                <p className="text-white/60 mt-2">
                    Based on your preferences • {filteredSeries.length} series found
                </p>

            </div>

            {/* GRID */}
            <div className="flex lg:flex-row p-6 gap-6">
                <div className="flex-1">
                    <WebseriesGrid series={filteredSeries} />
                </div>
            </div>

            {/* MOBILE TAGS */}
            <div className="p-6 border-t border-gray-700 md:hidden">

                <div className="flex flex-wrap gap-2">

                    {activeMood && (
                        <span className="px-3 py-1 rounded-full bg-pink-500/20 border border-pink-400 text-sm">
                            Mood: {activeMood}
                        </span>
                    )}

                    {userPreferences.selectedLanguages?.map((lang, index) => (
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
