import { useMutation, useQueryClient } from "@tanstack/react-query";
import { feedHorseRequest, groomHorseRequest, trainHorseRequest } from "../../services/horseApi";

export function useFeedHorse() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, feedType }: { id: string; feedType: string }) =>
      feedHorseRequest(id, feedType),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["horseEvent", variables.id] });
    },
  });
}

export function useGroomHorse() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => groomHorseRequest(id),
    onSuccess: (_data, id) => {
      queryClient.invalidateQueries({ queryKey: ["horseEvent", id] });
    },
  });
}

export function useTrainHorse() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, stat }: { id: string; stat: string }) =>
      trainHorseRequest(id, stat),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["horseEvent", variables.id] });
    },
  });
}