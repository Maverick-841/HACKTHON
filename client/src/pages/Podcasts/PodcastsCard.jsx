import { useState } from 'react';
import PlatformModal from '../../components/PlatformModal';

const PodcastsCard = ({ podcast }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div
        className="bg-gray-900 border border-gray-700 rounded-lg p-4 hover:shadow-lg transition cursor-pointer"
        onClick={() => setIsModalOpen(true)}
      >

        {/* IMAGE */}
        <img
          src={podcast.image || podcast.imageUrl || "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?q=80&w=1470&auto=format&fit=crop"} // Podcast Fallback
          alt={podcast.title}
          className="w-full h-48 object-cover rounded-md mb-3"
        />

        {/* TITLE */}
        <h3 className="text-lg font-semibold text-white mb-1">
          {podcast.title}
        </h3>

        {/* DESCRIPTION */}
        <p className="text-sm text-gray-300 mb-2">
          {podcast.description}
        </p>

        {/* META TAGS */}

      </div>

      <PlatformModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={podcast.title}
        category="Podcast"
      />
    </>
  );
};

export default PodcastsCard;
