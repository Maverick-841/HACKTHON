import { useState } from "react";
import { bookData } from "./BookData";
import BooksFiltersSidebar from "./BooksFiltersSidebar";
import BooksGrid from "./BooksGrid";

const BooksPage = () => {
  const [selectedCategories, setSelectedCategories] = useState([]);

  const handleFilterChange = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const filteredBooks =
    selectedCategories.length === 0
      ? bookData
      : bookData.filter((b) =>
          selectedCategories.includes(b.category)
        );

  return (
    <div className="flex bg-black min-h-screen p-6 gap-6">
      
      {/* LEFT FILTER SIDEBAR */}
      <div className="w-64 border-r border-gray-700 pr-4">
        <BooksFiltersSidebar
          selected={selectedCategories}
          onChange={handleFilterChange}
        />
      </div>

      {/* RIGHT GRID */}
      <div className="flex-1">
        <BooksGrid books={filteredBooks} />
      </div>
    </div>
  );
};

export default BooksPage;
