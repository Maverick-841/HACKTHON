import { useEffect, useState } from "react";
import BookCard from "./BookCard";
import { useShopContext } from "../../context/shopcontext";
import RecommendationResults from "../../components/RecommendationResults";

const BooksPage = () => {
  const { userPreferences } = useShopContext();

  const activeMood =
    userPreferences.selectedMood || localStorage.getItem("selectedMood");

  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (userPreferences.selectedMood) {
      localStorage.setItem("selectedMood", userPreferences.selectedMood);
    }
  }, [userPreferences.selectedMood]);

  useEffect(() => {
    async function fetchAIBooks() {
      try {
        const res = await fetch("http://localhost:5000/api/mood/recommend", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            mood: activeMood,
            language: userPreferences.selectedLanguages?.[0] || "English",
            category: "Books",
          }),
        });

        const data = await res.json();

        if (!res.ok) {
          console.error(data);
          setBooks([]);
          setLoading(false);
          return;
        }

        setBooks(data.recommendations || []);
        setLoading(false);
      } catch (error) {
        console.log("AI Book Error:", error);
        setLoading(false);
      }
    }

    if (activeMood) {
      fetchAIBooks();
    }
  }, [activeMood, userPreferences.selectedLanguages]);

  return (
    <RecommendationResults
      title="Book Recommendations"
      description="Use the filters to jump between All and language-specific book suggestions."
      categoryLabel="Books"
      items={books}
      loading={loading}
      selectedMood={activeMood}
      selectedLanguages={userPreferences.selectedLanguages || []}
      emptyMessage="No book recommendations matched this selection. Try another mood or language."
      renderCard={(book) => <BookCard key={book.id} book={book} />}
    />
  );
};

export default BooksPage;