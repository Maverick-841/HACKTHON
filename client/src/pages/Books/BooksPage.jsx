import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import BooksGrid from "./BooksGrid";
import { useShopContext } from "../../context/shopcontext";
import { bookData } from "./BookData";

const BooksPage = () => {

  const navigate = useNavigate();
  const { userPreferences } = useShopContext();

  /* -----------------------------------
      LOAD SAVED DATA
  ----------------------------------- */

  const [selectedCategories, setSelectedCategories] = useState(() => {
    return JSON.parse(localStorage.getItem("bookCategories")) || [];
  });

  const [filteredBooks, setFilteredBooks] = useState([]);

  const activeMood =
    userPreferences.selectedMood ||
    localStorage.getItem("selectedMood");

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
      SAVE CATEGORIES
  ----------------------------------- */

  useEffect(() => {
    localStorage.setItem(
      "bookCategories",
      JSON.stringify(selectedCategories)
    );
  }, [selectedCategories]);

  /* -----------------------------------
      BACK BUTTON
  ----------------------------------- */

  const handleBackToGenres = () => {
    navigate("/genres");
  };

  /* -----------------------------------
      FILTER LOGIC
  ----------------------------------- */

  useEffect(() => {

    let result = [...bookData];

    // FILTER BY CATEGORY
    if (selectedCategories.length > 0) {
      result = result.filter((book) =>
        selectedCategories.includes(book.category)
      );
    }

    // MOOD TO CATEGORY MAP
    const moodToCategory = {

      "Just for Fun": ["Fiction", "Comedy", "Mystery"],

      "Need Motivation": ["Self-Help", "Biography", "Inspirational"],

      "Feeling Low": ["Fiction", "Romance", "Poetry"],

      "Want Focus": ["Non-Fiction", "Educational", "Science"],

      "Want Peace": ["Spirituality", "Meditation", "Nature"]

    };

    // FILTER BY MOOD ONLY IF NO CATEGORY SELECTED
    if (activeMood && selectedCategories.length === 0) {

      const recommended =
        moodToCategory[activeMood] || [];

      if (recommended.length > 0) {
        result = result.filter((book) =>
          recommended.includes(book.category)
        );
      }
    }

    setFilteredBooks(result);

  }, [selectedCategories, activeMood]);

  /* -----------------------------------
      UI
  ----------------------------------- */

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0B1020] to-[#0F172A] text-white">

      {/* HEADER */}
      <div className="p-6 border-b border-gray-700 flex items-center gap-4">


        <div>
          <h1 className="text-2xl md:text-3xl font-bold">
            Book Recommendations
          </h1>

          <p className="text-white/60 mt-1">
            Based on your preferences • {filteredBooks.length} books found
          </p>
        </div>

      </div>

      {/* GRID */}
      <div className="p-6">
        <BooksGrid books={filteredBooks} />
      </div>

      {/* MOBILE TAGS */}
      <div className="p-6 border-t border-gray-700 md:hidden">

        <div className="flex flex-wrap gap-2">

          {activeMood && (
            <span className="px-3 py-1 rounded-full bg-pink-500/20 border border-pink-400 text-sm">
              Mood: {activeMood}
            </span>
          )}

          {selectedCategories.map((cat, index) => (
            <span
              key={index}
              className="px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400 text-sm"
            >
              {cat}
            </span>
          ))}

        </div>

      </div>

    </div>
  );
};

export default BooksPage;
