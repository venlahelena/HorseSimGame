import { useMutation, useQueryClient } from "@tanstack/react-query";
import { API_BASE } from "../../services/api";
import { Horse } from "../../models/Horse";

export function useFeedHorse() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, feedType }: { id: string; feedType: string }) => {
      const res = await fetch(`${API_BASE}/horses/${id}/feed`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ feedType }),
      });
      if (!res.ok) throw new Error("Failed to feed horse");
      return (await res.json()) as Horse;
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["horseEvent", variables.id] });
    },
  });
}

export function useGroomHorse() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`${API_BASE}/horses/${id}/groom`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      if (!res.ok) throw new Error("Failed to groom horse");
      return (await res.json()) as Horse;
    },
    onSuccess: (_data, id) => {
      queryClient.invalidateQueries({ queryKey: ["horseEvent", id] });
    },
  });
}

export function useTrainHorse() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, stat }: { id: string; stat: string }) => {
      const res = await fetch(`${API_BASE}/horses/${id}/train`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ stat }),
      });
      if (!res.ok) throw new Error("Failed to train horse");
      return (await res.json()) as Horse;
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["horseEvent", variables.id] });
    },
  });
}
