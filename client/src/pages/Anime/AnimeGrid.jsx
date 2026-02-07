import AnimeCard from "./AnimeCard";

const AnimeGrid = ({ animes }) => {
  return (
    <div className="grid md:grid-cols-4 gap-4 p-4">
      {animes.map((anime) => (
        <AnimeCard
          key={anime.id}
          anime={anime}
        />
      ))}
    </div>
  );
};

export default AnimeGrid;
