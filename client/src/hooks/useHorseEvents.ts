import { useQuery } from "@tanstack/react-query";
import { fetchHorseEvents } from "../services/horseApi";

export function useHorseEvents(id?: string) {
  return useQuery({
    queryKey: ["horseEvent", id],
    queryFn: () => id ? fetchHorseEvents(id) : [],
    enabled: !!id,
  });
}