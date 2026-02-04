import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import BooksGrid from "./BooksGrid";
import { useShopContext } from "../../context/shopcontext";

const BooksPage = () => {

  const navigate = useNavigate();
  const { userPreferences } = useShopContext();

  /* -----------------------------------
      LOAD SAVED MOOD
  ----------------------------------- */

  const activeMood =
    userPreferences.selectedMood ||
    localStorage.getItem("selectedMood");

  const [books, setBooks] = useState([]);
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
      BACK BUTTON
  ----------------------------------- */

  const handleBackToGenres = () => {
    navigate("/genres");
  };

  /* -----------------------------------
      FETCH AI BOOKS
  ----------------------------------- */

  useEffect(() => {
    fetchAIBooks();
  }, []);

  async function fetchAIBooks() {
    try {
      const res = await fetch(
        "http://localhost:5000/api/mood/recommend",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            mood: activeMood,
            languages: userPreferences.selectedLanguages,
            category: userPreferences.selectedContentType


          })
        }
      );

      const data = await res.json();
      setBooks(data.recommendations);
      setLoading(false);

    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  /* -----------------------------------
      LOADING UI
  ----------------------------------- */

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Loading AI Book Recommendations...
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
            Book Recommendations
          </h1>

          <p className="text-white/60 mt-1">
            Based on your preferences • {books.length} books found
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
      <div className="p-6">
        <BooksGrid books={books} />
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

export default BooksPage;