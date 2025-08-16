import { useQuery } from "@tanstack/react-query";
import { API_BASE } from "../services/api";

async function fetchMarketHorses() {
  const res = await fetch(`${API_BASE}/market/horses`);
  if (!res.ok) throw new Error("Failed to fetch market horses");
  return await res.json();
}

export function useMarketHorses() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["marketHorses"],
    queryFn: fetchMarketHorses,
  });

  return { horses: data ?? [], isLoading, error };
}