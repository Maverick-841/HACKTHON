import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import AnimeGrid from "./AnimeGrid";
import { useShopContext } from "../../context/shopcontext";
import { animeData } from "./AnimeData";

const AnimePage = () => {

  const navigate = useNavigate();
  const { userPreferences } = useShopContext();

  /* -----------------------------------
      LOAD SAVED DATA FROM STORAGE
  ----------------------------------- */

  const [selectedCategories, setSelectedCategories] = useState(() => {
    return JSON.parse(localStorage.getItem("animeCategories")) || [];
  });

  const [filteredAnime, setFilteredAnime] = useState([]);

  const activeMood =
    userPreferences.selectedMood ||
    localStorage.getItem("selectedMood");

  /* -----------------------------------
      SAVE MOOD TO STORAGE
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
      SAVE CATEGORIES TO STORAGE
  ----------------------------------- */

  useEffect(() => {
    localStorage.setItem(
      "animeCategories",
      JSON.stringify(selectedCategories)
    );
  }, [selectedCategories]);

  /* -----------------------------------
      HANDLE CATEGORY CLICK
  ----------------------------------- */

  const handleFilterChange = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

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

    let result = [...animeData];

    const moodToCategory = {

      "Need Motivation": [
        "Action",
        "Adventure",
        "Sports",
        "Biography",
        "Inspirational",
        "Success"
      ],

      "Feeling Low": [
        "Romance",
        "Comedy",
        "Drama",
        "Slice of Life"
      ],

      "Want Focus": [
        "Psychological",
        "Thriller",
        "Mystery",
        "Study",
        "Productivity"
      ],

      "Want Peace": [
        "Slice of Life",
        "Romance",
        "Feel Good",
        "Spiritual",
        "Nature"
      ],

      "Just for Fun": [
        "Comedy",
        "Parody",
        "Adventure",
        "Fantasy"
      ]
    };

    /* 👉 FILTER BY CATEGORY */

    if (selectedCategories.length > 0) {
      result = result.filter((anime) =>
        selectedCategories.includes(anime.category)
      );
    }

    /* 👉 FILTER BY MOOD (only when no category selected) */

    if (activeMood && selectedCategories.length === 0) {

      const recommendedCategories =
        moodToCategory[activeMood] || [];

      if (recommendedCategories.length > 0) {
        result = result.filter((anime) =>
          recommendedCategories.includes(anime.category)
        );
      }
    }

    setFilteredAnime(result);

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
            Anime Recommendations
          </h1>

          <p className="text-white/60 mt-1">
            Based on your preferences • {filteredAnime.length} anime found
          </p>
        </div>

      </div>

      {/* GRID */}
      <div className="p-6">
        <AnimeGrid animes={filteredAnime} />
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

export default AnimePage;
