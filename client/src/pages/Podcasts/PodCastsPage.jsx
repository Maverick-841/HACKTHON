import { useEffect, useState } from "react";
import PodcastsCard from "./PodcastsCard";
import { useShopContext } from "../../context/shopcontext";
import RecommendationResults from "../../components/RecommendationResults";

const PodCastsPage = () => {
  const { userPreferences } = useShopContext();

  const activeMood =
    userPreferences.selectedMood || localStorage.getItem("selectedMood");

  const [podcasts, setPodcasts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (userPreferences.selectedMood) {
      localStorage.setItem("selectedMood", userPreferences.selectedMood);
    }
  }, [userPreferences.selectedMood]);

  useEffect(() => {
    async function fetchAIPodcasts() {
      try {
        const res = await fetch("http://localhost:5000/api/mood/recommend", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            mood: activeMood,
            language: userPreferences.selectedLanguages?.[0] || "English",
            category: "Podcasts",
          }),
        });

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
      fetchAIPodcasts();
    }
  }, [activeMood, userPreferences.selectedLanguages]);

  return (
    <RecommendationResults
      title="Podcast Recommendations"
      description="Use the All tab to scan every podcast or switch to a language-specific view for clarity."
      categoryLabel="Podcasts"
      items={podcasts}
      loading={loading}
      selectedMood={activeMood}
      selectedLanguages={userPreferences.selectedLanguages || []}
      emptyMessage="No podcast recommendations matched this selection. Try another mood or language."
      renderCard={(podcast) => <PodcastsCard key={podcast.id} podcast={podcast} />}
    />
  );
};

export default PodCastsPage;