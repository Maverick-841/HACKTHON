import { useEffect, useState } from "react";
import MovieCard from "./MovieCard";
import { useShopContext } from "../../context/shopcontext";
import RecommendationResults from "../../components/RecommendationResults";

const MoviesPage = () => {
  const { userPreferences, backendUrl } = useShopContext();

  const activeMood =
    userPreferences.selectedMood || localStorage.getItem("selectedMood");

  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (userPreferences.selectedMood) {
      localStorage.setItem("selectedMood", userPreferences.selectedMood);
    }
  }, [userPreferences.selectedMood]);

  useEffect(() => {
    async function fetchAIMovies() {
      try {
        const res = await fetch(`${backendUrl}/mood/recommend`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            mood: activeMood,
            language: userPreferences.selectedLanguages?.[0] || "English",
            category: "Movies",
          }),
        });

        const data = await res.json();

        if (!res.ok) {
          console.error(data);
          setMovies([]);
          setLoading(false);
          return;
        }

        setMovies(data.recommendations || []);
        setLoading(false);
      } catch (error) {
        console.log("AI Movie Error:", error);
        setLoading(false);
      }
    }

    if (activeMood) {
      fetchAIMovies();
    }
  }, [activeMood, userPreferences.selectedLanguages]);

  return (
    <RecommendationResults
      title="AI Movie Recommendations"
      description="Clear movie suggestions matched to your mood and language. Use All to see everything, or narrow the list by language."
      categoryLabel="Movies"
      items={movies}
      loading={loading}
      selectedMood={activeMood}
      selectedLanguages={userPreferences.selectedLanguages || []}
      emptyMessage="Try changing the mood or category if this looks too narrow."
      renderCard={(movie) => <MovieCard key={movie.id} movie={movie} />}
    />
  );
};

export default MoviesPage;