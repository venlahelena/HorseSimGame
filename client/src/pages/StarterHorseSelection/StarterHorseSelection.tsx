import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGameStore } from "../../store/useGameStore";
import { useSelectStarterHorse } from "../../hooks/mutations/useSelectStarterHorse";
import { useStarterHorses } from "../../hooks/useStarterHorses";
import { Horse } from "../../models/Horse";

export default function StarterHorseSelection() {
  const [selectedHorse, setSelectedHorse] = useState<string | null>(null);
  const { horses, isLoading, error } = useStarterHorses();
  const addHorse = useGameStore(state => state.addHorse);
  const setUser = useGameStore(state => state.setUser);
  const userId = useGameStore(state => state.user?.id);
  const navigate = useNavigate();

  const mutation = useSelectStarterHorse((data) => {
    addHorse(data.horse);
    setUser(data.user);
    navigate("/stables");
  });

  if (!userId) {
    return <div>Please log in to select a starter horse.</div>;
  }

  if (isLoading) return <p>Loading starter horses...</p>;
  if (error) return <p>Error loading starter horses: {String(error)}</p>;
  if (!horses || horses.length === 0) return <p>No starter horses available.</p>;

  return (
    <div className="starter-horse-selection">
      <h2>Select Your Starter Horse</h2>
      <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap" }}>
        {horses.map((horse: Horse) => {
          if (!horse.id) return null;
          const isSelected = selectedHorse === horse.id;
          return (
            <div
              key={horse.id}
              style={{
                border: isSelected ? "2px solid #007bff" : "1px solid #ccc",
                borderRadius: "1rem",
                padding: "1rem",
                background: isSelected ? "#e6f0ff" : "#fff",
                minWidth: "220px",
                boxShadow: "0 0.5rem 1rem rgba(0,0,0,0.07)",
              }}
              onClick={() => setSelectedHorse(horse.id)}
            >
              <h3>{horse.name}</h3>
              <p>
                <strong>Breed:</strong> {horse.breed}<br />
                <strong>Age:</strong> {horse.age}<br />
                <strong>Gender:</strong> {horse.gender}<br />
                <strong>Speed:</strong> {horse.stats?.speed} | <strong>Stamina:</strong> {horse.stats?.stamina} | <strong>Agility:</strong> {horse.stats?.agility}<br />
                <strong>Coat:</strong> {horse.traits?.coatColor} | <strong>Markings:</strong> {horse.traits?.markings}
              </p>
              <button
                style={{
                  marginTop: "1rem",
                  background: isSelected ? "#007bff" : "#eee",
                  color: isSelected ? "#fff" : "#333",
                  border: "none",
                  borderRadius: "0.5rem",
                  padding: "0.5rem 1rem",
                  cursor: isSelected && !mutation.isPending ? "pointer" : "not-allowed",
                }}
                disabled={!isSelected || mutation.isPending}
                onClick={() => mutation.mutate({ userId, starterHorseId: horse.id })}
              >
                {mutation.isPending && isSelected ? "Selecting..." : "Select"}
              </button>
            </div>
          );
        })}
      </div>
      {mutation.error && <p style={{ color: "red" }}>{String(mutation.error)}</p>}
    </div>
  );
}