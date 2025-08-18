import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateValleyState } from "../../services/valleyApi";

export function useUpdateValley() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateValleyState,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["valley"] });
    },
  });
}