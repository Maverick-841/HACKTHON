import { useState } from "react";
import { musicData } from "./MusicData";
import MusicFiltersSidebar from "./MusicFiltersSidebar";
import MusicGrid from "./MusicGrid";

const MusicPage = () => {
  const [selectedCategories, setSelectedCategories] = useState([]);

  const handleFilterChange = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const filteredMusic =
    selectedCategories.length === 0
      ? musicData
      : musicData.filter((m) =>
          selectedCategories.includes(m.category)
        );

  return (
    <div className="flex bg-black min-h-screen p-6 gap-6">
      
      {/* LEFT SIDEBAR */}
      <div className="w-64 border-r border-gray-700 pr-4">
        <MusicFiltersSidebar
          selected={selectedCategories}
          onChange={handleFilterChange}
        />
      </div>

      {/* RIGHT GRID */}
      <div className="flex-1">
        <MusicGrid musicList={filteredMusic} />
      </div>
    </div>
  );
};

export default MusicPage;
