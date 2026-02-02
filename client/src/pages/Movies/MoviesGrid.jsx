import MovieCard from "./MovieCard";

const MoviesGrid = ({ movies }) => {
  return (
    <div className="grid md:grid-cols-4 gap-4 p-4">
      {movies.map(movie => (
        <MovieCard key={movie.title} movie={movie} />
      ))}
    </div>
  );
};

export default MoviesGrid;
