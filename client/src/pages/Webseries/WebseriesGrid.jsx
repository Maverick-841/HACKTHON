import WebseriesCard from "./WebseriesCard";

const WebseriesGrid = ({ series }) => {
  return (
    <div className="grid md:grid-cols-4 gap-4 p-4">
      {series.map((item) => (
        <WebseriesCard
          key={item.id}
          series={item}
        />
      ))}
    </div>
  );
};

export default WebseriesGrid;
