const MovieCard = ({ movie }) => {
  return (
    <div className="border rounded-lg p-3 shadow bg-gray-900 hover:shadow-lg transition">
      <div className="h-32 bg-gray-700 rounded mb-2"></div>
      <h3 className="text-sm font-semibold text-white">{movie.title}</h3>
      <p className="text-xs text-gray-400">{movie.category}</p>
    </div>
  );
};    

export default MovieCard;
