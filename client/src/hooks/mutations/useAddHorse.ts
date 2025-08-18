import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Horse } from "../../models/Horse";
import { addHorseRequest } from "../../services/horseApi";


export function useAddHorse() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Horse) => addHorseRequest(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["horses"] });
    },
  });
}