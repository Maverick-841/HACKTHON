import MovieCard from "./MovieCard";


const MoviesGrid = ({ movies }) => {
  return (
    <div className="grid grid-cols-4 gap-4 p-4">
      {movies.map(movie => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
};

export default MoviesGrid;