import { useMarketHorses } from "../../hooks/useMarketHorses";
import { useGameStore } from "../../store/useGameStore";
import "./MarketView.css";

const MarketView = () => {
  useMarketHorses();

  const horses = useGameStore(state => state.horses);
  const loading = useGameStore(state => state.loading);
  const error = useGameStore(state => state.error);

  if (loading) return <p>Loading market horses…</p>;
  if (error) return <p className="text-red-400">Error: {error}</p>;

  return (
    <div className="market-grid">
      {horses.map((horse) => (
        <div key={horse.id} className="horse-card">
          <div className="horse-name">{horse.name}</div>
          <div className="horse-meta">
            {horse.breed} · {horse.age} y/o · {horse.gender}
          </div>
          <div className="horse-stats">
            <div>Speed: {horse.stats?.speed ?? "?"}</div>
            <div>Stamina: {horse.stats?.stamina ?? "?"}</div>
            <div>Agility: {horse.stats?.agility ?? "?"}</div>
          </div>
          {horse.price && <div className="horse-price">${horse.price}</div>}
        </div>
      ))}
    </div>
  );
};

export default MarketView;