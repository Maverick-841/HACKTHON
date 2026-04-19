import { useEffect, useState } from "react";
import MusicCard from "./MusicCard";
import { useShopContext } from "../../context/shopcontext";
import RecommendationResults from "../../components/RecommendationResults";

const MusicPage = () => {
  const { userPreferences, backendUrl } = useShopContext();

  const activeMood =
    userPreferences.selectedMood || localStorage.getItem("selectedMood");

  const [musicList, setMusicList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (userPreferences.selectedMood) {
      localStorage.setItem("selectedMood", userPreferences.selectedMood);
    }
  }, [userPreferences.selectedMood]);

  useEffect(() => {
    async function fetchAIMusic() {
      try {
        const res = await fetch(`${backendUrl}/mood/recommend`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            mood: activeMood,
            language: userPreferences.selectedLanguages?.[0] || "English",
            category: "Music",
          }),
        });

        const data = await res.json();

        if (!res.ok) {
          console.error(data);
          setMusicList([]);
          setLoading(false);
          return;
        }

        setMusicList(data.recommendations || []);
        setLoading(false);
      } catch (error) {
        console.log("AI Music Error:", error);
        setLoading(false);
      }
    }

    if (activeMood) {
      fetchAIMusic();
    }
  }, [activeMood, userPreferences.selectedLanguages]);

  return (
    <RecommendationResults
      title="Music Recommendations"
      description="See every track at a glance, then switch between All and language-specific views for more clarity."
      categoryLabel="Music"
      items={musicList}
      loading={loading}
      selectedMood={activeMood}
      selectedLanguages={userPreferences.selectedLanguages || []}
      emptyMessage="No music recommendations matched this selection. Try another mood or language."
      renderCard={(music) => <MusicCard key={music.id} music={music} />}
    />
  );
};

export default MusicPage;