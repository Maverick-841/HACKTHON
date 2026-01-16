const WebseriesCard = ({ series }) => {
    return (
        <div className="bg-gray-900 border border-gray-700 rounded-lg p-3">
            <div className="h-32 bg-gray-700 rounded mb-2"></div>

            <h3 className="text-sm font-semibold text-white">
                {series.title}
            </h3>

            <p className="text-xs text-gray-400">
                {series.category}
            </p>
        </div>
    );
};

export default WebseriesCard;
