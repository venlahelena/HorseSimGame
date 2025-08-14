import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGameStore } from "../../store/useGameStore";
import { API_BASE } from "../../services/api";

export default function StarterHorseSelection() {
  const [selectedHorse, setSelectedHorse] = useState<string | null>(null);
  const horses = useGameStore(state => state.horses);
  const addHorse = useGameStore(state => state.addHorse);
  const setUser = useGameStore(state => state.setUser);
  const navigate = useNavigate();

  const handleSelect = async () => {
    if (!selectedHorse) return;
    // POST to backend to select starter horse
    const res = await fetch(`${API_BASE}/starterHorses/select`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ horseId: selectedHorse }),
    });
    if (!res.ok) return alert("Failed to select starter horse");
    const data = await res.json();
    addHorse(data.horse);
    setUser(data.user);
    navigate("/stable");
  };

  return (
    <div>
      <h2>Select Your Starter Horse</h2>
      <ul>
        {horses.map(horse => (
          <li key={horse.id}>
            <label>
              <input
                type="radio"
                name="starterHorse"
                value={horse.id}
                checked={selectedHorse === horse.id}
                onChange={() => setSelectedHorse(horse.id)}
              />
              {horse.name} ({horse.breed})
            </label>
          </li>
        ))}
      </ul>
      <button onClick={handleSelect} disabled={!selectedHorse}>
        Confirm Selection
      </button>
    </div>
  );
}