import { useEffect, useState } from "react";
import DocumentaryCard from "./DocumentaryCard";
import { useShopContext } from "../../context/shopcontext";
import RecommendationResults from "../../components/RecommendationResults";

const DocumentaryPage = () => {
  const { userPreferences } = useShopContext();

  const activeMood =
    userPreferences.selectedMood || localStorage.getItem("selectedMood");

  const [documentaries, setDocumentaries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (userPreferences.selectedMood) {
      localStorage.setItem("selectedMood", userPreferences.selectedMood);
    }
  }, [userPreferences.selectedMood]);

  useEffect(() => {
    async function fetchAIDocumentaries() {
      try {
        const res = await fetch("http://localhost:5000/api/mood/recommend", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            mood: activeMood,
            language: userPreferences.selectedLanguages?.[0] || "English",
            category: "Documentaries",
          }),
        });

        const data = await res.json();

        if (!res.ok) {
          console.error(data);
          setDocumentaries([]);
          setLoading(false);
          return;
        }

        setDocumentaries(data.recommendations || []);
        setLoading(false);
      } catch (error) {
        console.log("AI Documentary Error:", error);
        setLoading(false);
      }
    }

    if (activeMood) {
      fetchAIDocumentaries();
    }
  }, [activeMood, userPreferences.selectedLanguages]);

  return (
    <RecommendationResults
      title="Documentary Recommendations"
      description="Browse every documentary result at once, then narrow down by language if you want more focus."
      categoryLabel="Documentaries"
      items={documentaries}
      loading={loading}
      selectedMood={activeMood}
      selectedLanguages={userPreferences.selectedLanguages || []}
      emptyMessage="No documentary recommendations matched this selection. Try another mood or language."
      renderCard={(doc) => <DocumentaryCard key={doc.id} doc={doc} />}
    />
  );
};

export default DocumentaryPage;