import PodcastsCard from "./PodcastsCard";

const PodcastsGrid = ({ podcasts }) => {
  return (
    <div className="grid grid-cols-4 gap-4">
      {podcasts.map((podcast) => (
        <PodcastsCard
          key={podcast.id}
          podcast={podcast}
        />
      ))}
    </div>
  );
};

export default PodcastsGrid;
