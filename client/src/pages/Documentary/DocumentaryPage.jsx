import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import DocumentaryGrid from "./DocumentaryGrid";
import { DocumentaryData } from "./DocumentaryData";
import { useShopContext } from "../../context/shopcontext";

const DocumentaryPage = () => {

    const navigate = useNavigate();
    const { userPreferences } = useShopContext();

    /* -----------------------------
          LOAD SAVED MOOD
    ----------------------------- */

    const activeMood =
        userPreferences.selectedMood ||
        localStorage.getItem("selectedMood");

    const [filteredDocs, setFilteredDocs] = useState([]);

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

        let result = [...DocumentaryData];

        // FILTER BY LANGUAGE
        if (userPreferences.selectedLanguages?.length > 0) {
            result = result.filter((doc) => {
                if (!doc.language) return true;

                return userPreferences.selectedLanguages.some(
                    (lang) =>
                        doc.language.toLowerCase().includes(lang.toLowerCase()) ||
                        lang.toLowerCase().includes(doc.language.toLowerCase())
                );
            });
        }

        // MOOD → CATEGORY MAP
        const moodToCategory = {

            "Need Motivation": [
                "Motivation",
                "Self Growth",
                "Business",
                "Entrepreneurship",
                "Inspiration"
            ],

            "Feeling Low": [
                "Life Balance",
                "Mental Health",
                "Wellness",
                "Hope",
                "Positivity"
            ],

            "Want Focus": [
                "Technology",
                "Artificial Intelligence",
                "Science",
                "Business Tech",
                "Cyber Security"
            ],

            "Want Peace": [
                "Nature",
                "Meditation",
                "Relaxation",
                "Spiritual",
                "Travel"
            ],

            "Just for Fun": [
                "Comedy",
                "Entertainment",
                "Gaming",
                "Film Making"
            ]
        };

        // APPLY MOOD FILTER
        if (activeMood) {

            const recommended =
                moodToCategory[activeMood] || [];

            if (recommended.length > 0) {
                result = result.filter((doc) =>
                    recommended.includes(doc.category)
                );
            }
        }

        setFilteredDocs(result);

    }, [activeMood, userPreferences.selectedLanguages]);

    /* -----------------------------
          UI
    ----------------------------- */

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#0B1020] to-[#0F172A] text-white">

            {/* HEADER */}
            <div className="p-6 border-b border-gray-700">

                <h1 className="text-2xl md:text-3xl font-bold">
                    Documentary Recommendations
                </h1>

                <p className="text-white/60 mt-2">
                    Based on your preferences • {filteredDocs.length} documentaries found
                </p>

            </div>

            {/* GRID */}
            <div className="p-6">
                <DocumentaryGrid documentaries={filteredDocs} />
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

export default DocumentaryPage;
