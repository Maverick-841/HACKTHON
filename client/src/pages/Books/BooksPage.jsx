import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { bookData } from "./BookData";
import BooksFiltersSidebar from "./BooksFiltersSidebar";
import BooksGrid from "./BooksGrid";
import { useShopContext } from "../../context/shopcontext";

const BooksPage = () => {
  const navigate = useNavigate();
  const { userPreferences } = useShopContext();
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);

  const handleFilterChange = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  // Go back to genres selection
  const handleBackToGenres = () => {
    navigate('/genres');
  };

  // Apply filters based on user preferences AND category selections
  useEffect(() => {
    let result = [...bookData];

    // 1. Filter by user's selected languages
    if (userPreferences.selectedLanguages && userPreferences.selectedLanguages.length > 0) {
      // Filter books by language if language property exists
      result = result.filter((book) => {
        // If book has no language property, show it
        if (!book.language) return true;
        // Check if book language matches any selected language
        return userPreferences.selectedLanguages.some(lang =>
          book.language.toLowerCase().includes(lang.toLowerCase()) ||
          lang.toLowerCase().includes(book.language.toLowerCase())
        );
      });
    }

    // 2. Filter by selected categories (genres)
    if (selectedCategories.length > 0) {
      result = result.filter((b) => selectedCategories.includes(b.category));
    }

    // 3. Filter by mood
    if (userPreferences.selectedMood) {
      // Map mood to book categories
      const moodToCategory = {
        "Need Motivation": ["Self-Help", "Biography", "Inspirational"],
        "Feeling Low": ["Fiction", "Romance", "Poetry"],
        "Want Focus": ["Non-Fiction", "Educational", "Science"],
        "Want Peace": ["Spirituality", "Meditation", "Nature"],
        "Just for Fun": ["Fiction", "Comedy", "Mystery"]
      };

      const recommendedCategories = moodToCategory[userPreferences.selectedMood] || [];
      if (recommendedCategories.length > 0 && selectedCategories.length === 0) {
        // If no categories selected, suggest based on mood
        result = result.filter((b) => recommendedCategories.includes(b.category));
      }
    }

    setFilteredBooks(result);
  }, [selectedCategories, userPreferences]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0B1020] to-[#0F172A] text-white">
      {/* Header with Back Button */}
      <div className="p-6 border-b border-gray-700">
        <h1 className="text-2xl md:text-3xl font-bold">Book Recommendations</h1>
        <p className="text-white/60 mt-2">
          Based on your preferences • {filteredBooks.length} books found
        </p>
      </div>

      <div className="flex flex-col lg:flex-row p-6 gap-6">
        {/* LEFT FILTER SIDEBAR */}
        <div className="lg:w-64">
          <BooksFiltersSidebar
            selected={selectedCategories}
            onChange={handleFilterChange}
          />
        </div>

        {/* RIGHT GRID */}
        <div className="flex-1">
          <BooksGrid books={filteredBooks} />
        </div>
      </div>

      {/* Mobile Preferences Display */}
      <div className="p-6 border-t border-gray-700 md:hidden">
        <div className="flex flex-wrap gap-2">
          {userPreferences.selectedMood && (
            <span className="px-3 py-1 rounded-full bg-pink-500/20 border border-pink-400 text-sm">
              Mood: {userPreferences.selectedMood}
            </span>
          )}
          {userPreferences.selectedLanguages && userPreferences.selectedLanguages.map((lang, index) => (
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