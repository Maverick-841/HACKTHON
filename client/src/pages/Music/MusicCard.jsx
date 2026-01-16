const MusicCard = ({ music }) => {
  return (
    <div className="bg-gray-900 border border-gray-700 rounded-lg p-3">
      <div className="h-24 bg-gray-700 rounded mb-2"></div>

      <h3 className="text-sm font-semibold text-white">
        {music.title}
      </h3>

      <p className="text-xs text-gray-400">
        {music.category}
      </p>
    </div>
  );
};

export default MusicCard;
