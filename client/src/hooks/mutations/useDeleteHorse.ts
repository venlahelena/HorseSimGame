import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteHorseRequest } from "../../services/horseApi";
import { Horse } from "../../models/Horse";

export function useDeleteHorse() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Horse) => deleteHorseRequest(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["horses"] });
    },
  });
}