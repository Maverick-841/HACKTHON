import BookCard from "./BookCard";

const BooksGrid = ({ books }) => {
  return (
    <div className="grid md:grid-cols-4 gap-4 p-4">
      {books.map((book) => (
        <BookCard
          key={book.id}
          book={book}
        />
      ))}
    </div>
  );
};

export default BooksGrid;
