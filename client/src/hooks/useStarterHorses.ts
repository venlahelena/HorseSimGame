import { useEffect, useState } from "react";
import { API_BASE } from "../services/api";
import type { Horse } from "../services/api";

export function useStarterHorses() {
  const [horses, setHorses] = useState<Horse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(`${API_BASE}/starterHorses`)
      .then(res => res.json())
      .then(data => {
        setHorses(data);
        setError(null);
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return { horses, loading, error };
}