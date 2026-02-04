const WebseriesCard = ({ series }) => {

  return (
    <div className="bg-gray-900 border border-gray-700 rounded-lg p-4 hover:shadow-lg transition">

      {/* TITLE */}
      <h3 className="text-lg font-semibold text-white mb-1">
        {series.title}
      </h3>

      {/* DESCRIPTION */}
      <p className="text-sm text-gray-300 mb-2">
        {series.description}
      </p>

      {/* META TAGS */}

    </div>
  );
};

export default WebseriesCard;
