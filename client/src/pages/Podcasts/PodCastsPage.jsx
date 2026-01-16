import { useState } from "react";
import { podcastsData } from "./PodCastsData";
import PodcastsFiltersSidebar from "./PodcastsFiltersSidebar";
import PodcastsGrid from "./PodcastsGrid";

const PodCastsPage = () => {
  const [selectedCategories, setSelectedCategories] = useState([]);

  const handleFilterChange = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const filteredPodcasts =
    selectedCategories.length === 0
      ? podcastsData
      : podcastsData.filter((p) =>
          selectedCategories.includes(p.category)
        );

  return (
    <div className="flex bg-black min-h-screen p-6 gap-6">
      
      {/* LEFT SIDEBAR */}
      <div className="w-64 border-r border-gray-700 pr-4">
        <PodcastsFiltersSidebar
          selected={selectedCategories}
          onChange={handleFilterChange}
        />
      </div>

      {/* RIGHT GRID */}
      <div className="flex-1">
        <PodcastsGrid podcasts={filteredPodcasts} />
      </div>
    </div>
  );
};

export default PodCastsPage;
