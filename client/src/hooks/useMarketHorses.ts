import { useQuery } from "@tanstack/react-query";
import { fetchMarketHorses } from "../services/horseMarketApi";

export function useMarketHorses() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["marketHorses"],
    queryFn: fetchMarketHorses,
  });

  return { horses: data ?? [], isLoading, error };
}