import { useQuery } from "@tanstack/react-query";
import { fetchStarterHorses } from "../services/starterHorseApi";

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