import { useState } from "react";
import { youtubeData } from "./YoutubeData";
import YoutubeFiltersSidebar from "./YoutubeFiltersSidebar";
import YoutubeGrid from "./YoutubeGrid";

const YoutubePage = () => {
  const [selectedCategories, setSelectedCategories] = useState([]);

  const handleFilterChange = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const filteredChannels =
    selectedCategories.length === 0
      ? youtubeData
      : youtubeData.filter((ch) =>
          selectedCategories.includes(ch.category)
        );

  return (
    <div className="flex bg-black min-h-screen p-6 gap-6">

      {/* LEFT SIDEBAR */}
      <div className="w-64 border-r border-gray-700 pr-4">
        <YoutubeFiltersSidebar
          selected={selectedCategories}
          onChange={handleFilterChange}
        />
      </div>

      {/* RIGHT GRID */}
      <div className="flex-1">
        <YoutubeGrid channels={filteredChannels} />
      </div>

    </div>
  );
};

export default YoutubePage;
