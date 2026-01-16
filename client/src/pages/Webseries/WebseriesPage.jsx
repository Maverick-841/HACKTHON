import { useState } from "react";
import { webseriesData } from "./WebseriesData";
import WebseriesFiltersSidebar from "./WebseriesFiltersSidebar";
import WebseriesGrid from "./WebseriesGrid";
import WebseriesTopBar from "./WebseriesTopBar";

const WebseriesPage = () => {
    const [selectedCategories, setSelectedCategories] = useState([]);

    const handleFilterChange = (category) => {
        setSelectedCategories((prev) =>
            prev.includes(category)
                ? prev.filter((c) => c !== category)
                : [...prev, category]
        );
    };

    const filteredSeries =
        selectedCategories.length === 0
            ? webseriesData
            : webseriesData.filter((s) =>
                selectedCategories.includes(s.category)
            );

    return (
        <div className="flex bg-black min-h-screen p-6 gap-6">

            {/* LEFT SIDEBAR */}
            <div className="w-64 border-r border-gray-700 pr-4">
                <WebseriesFiltersSidebar
                    selected={selectedCategories}
                    onChange={handleFilterChange}
                />
            </div>
            <div className="flex-1">

                {/* TOP SEARCH BAR */}
                <WebseriesTopBar />

                {/* GRID BELOW */}
                <WebseriesGrid series={filteredSeries} />

            </div>

        </div>
    );
};

export default WebseriesPage;
