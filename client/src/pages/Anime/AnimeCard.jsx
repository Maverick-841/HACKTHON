import { useState } from 'react';
import PlatformModal from '../../components/PlatformModal';

const AnimeCard = ({ anime }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div
        className="bg-gray-900 border border-gray-700 rounded-lg p-4 hover:shadow-lg transition cursor-pointer"
        onClick={() => setIsModalOpen(true)}
      >

        {/* IMAGE */}
        {anime.image && (
          <img
            src={anime.image}
            alt={anime.title}
            className="w-full h-48 object-cover rounded-md mb-3"
          />
        )}

        {/* TITLE */}
        <h3 className="text-lg font-semibold text-white mb-1">
          {anime.title}
        </h3>

        {/* DESCRIPTION */}
        <p className="text-sm text-gray-300 mb-2">
          {anime.description}
        </p>

        {/* META TAGS */}

      </div>

      <PlatformModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={anime.title}
        category="Anime"
      />
    </>
  );
};

export default AnimeCard;
