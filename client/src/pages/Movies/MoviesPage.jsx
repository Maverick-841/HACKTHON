import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import MoviesGrid from "./MoviesGrid";
import { useShopContext } from "../../context/shopcontext";
import { moviesData } from "./moviesData";

const MoviesPage = () => {

  const navigate = useNavigate();
  const { userPreferences } = useShopContext();

  /* -----------------------------
        LOAD SAVED MOOD
  ----------------------------- */

  const activeMood =
    userPreferences.selectedMood ||
    localStorage.getItem("selectedMood");

  const [filteredMovies, setFilteredMovies] = useState([]);

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

    let result = [...moviesData];

    // FILTER BY LANGUAGE
    if (userPreferences.selectedLanguages?.length > 0) {
      result = result.filter((movie) => {
        if (!movie.language) return true;

        return userPreferences.selectedLanguages.some(
          (lang) =>
            movie.language.toLowerCase().includes(lang.toLowerCase()) ||
            lang.toLowerCase().includes(movie.language.toLowerCase())
        );
      });
    }

    // MOOD → CATEGORY MAP
    const moodToCategory = {

      "Need Motivation": [
        "Dream Chasers",
        "Never Give Up",
        "Rise to the Top",
        "Self Growth",
        "Student & Career Struggles",
        "Comeback Stories"
      ],

      "Feeling Low": [
        "Comfort Watch",
        "Healing Stories",
        "Light Hearted",
        "Hope & Positivity"
      ],

      "Want Focus": [
        "Mindset & Discipline",
        "Deep Work",
        "Biopics",
        "Documentary"
      ],

      "Want Peace": [
        "Feel Good",
        "Slow Life",
        "Nature & Travel",
        "Spiritual"
      ],

      "Just for Fun": [
        "Comedy",
        "Light Entertainment",
        "Feel Good Fun",
        "Family Friendly"
      ]
    };

    // APPLY MOOD FILTER
    if (activeMood) {

      const recommended =
        moodToCategory[activeMood] || [];

      if (recommended.length > 0) {
        result = result.filter((movie) =>
          recommended.includes(movie.category)
        );
      }
    }

    setFilteredMovies(result);

  }, [activeMood, userPreferences.selectedLanguages]);

  /* -----------------------------
        UI
  ----------------------------- */

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0B1020] to-[#0F172A] text-white">

      {/* HEADER */}
      <div className="p-6 border-b border-gray-700">

        <h1 className="text-2xl md:text-3xl font-bold">
          Movie Recommendations
        </h1>

        <p className="text-white/60 mt-2">
          Based on your preferences • {filteredMovies.length} movies found
        </p>

      </div>

      {/* GRID */}
      <div className="flex flex lg:flex-row p-6 gap-6">
        <div className="flex-1">
          <MoviesGrid movies={filteredMovies} />
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

export default MoviesPage;
