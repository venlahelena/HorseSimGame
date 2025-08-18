import { useQuery } from "@tanstack/react-query";
import { useGameStore } from "../store/useGameStore";
import { fetchHorseList } from "../services/horseApi";

export function useHorseList() {
  const userId = useGameStore(state => state.user?.id);
  return useQuery({
    queryKey: ["horses", userId],
    queryFn: () => userId ? fetchHorseList(userId) : [],
    enabled: !!userId,
  });
}