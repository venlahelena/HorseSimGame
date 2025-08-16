import { useQuery } from "@tanstack/react-query";
import { API_BASE } from "../services/api";
import { Horse } from "../models/Horse";

async function fetchStarterHorses(): Promise<Horse[]> {
  const res = await fetch(`${API_BASE}/starterHorses`);
  if (!res.ok) throw new Error("Failed to fetch starter horses");
  const horses = await res.json();
  // Map _id to id for frontend consistency
  return horses.map((horse: any) => ({
    ...horse,
    id: horse._id,
  }));
}

export function useStarterHorses() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["starterHorses"],
    queryFn: fetchStarterHorses,
  });
  return {
    horses: data ?? [],
    isLoading,
    error,
  };
}