const MovieCard = ({ movie }) => {

  return (
    <div className="border rounded-lg p-4 shadow bg-gray-900 hover:shadow-lg transition">
      <img
        src={movie.imageUrl}
        alt={movie.title}
        className="w-full h-40 object-cover rounded mb-2"
      />

      {/* TITLE */}
      <h3 className="text-lg font-semibold text-white mb-1">
        {movie.title}
      </h3>

      {/* DESCRIPTION */}
      <p className="text-sm text-gray-300 mb-2">
        {movie.description}
      </p>

      {/* META INFO */}

    </div>
  );
};

export default MovieCard;
