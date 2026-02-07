import { useState } from 'react';
import PlatformModal from '../../components/PlatformModal';

const MovieCard = ({ movie }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div
        className="border rounded-lg p-4 shadow bg-gray-900 hover:shadow-lg transition cursor-pointer"
        onClick={() => setIsModalOpen(true)}
      >
        <img
          src={movie.image || movie.imageUrl}
          alt={movie.title}
          className="w-full h-48 object-cover rounded-md mb-3"
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

      <PlatformModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={movie.title}
        category="Movie"
      />
    </>
  );
};

export default MovieCard;
