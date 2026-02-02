const MovieCard = ({ movie }) => {

  return (
    <div className="border rounded-lg p-4 shadow bg-gray-900 hover:shadow-lg transition">

      {/* TITLE */}
      <h3 className="text-lg font-semibold text-white mb-1">
        {movie.title}
      </h3>

      {/* DESCRIPTION */}
      <p className="text-sm text-gray-300 mb-2">
        {movie.description}
      </p>

      {/* META INFO */}
      <div className="flex flex-wrap gap-2 text-xs">

        <span className="px-2 py-1 rounded bg-pink-500/20 text-pink-300">
          {movie.language}
        </span>

        <span className="px-2 py-1 rounded bg-purple-500/20 text-purple-300">
          {movie.mood}
        </span>

        <span className="px-2 py-1 rounded bg-blue-500/20 text-blue-300">
          {movie.category}
        </span>

      </div>

    </div>
  );
};

export default MovieCard;
