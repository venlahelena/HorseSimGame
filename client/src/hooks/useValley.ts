import { useQuery } from "@tanstack/react-query";
import { getValleyState } from "../services/valleyApi";

export function useValley() {
  return useQuery({
    queryKey: ["valley"],
    queryFn: getValleyState,
  });
}