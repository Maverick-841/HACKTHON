import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import PodcastsGrid from "./PodcastsGrid";
import { useShopContext } from "../../context/shopcontext";

const PodCastsPage = () => {

  const navigate = useNavigate();
  const { userPreferences } = useShopContext();

  /* -----------------------------------
      LOAD SAVED MOOD
  ----------------------------------- */

  const activeMood =
    userPreferences.selectedMood ||
    localStorage.getItem("selectedMood");

  const [podcasts, setPodcasts] = useState([]);
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
      FETCH AI PODCASTS
  ----------------------------------- */

  useEffect(() => {
    async function fetchAIPodcasts() {
      try {
        const res = await fetch(
          "http://localhost:5000/api/mood/recommend",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              mood: activeMood,
              language: userPreferences.selectedLanguages?.[0] || "English",
              category: "Podcasts"
            })
          }
        );

        const data = await res.json();

        if (!res.ok) {
          console.error(data);
          setPodcasts([]);
          setLoading(false);
          return;
        }

        setPodcasts(data.recommendations || []);
        setLoading(false);

      } catch (error) {
        console.log("AI Podcast Error:", error);
        setLoading(false);
      }
    }

    if (activeMood) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLoading(true);
      fetchAIPodcasts();
    }
  }, [activeMood, userPreferences.selectedLanguages]);

  /* -----------------------------------
      LOADING UI
  ----------------------------------- */

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Loading AI Podcast Recommendations...
      </div>
    );
  }

  /* -----------------------------------
      UI
  ----------------------------------- */

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0B1020] to-[#0F172A] text-white">

      {/* HEADER */}
      <div className="p-6 border-b border-gray-700 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">

        <div>


          <h1 className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
            Podcast Recommendations
          </h1>

          <p className="text-white/60 mt-1">
            Based on your preferences • {podcasts.length} podcasts found
          </p>
        </div>

        <div className="flex flex-col items-end gap-2">

          <div className="text-xs text-gray-500">
            {podcasts.length} Recommendations Found
          </div>
        </div>

      </div>

      {/* GRID */}
      <div className="p-6">
        <PodcastsGrid podcasts={podcasts} />
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
