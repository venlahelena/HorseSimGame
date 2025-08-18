import { useQuery } from "@tanstack/react-query";
import { fetchHorse } from "../services/horseApi";

export function useHorse(id?: string) {
  return useQuery({
    queryKey: ["horse", id],
    queryFn: () => id ? fetchHorse(id) : null,
    enabled: !!id,
  });
}