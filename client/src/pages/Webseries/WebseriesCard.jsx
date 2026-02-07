import { useState } from 'react';
import PlatformModal from '../../components/PlatformModal';

const WebseriesCard = ({ series }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div
        className="bg-gray-900 border border-gray-700 rounded-lg p-4 hover:shadow-lg transition cursor-pointer"
        onClick={() => setIsModalOpen(true)}
      >

        {/* IMAGE */}
        {series.image && (
          <img
            src={series.image}
            alt={series.title}
            className="w-full h-48 object-cover rounded-md mb-3"
          />
        )}

        {/* TITLE */}
        <h3 className="text-lg font-semibold text-white mb-1">
          {series.title}
        </h3>

        {/* DESCRIPTION */}
        <p className="text-sm text-gray-300 mb-2">
          {series.description}
        </p>

        {/* META TAGS */}

      </div>

      <PlatformModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={series.title}
        category="Web Series"
      />
    </>
  );
};

export default WebseriesCard;
