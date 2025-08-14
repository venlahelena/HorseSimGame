import { useEffect } from "react";
import { useGameStore } from "../store/useGameStore";
import { API_BASE } from "../services/api";

export function useMarketHorses() {
  const horses = useGameStore(state => state.horses);
  const setHorses = useGameStore(state => state.setHorses);
  
  useEffect(() => {
    fetch(`${API_BASE}/market/horses`)
      .then(res => res.json())
      .then(data => setHorses(data));
  }, [setHorses]);
  return { horses };
}