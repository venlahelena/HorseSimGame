import { Link } from "react-router-dom";
import { useHorseList } from "../../hooks/useHorseList";
import PageLayout from "../../components/layout/PageLayout/PageLayout";
import "./StableView.css";
import { Horse } from "../../models/Horse";

const MAX_STABLE_SIZE = 10;

export default function StableView() {
  const { data: horses = [], isLoading, error } = useHorseList();
  console.log("Stable horses:", horses);

  const filledStalls = horses.length;
  const emptyStalls = MAX_STABLE_SIZE - filledStalls;

  if (isLoading) return <p>Loading horses...</p>;
  if (error) return <p>Error loading horses: {error.message}</p>;

  const upperView = (
    <div className="stable-corridor">
      {horses.map((horse: Horse) => (
        <Link
          to={`/horse/${horse._id}`}
          key={horse._id}
          className="stable-stall"
        >
          <div className="stall-sign">
            {horse.name} – Age {horse.age}
          </div>
        </Link>
      ))}
      {Array.from({ length: emptyStalls }).map((_, i) => (
        <div key={`empty-${i}`} className="stable-stall empty">
          <div className="stall-sign">
            <em>Empty Stall</em>
          </div>
        </div>
      ))}
    </div>
  );

  const lowerView = "";

  return <PageLayout upper={upperView} lower={lowerView} />;
}
