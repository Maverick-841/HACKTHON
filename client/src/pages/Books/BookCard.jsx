const BookCard = ({ book }) => {
  return (
    <div className="bg-gray-900 border border-gray-700 rounded-lg p-3">
      <div className="h-32 bg-gray-700 rounded mb-2"></div>

      <h3 className="text-sm font-semibold text-white">
        {book.title}
      </h3>

      <p className="text-xs text-gray-400">
        {book.category}
      </p>
    </div>
  );
};

export default BookCard;
