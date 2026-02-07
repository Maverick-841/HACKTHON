import { useState } from 'react';
import PlatformModal from '../../components/PlatformModal';

const BookCard = ({ book }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div
        className="bg-gray-900 border border-gray-700 rounded-lg p-4 hover:shadow-lg transition cursor-pointer"
        onClick={() => setIsModalOpen(true)}
      >

        {/* IMAGE */}
        {book.image && (
          <img
            src={book.image}
            alt={book.title}
            className="w-full h-48 object-cover rounded-md mb-3"
          />
        )}

        {/* TITLE */}
        <h3 className="text-lg font-semibold text-white mb-1">
          {book.title}
        </h3>

        {/* DESCRIPTION */}
        <p className="text-sm text-gray-300 mb-2">
          {book.description}
        </p>

        {/* META TAGS */}

      </div>

      <PlatformModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={book.title}
        category="Book"
      />
    </>
  );
};

export default BookCard;
