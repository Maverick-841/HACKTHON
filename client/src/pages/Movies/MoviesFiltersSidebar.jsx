const categories = [
  "Comedy",
  "Fun",
  "Romance",
  "Message",
  "Motivation",
  "Family",
  "Friendship",
  "Crime",
  "Thriller",
  "Emotional"
];

const MoviesFiltersSidebar = ({ selected, setSelected }) => {
  const handleChange = (category) => {
    if (selected.includes(category)) {
      setSelected(selected.filter(item => item !== category));
    } else {
      setSelected([...selected, category]);
    }
  };

  return (
    <div className="w-64 p-4 border-r bg-gray-900 text-white">
      <h2 className="font-bold mb-4">Filters</h2>
      {categories.map(cat => (
        <label key={cat} className="flex items-center gap-2 mb-2 text-white font-medium">
          <input
            type="checkbox" className="accent-white"
            checked={selected.includes(cat)}
            onChange={() => handleChange(cat)}
          />
          {cat}
        </label>
      ))}
    </div>
  );
};

export default MoviesFiltersSidebar;
