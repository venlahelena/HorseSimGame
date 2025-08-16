import { useQuery } from "@tanstack/react-query";
import { API_BASE } from "../services/api";

export function useHorse(id?: string) {
  return useQuery({
    queryKey: ["horse", id],
    queryFn: async () => {
      if (!id) return null; // Prevent fetch if id is missing
      const res = await fetch(`${API_BASE}/horses/${id}`);
      if (!res.ok) throw new Error("Horse not found");
      return await res.json();
    },
    enabled: !!id,
  });
}