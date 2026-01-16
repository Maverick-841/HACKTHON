import { useState } from "react";
import MoviesGrid from "./MoviesGrid";
import moviesData from "./moviesData";
import MoviesFiltersSidebar from "./MoviesFiltersSidebar";


const MoviesPage = () => {
  const [selectedCategories, setSelectedCategories] = useState([]);

  const filteredMovies =
    selectedCategories.length === 0
      ? moviesData
      : moviesData.filter(movie =>
          selectedCategories.includes(movie.category)
        );

  return (
    <div className="flex">
      {/* Left Sidebar */}
      <MoviesFiltersSidebar
        selected={selectedCategories}
        setSelected={setSelectedCategories}
      />

      {/* Right Content */}
      <div className="flex-1">
        <MoviesGrid movies={filteredMovies} />
      </div>
    </div>
  );
};

export default MoviesPage;
