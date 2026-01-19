import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { youtubeData } from "./YoutubeData";
import YoutubeFiltersSidebar from "./YoutubeFiltersSidebar";
import YoutubeGrid from "./YoutubeGrid";
import { useShopContext } from "../../context/shopcontext";

const YoutubePage = () => {
  const navigate = useNavigate();
  const { userPreferences } = useShopContext();
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [filteredChannels, setFilteredChannels] = useState([]);

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

  // Apply filters based on user preferences
  useEffect(() => {
    let result = [...youtubeData];

    // 1. Filter by user's selected languages
    if (userPreferences.selectedLanguages && userPreferences.selectedLanguages.length > 0) {
      result = result.filter((channel) => {
        // If channel has no language property, show it
        if (!channel.language) return true;
        // Check if channel language matches any selected language
        return userPreferences.selectedLanguages.some(lang =>
          channel.language.toLowerCase().includes(lang.toLowerCase()) ||
          lang.toLowerCase().includes(channel.language.toLowerCase())
        );
      });
    }

    // 2. Filter by selected categories (genres)
    if (selectedCategories.length > 0) {
      result = result.filter((ch) => selectedCategories.includes(ch.category));
    }

    // 3. Filter by mood
    if (userPreferences.selectedMood) {
      // Map mood to youtube channel categories
      const moodToCategory = {
        "Need Motivation": ["Motivation", "Fitness", "Business"],
        "Feeling Low": ["Comedy", "Entertainment", "ASMR"],
        "Want Focus": ["Educational", "Technology", "Science"],
        "Want Peace": ["Meditation", "Music", "Nature"],
        "Just for Fun": ["Comedy", "Gaming", "Entertainment"]
      };

      const recommendedCategories = moodToCategory[userPreferences.selectedMood] || [];
      if (recommendedCategories.length > 0 && selectedCategories.length === 0) {
        // If no categories selected, suggest based on mood
        result = result.filter((ch) => recommendedCategories.includes(ch.category));
      }
    }

    setFilteredChannels(result);
  }, [selectedCategories, userPreferences]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0B1020] to-[#0F172A] text-white">
      {/* Header with Back Button */}
      <div className="p-6 border-b border-gray-700">
        <h1 className="text-2xl md:text-3xl font-bold">YouTube Channel Recommendations</h1>
        <p className="text-white/60 mt-2">
          Based on your preferences • {filteredChannels.length} channels found
        </p>
      </div>

      <div className="flex flex-col lg:flex-row p-6 gap-6">
        {/* LEFT SIDEBAR */}
        <div className="lg:w-64">
          <YoutubeFiltersSidebar
            selected={selectedCategories}
            onChange={handleFilterChange}
          />
        </div>

        {/* RIGHT GRID */}
        <div className="flex-1">
          <YoutubeGrid channels={filteredChannels} />
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

export default YoutubePage;