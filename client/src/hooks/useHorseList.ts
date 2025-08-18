import { useQuery } from "@tanstack/react-query";
import { useGameStore } from "../store/useGameStore";
import { API_BASE } from "../services/api";

export function useHorseList() {
  const userId = useGameStore(state => state.user?.id);
  return useQuery({
    queryKey: ["horses", userId],
    queryFn: async () => {
      if (!userId) return [];
      const res = await fetch(`${API_BASE}/horses?userId=${userId}`);
      if (!res.ok) throw new Error("Failed to fetch horses");
      return res.json();
    },
    enabled: !!userId,
  });
}