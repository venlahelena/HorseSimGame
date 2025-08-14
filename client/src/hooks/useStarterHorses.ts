import { useEffect } from "react";
import { API_BASE } from "../services/api";
import { useGameStore } from "../store/useGameStore";

export function useStarterHorses() {
  const horses = useGameStore(state => state.horses);
  const setHorses = useGameStore(state => state.setHorses);
  const setLoading = useGameStore(state => state.setLoading);
  const setError = useGameStore(state => state.setError);

  useEffect(() => {
    setLoading(true);
    fetch(`${API_BASE}/starterHorses`)
      .then(res => res.json())
      .then(data => {
        setHorses(data);
        setError(null);
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, [setHorses, setLoading, setError]);

  return { horses };
}