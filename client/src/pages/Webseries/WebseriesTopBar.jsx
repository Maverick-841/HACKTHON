import { Search, Lock, SlidersHorizontal } from "lucide-react";

const WebseriesTopBar = () => {
    return (
        <div className="flex items-center gap-4 mb-6">

            {/* Left icon */}
            <button className="p-2 rounded-full bg-gray-800 hover:bg-gray-700">
                <Lock className="w-5 h-5 text-gray-300" />
            </button>

            {/* Search bar */}
            <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                    type="text"
                    placeholder="Search web series"
                    className="w-full pl-10 pr-4 py-2 rounded-full bg-gray-800 border border-gray-700 text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
            </div>

            {/* Right icon */}
            <button className="p-2 rounded-full bg-gray-800 hover:bg-gray-700">
                <SlidersHorizontal className="w-5 h-5 text-gray-300" />
            </button>
        </div>
    );
};

export default WebseriesTopBar;
