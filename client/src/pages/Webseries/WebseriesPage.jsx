import { useEffect, useState } from "react";
import WebseriesCard from "./WebseriesCard";
import { useShopContext } from "../../context/shopcontext";
import RecommendationResults from "../../components/RecommendationResults";

const WebseriesPage = () => {
  const { userPreferences, backendUrl } = useShopContext();

  const activeMood =
    userPreferences.selectedMood || localStorage.getItem("selectedMood");

  const [series, setSeries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (userPreferences.selectedMood) {
      localStorage.setItem("selectedMood", userPreferences.selectedMood);
    }
  }, [userPreferences.selectedMood]);

  useEffect(() => {
    async function fetchAIWebseries() {
      try {
        const res = await fetch(`${backendUrl}/mood/recommend`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            mood: activeMood,
            language: userPreferences.selectedLanguages?.[0] || "English",
            category: "Web Series",
          }),
        });

        const data = await res.json();

        if (!res.ok) {
          console.error(data);
          setSeries([]);
          setLoading(false);
          return;
        }

        setSeries(data.recommendations || []);
        setLoading(false);
      } catch (error) {
        console.log("AI Webseries Error:", error);
        setLoading(false);
      }
    }

    if (activeMood) {
      fetchAIWebseries();
    }
  }, [activeMood, userPreferences.selectedLanguages]);

  return (
    <RecommendationResults
      title="Web Series Recommendations"
      description="Clear web series suggestions with an All tab plus language-specific filters."
      categoryLabel="Web Series"
      items={series}
      loading={loading}
      selectedMood={activeMood}
      selectedLanguages={userPreferences.selectedLanguages || []}
      emptyMessage="No web series recommendations matched this selection. Try another mood or language."
      renderCard={(item) => <WebseriesCard key={item.id} series={item} />}
    />
  );
};

export default WebseriesPage;