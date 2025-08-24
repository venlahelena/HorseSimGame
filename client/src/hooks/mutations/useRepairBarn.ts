import { useMutation, useQueryClient } from "@tanstack/react-query";
import { repairBarn } from "../../services/valleyApi";

export function useRepairBarn() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: repairBarn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["valley"] });
      queryClient.invalidateQueries({ queryKey: ["userProfile"] });
    },
  });
}