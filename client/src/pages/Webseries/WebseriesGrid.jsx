import WebseriesCard from "./WebseriesCard";

const WebseriesGrid = ({ series }) => {
    return (
        <div className="grid grid-cols-4 gap-4">
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
