import { useParams, useNavigate } from "react-router-dom";
import { useGameStore } from "../store/useGameStore";

export default function HorseDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const horses = useGameStore(state => state.horses);

  const horse = horses.find(horseItem => horseItem.id === id);

  if (!horse) return <p>Horse not found.</p>;

  return (
    <div className="horse-detail">
      <button onClick={() => navigate("/")} style={{ marginBottom: "1rem" }}>
        ← Back to Stable
      </button>
      <h2>{horse.name}</h2>
      <p>Breed: {horse.breed}</p>
      <p>Age: {horse.age}</p>
      <p>Gender: {horse.gender}</p>
      <p>
        Stats: Speed {horse.stats?.speed}, Stamina {horse.stats?.stamina}, Agility{" "}
        {horse.stats?.agility}
      </p>
      <p>
        Traits: Coat {horse.traits?.coatColor}, Markings {horse.traits?.markings}
      </p>
    </div>
  );
}