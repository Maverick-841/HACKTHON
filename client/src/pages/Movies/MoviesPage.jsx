import { useState } from "react";
import FiltersSidebar from "./FiltersSidebar";
import MoviesGrid from "./MoviesGrid";
import moviesData from "./moviesData";


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
      <FiltersSidebar
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
