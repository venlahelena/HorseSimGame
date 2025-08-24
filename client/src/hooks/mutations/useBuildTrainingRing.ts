import { useMutation, useQueryClient } from "@tanstack/react-query";
import { buildTrainingRing } from "../../services/valleyApi";

export function useBuildTrainingRing() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: buildTrainingRing,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["valley"] });
      queryClient.invalidateQueries({ queryKey: ["userProfile"] });
    },
  });
}