import { useQuery } from "@tanstack/react-query";
import { API_BASE } from "../services/api";
import { Horse } from "../models/Horse";

async function fetchHorses(): Promise<Horse[]> {
  const res = await fetch(`${API_BASE}/horses`);
  if (!res.ok) throw new Error("Failed to fetch horses");
  const result = await res.json();
  // If paginated, horses are in result.data
  const horses = Array.isArray(result) ? result : result.data;
  if (!Array.isArray(horses)) return [];
  return horses.map((horse: any) => ({
    ...horse,
    id: horse._id,
  }));
}

export function useHorseList() {
  return useQuery<Horse[], Error>({
    queryKey: ["horses"],
    queryFn: fetchHorses,
    select: data => data ?? [],
  });
}