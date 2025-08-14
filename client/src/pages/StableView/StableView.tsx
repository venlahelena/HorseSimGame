import { Link } from "react-router-dom";
import { useGameStore } from "../../store/useGameStore";
import PageLayout from "../../components/layout/PageLayout/PageLayout";
import "./StableView.css";

const MAX_STABLE_SIZE = 10;

export default function StableView() {
  const horses = useGameStore(state => state.horses);

  const filledStalls = horses.length;
  const emptyStalls = MAX_STABLE_SIZE - filledStalls;

  const upperView = (
    <div className="stable-corridor">
      {horses.map((horse) => (
        <Link to={`/horse/${horse.id}`} key={horse.id} className="stable-stall">
          <div className="stall-sign">{horse.name} – Age {horse.age}</div>
        </Link>
      ))}
      {Array.from({ length: emptyStalls }).map((_, i) => (
        <div key={`empty-${i}`} className="stable-stall empty">
          <div className="stall-sign"><em>Empty Stall</em></div>
        </div>
      ))}
    </div>
  );

  const lowerView = "";

  return <PageLayout upper={upperView} lower={lowerView} />;
}