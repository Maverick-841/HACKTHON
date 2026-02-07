import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import WebseriesGrid from "./WebseriesGrid";
import { useShopContext } from "../../context/shopcontext";

const WebseriesPage = () => {

    const navigate = useNavigate();
    const { userPreferences } = useShopContext();

    /* -----------------------------------
        LOAD SAVED MOOD
    ----------------------------------- */

    const activeMood =
        userPreferences.selectedMood ||
        localStorage.getItem("selectedMood");

    const [series, setSeries] = useState([]);
    const [loading, setLoading] = useState(true);

    /* -----------------------------------
        SAVE MOOD
    ----------------------------------- */

    useEffect(() => {
        if (userPreferences.selectedMood) {
            localStorage.setItem(
                "selectedMood",
                userPreferences.selectedMood
            );
        }
    }, [userPreferences.selectedMood]);



    /* -----------------------------------
        FETCH AI WEB SERIES
    ----------------------------------- */

    useEffect(() => {
        async function fetchAIWebseries() {
            try {
                const res = await fetch(
                    "http://localhost:5000/api/mood/recommend",
                    {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            mood: activeMood,
                            language: userPreferences.selectedLanguages?.[0] || "English",
                            category: "Web Series"
                        })
                    }
                );

                const data = await res.json();

                if (!res.ok) {
                    console.error(data);
                    setSeries([]);
                    setLoading(false);
                    return;
                }

                setSeries(data.recommendations || []);
                setLoading(false);

            } catch (error) {
                console.log("AI Webseries Error:", error);
                setLoading(false);
            }
        }

        if (activeMood) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setLoading(true);
            fetchAIWebseries();
        }
    }, [activeMood, userPreferences.selectedLanguages]);

    /* -----------------------------------
        LOADING UI
    ----------------------------------- */

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center text-white">
                Loading AI Web Series Recommendations...
            </div>
        );
    }

    /* -----------------------------------
        UI
    ----------------------------------- */

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#0B1020] to-[#0F172A] text-white">

            {/* HEADER */}
            <div className="p-6 border-b border-gray-700 flex justify-between items-center">

                <div>
                    <h1 className="text-2xl md:text-3xl font-bold">
                        Web Series Recommendations
                    </h1>

                    <p className="text-white/60 mt-1">
                        Based on your preferences • {series.length} series found
                    </p>
                </div>



            </div>

            {/* GRID */}
            <div className="p-6">
                <WebseriesGrid series={series} />
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
