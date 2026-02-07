import { useState } from 'react';
import PlatformModal from '../../components/PlatformModal';

const DocumentaryCard = ({ doc }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div
        className="bg-gray-900 border border-gray-700 rounded-lg p-4 hover:shadow-lg transition cursor-pointer"
        onClick={() => setIsModalOpen(true)}
      >

        {/* IMAGE */}
        <img
          src={doc.image || doc.imageUrl || "https://images.unsplash.com/photo-1578022761797-b8636ac1773c?q=80&w=1470&auto=format&fit=crop"} // Fallback image
          alt={doc.title}
          className="w-full h-48 object-cover rounded-md mb-3"
        />

        {/* TITLE */}
        <h3 className="text-lg font-semibold text-white mb-1">
          {doc.title}
        </h3>

        {/* DESCRIPTION */}
        <p className="text-sm text-gray-300 mb-2">
          {doc.description}
        </p>

        {/* META TAGS */}

      </div>

      <PlatformModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={doc.title}
        category="Documentary"
      />
    </>
  );
};

export default DocumentaryCard;
