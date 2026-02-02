import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import WebseriesGrid from "./WebseriesGrid";
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

    const [series, setSeries] = useState([]);
    const [loading, setLoading] = useState(true);

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
          FETCH AI WEBSERIES
    ----------------------------- */

    useEffect(() => {
        fetchAIWebseries();
    }, []);

    async function fetchAIWebseries() {
        try {
            const res = await fetch(
                "http://localhost:5000/api/mood/recommend",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        mood: activeMood,
                        languages: userPreferences.selectedLanguages,
                        category: "Web Series"
                    })
                }
            );

            const data = await res.json();
            setSeries(data.recommendations);
            setLoading(false);

        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }

    /* -----------------------------
          LOADING UI
    ----------------------------- */

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center text-white">
                Loading AI Web Series Recommendations...
            </div>
        );
    }

    /* -----------------------------
          UI
    ----------------------------- */

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#0B1020] to-[#0F172A] text-white">

            {/* HEADER */}
            <div className="p-6 border-b border-gray-700 flex justify-between items-center">

                <div>
                    <h1 className="text-2xl md:text-3xl font-bold">
                        Web Series Recommendations
                    </h1>

                    <p className="text-white/60 mt-2">
                        Based on your preferences • {series.length} series found
                    </p>
                </div>

                <button
                    onClick={handleBackToGenres}
                    className="px-4 py-2 rounded-lg border border-white/30 hover:bg-white/10"
                >
                    ← Back
                </button>

            </div>

            {/* GRID */}
            <div className="flex lg:flex-row p-6 gap-6">
                <div className="flex-1">
                    <WebseriesGrid series={series} />
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