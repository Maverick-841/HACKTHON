import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import MusicGrid from "./MusicGrid";
import { musicData } from "./MusicData";
import { useShopContext } from "../../context/shopcontext";

const MusicPage = () => {

  const navigate = useNavigate();
  const { userPreferences } = useShopContext();

  /* -----------------------------
        LOAD SAVED MOOD
  ----------------------------- */

  const activeMood =
    userPreferences.selectedMood ||
    localStorage.getItem("selectedMood");

  const [filteredMusic, setFilteredMusic] = useState([]);

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

    let result = [...musicData];

    // FILTER BY LANGUAGE
    if (userPreferences.selectedLanguages?.length > 0) {
      result = result.filter((music) => {
        if (!music.language) return true;

        return userPreferences.selectedLanguages.some(
          (lang) =>
            music.language.toLowerCase().includes(lang.toLowerCase()) ||
            lang.toLowerCase().includes(music.language.toLowerCase())
        );
      });
    }

    // MOOD → CATEGORY MAP
    const moodToCategory = {
      "Need Motivation": ["Workout", "Rock", "Hip-Hop"],
      "Feeling Low": ["Indie", "Acoustic", "Lo-Fi"],
      "Want Focus": ["Classical", "Instrumental", "Jazz"],
      "Want Peace": ["Ambient", "Meditation", "Nature Sounds"],
      "Just for Fun": ["Pop", "Party", "Dance"]
    };

    // APPLY MOOD FILTER
    if (activeMood) {

      const recommended =
        moodToCategory[activeMood] || [];

      if (recommended.length > 0) {
        result = result.filter((m) =>
          recommended.includes(m.category)
        );
      }
    }

    setFilteredMusic(result);

  }, [activeMood, userPreferences.selectedLanguages]);

  /* -----------------------------
        UI
  ----------------------------- */

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0B1020] to-[#0F172A] text-white">

      {/* HEADER */}
      <div className="p-6 border-b border-gray-700">

        <h1 className="text-2xl md:text-3xl font-bold">
          Music Recommendations
        </h1>

        <p className="text-white/60 mt-2">
          Based on your preferences • {filteredMusic.length} tracks found
        </p>

      </div>

      {/* GRID */}
      <div className="flex flex lg:flex-row p-6 gap-6">
        <div className="flex-1">
          <MusicGrid musicList={filteredMusic} />
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

export default MusicPage;
