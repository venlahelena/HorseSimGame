import { useQuery } from "@tanstack/react-query";
import { API_BASE } from "../services/api";

export function useHorseEvents(id?: string) {
  return useQuery({
    queryKey: ["horseEvent", id],
    queryFn: async () => {
      if (!id) return [];
      const res = await fetch(`${API_BASE}/horses/${id}/event`);
      if (!res.ok) {
        throw new Error("Failed to fetch horse events");
      }
      return res.json();
    },
    enabled: !!id,
  });
}