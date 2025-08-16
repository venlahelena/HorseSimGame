import { useParams, useNavigate } from "react-router-dom";
import { useHorse } from "../hooks/useHorse";

export default function HorseDetail() {
  const { id } = useParams();
  const { data: horse, isLoading, error } = useHorse(id);
  const navigate = useNavigate();

  if (!id) return <div>No horse selected.</div>; 

  if (isLoading) return <div>Loading horse...</div>;
  if (error) return <div>Error: {String(error)}</div>;
  if (!horse) return <div>Horse not found.</div>;

  return (
    <div className="horse-detail">
      <button onClick={() => navigate("/stables")} style={{ marginBottom: "1rem" }}>
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