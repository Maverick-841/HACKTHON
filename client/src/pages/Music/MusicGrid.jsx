import MusicCard from "./MusicCard";

const MusicGrid = ({ musicList }) => {
  return (
    <div className="grid md:grid-cols-4 gap-4 p-4">
      {musicList.map((music) => (
        <MusicCard key={music.id} music={music} />
      ))}
    </div>
  );
};

export default MusicGrid;
