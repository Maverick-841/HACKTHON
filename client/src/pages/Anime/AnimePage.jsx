import { useState } from "react";
import { animeData } from "./AnimeData";
import AnimeFiltersSidebar from "./AnimeFiltersSidebar";
import AnimeGrid from "./AnimeGrid";

const AnimePage = () => {
    const [selectedCategories, setSelectedCategories] = useState([]);

    const handleFilterChange = (category) => {
        setSelectedCategories((prev) =>
            prev.includes(category)
                ? prev.filter((c) => c !== category)
                : [...prev, category]
        );
    };

    const filteredAnime =
        selectedCategories.length === 0
            ? animeData
            : animeData.filter((a) =>
                selectedCategories.includes(a.category)
            );

    return (
        <div className="flex bg-black min-h-screen p-6 gap-6">

            {/* LEFT SIDEBAR */}
            <div className="w-64 border-r border-gray-700 pr-4">
                <AnimeFiltersSidebar
                    selected={selectedCategories}
                    onChange={handleFilterChange}
                />
            </div>

            {/* RIGHT GRID */}
            <div className="flex-1">
                <AnimeGrid animes={filteredAnime} />
            </div>

        </div>
    );
};

export default AnimePage;
