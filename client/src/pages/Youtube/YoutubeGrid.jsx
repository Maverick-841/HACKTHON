import YoutubeCard from "./YoutubeCard";

const YoutubeGrid = ({ channels }) => {
  return (
    <div className="grid grid-cols-4 gap-4">
      {channels.map((channel) => (
        <YoutubeCard
          key={channel.id}
          channel={channel}
        />
      ))}
    </div>
  );
};

export default YoutubeGrid;
