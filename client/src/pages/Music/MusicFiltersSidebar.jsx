const categories = [
  "Message",
  "Romance",
  "Fun",
  "Energy",
  "Peace",
  "Emotion",
  "Spiritual"
];

const MusicFiltersSidebar = ({ selected, onChange }) => {
  return (
    <div className="space-y-3">
      <h2 className="text-white font-semibold mb-3">
        Music Filters
      </h2>

      {categories.map((cat) => (
        <label
          key={cat}
          className="flex items-center gap-2 text-gray-300"
        >
          <input
            type="checkbox"
            checked={selected.includes(cat)}
            onChange={() => onChange(cat)}
            className="accent-white"
          />
          {cat}
        </label>
      ))}
    </div>
  );
};

export default MusicFiltersSidebar;
