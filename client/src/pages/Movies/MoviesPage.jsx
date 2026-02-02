import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import MoviesGrid from "./MoviesGrid";
import { useShopContext } from "../../context/shopcontext";

const MoviesPage = () => {

  const navigate = useNavigate();
  const { userPreferences } = useShopContext();

  // -----------------------------
  // LOAD SAVED MOOD
  // -----------------------------

  const activeMood =
    userPreferences.selectedMood ||
    localStorage.getItem("selectedMood");

  // -----------------------------
  // STATES
  // -----------------------------

  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  // -----------------------------
  // SAVE MOOD
  // -----------------------------

  useEffect(() => {
    if (userPreferences.selectedMood) {
      localStorage.setItem(
        "selectedMood",
        userPreferences.selectedMood
      );
    }
  }, [userPreferences.selectedMood]);

  // -----------------------------
  // FETCH AI MOVIES
  // -----------------------------

  useEffect(() => {
    fetchAIMovies();
  }, []);

  async function fetchAIMovies() {
    try {
      const res = await fetch(
        "http://localhost:5000/api/mood/recommend",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            mood: activeMood,
            languages: userPreferences.selectedLanguages,
            category: "Movies"
          })
        }
      );

      const data = await res.json();

      // Backend sends string JSON → convert to array
      setMovies(data.recommendations);

      setLoading(false);

    } catch (error) {
      console.log("AI Movie Error:", error);
      setLoading(false);
    }
  }

  // -----------------------------
  // BACK BUTTON
  // -----------------------------

  const handleBackToGenres = () => {
    navigate("/genres");
  };

  // -----------------------------
  // LOADING UI
  // -----------------------------

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0B1020] to-[#0F172A] text-white">
        <h2 className="text-xl">Loading AI Movie Recommendations...</h2>
      </div>
    );
  }

  // -----------------------------
  // UI
  // -----------------------------

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0B1020] to-[#0F172A] text-white">

      {/* HEADER */}
      <div className="p-6 border-b border-gray-700">

        <h1 className="text-2xl md:text-3xl font-bold">
          AI Movie Recommendations
        </h1>

        <p className="text-white/60 mt-2">
          Based on your mood & language • {movies.length} results
        </p>

      </div>

      {/* GRID */}
      <div className="flex flex lg:flex-row p-6 gap-6">
        <div className="flex-1">
          <MoviesGrid movies={movies} />
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