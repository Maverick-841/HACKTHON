import { useState } from 'react';
import PlatformModal from './PlatformModal';

const UnifiedRecommendationCard = ({ item }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div
        className="bg-gray-900 border border-gray-700 rounded-lg p-4 hover:shadow-lg transition cursor-pointer"
        onClick={() => setIsModalOpen(true)}
      >
        {item.image && (
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-48 object-cover rounded-md mb-3"
          />
        )}

        <div className="mb-2">
          <span className="inline-block px-2 py-1 rounded-full text-xs bg-blue-500/20 border border-blue-400/40 text-blue-100">
            {item.category}
          </span>
          {item.language && (
            <span className="inline-block ml-2 px-2 py-1 rounded-full text-xs bg-purple-500/20 border border-purple-400/40 text-purple-100">
              {item.language}
            </span>
          )}
        </div>

        <h3 className="text-lg font-semibold text-white mb-1">{item.title}</h3>
        <p className="text-sm text-gray-300">{item.description}</p>
      </div>

      <PlatformModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={item.title}
        category={item.category}
      />
    </>
  );
};

export default UnifiedRecommendationCard;