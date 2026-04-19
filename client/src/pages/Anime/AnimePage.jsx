import { useEffect, useState } from "react";
import AnimeCard from "./AnimeCard";
import { useShopContext } from "../../context/shopcontext";
import RecommendationResults from "../../components/RecommendationResults";

const AnimePage = () => {
  const { userPreferences, backendUrl } = useShopContext();

  const activeMood =
    userPreferences.selectedMood || localStorage.getItem("selectedMood");

  const [animes, setAnimes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (userPreferences.selectedMood) {
      localStorage.setItem("selectedMood", userPreferences.selectedMood);
    }
  }, [userPreferences.selectedMood]);

  useEffect(() => {
    async function fetchAIAnime() {
      try {
        const res = await fetch(`${backendUrl}/mood/recommend`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            mood: activeMood,
            language: userPreferences.selectedLanguages?.[0] || "English",
            category: "Anime",
          }),
        });

        const data = await res.json();

        if (!res.ok) {
          console.error(data);
          setAnimes([]);
          setLoading(false);
          return;
        }

        setAnimes(data.recommendations || []);
        setLoading(false);
      } catch (error) {
        console.log("AI Anime Error:", error);
        setLoading(false);
      }
    }

    if (activeMood) {
      fetchAIAnime();
    }
  }, [activeMood, userPreferences.selectedLanguages]);

  return (
    <RecommendationResults
      title="Anime Recommendations"
      description="Switch between All and language filters to scan your anime recommendations with more clarity."
      categoryLabel="Anime"
      items={animes}
      loading={loading}
      selectedMood={activeMood}
      selectedLanguages={userPreferences.selectedLanguages || []}
      emptyMessage="No anime recommendations matched this selection. Try another mood or language."
      renderCard={(anime) => <AnimeCard key={anime.id} anime={anime} />}
    />
  );
};

export default AnimePage;