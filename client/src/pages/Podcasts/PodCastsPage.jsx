import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import PodcastsGrid from "./PodcastsGrid";
import { podcastsData } from "./PodCastsData";
import { useShopContext } from "../../context/shopcontext";

const PodCastsPage = () => {

  const navigate = useNavigate();
  const { userPreferences } = useShopContext();

  /* -----------------------------
        LOAD SAVED MOOD
  ----------------------------- */

  const activeMood =
    userPreferences.selectedMood ||
    localStorage.getItem("selectedMood");

  const [filteredPodcasts, setFilteredPodcasts] = useState([]);

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

    let result = [...podcastsData];

    // FILTER BY LANGUAGE
    if (userPreferences.selectedLanguages?.length > 0) {
      result = result.filter((podcast) => {
        if (!podcast.language) return true;

        return userPreferences.selectedLanguages.some(
          (lang) =>
            podcast.language.toLowerCase().includes(lang.toLowerCase()) ||
            lang.toLowerCase().includes(podcast.language.toLowerCase())
        );
      });
    }

    // MOOD → CATEGORY MAP
    const moodToCategory = {
      "Need Motivation": ["Business", "Self-Help", "Entrepreneurship"],
      "Feeling Low": ["Comedy", "Storytelling", "Entertainment"],
      "Want Focus": ["Educational", "Technology", "Science"],
      "Want Peace": ["Meditation", "Spirituality", "Wellness"],
      "Just for Fun": ["Comedy", "Entertainment", "Pop Culture"]
    };

    // APPLY MOOD FILTER
    if (activeMood) {

      const recommended =
        moodToCategory[activeMood] || [];

      if (recommended.length > 0) {
        result = result.filter((p) =>
          recommended.includes(p.category)
        );
      }
    }

    setFilteredPodcasts(result);

  }, [activeMood, userPreferences.selectedLanguages]);

  /* -----------------------------
        UI
  ----------------------------- */

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0B1020] to-[#0F172A] text-white">

      {/* HEADER */}
      <div className="p-6 border-b border-gray-700">

        <h1 className="text-2xl md:text-3xl font-bold">
          Podcast Recommendations
        </h1>

        <p className="text-white/60 mt-2">
          Based on your preferences • {filteredPodcasts.length} podcasts found
        </p>

      </div>

      {/* GRID */}
      <div className="flex flex-col lg:flex-row p-6 gap-6">
        <div className="flex-1">
          <PodcastsGrid podcasts={filteredPodcasts} />
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

export default PodCastsPage;
