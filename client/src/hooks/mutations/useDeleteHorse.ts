import { useMutation, useQueryClient } from "@tanstack/react-query";
import { API_BASE } from "../../services/api";

type DeleteHorseArgs = {
  horseId: string;
};

async function deleteHorseRequest({ horseId }: DeleteHorseArgs) {
  const res = await fetch(`${API_BASE}/horses/${horseId}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });
  if (!res.ok) throw new Error("Failed to delete horse");
  return await res.json();
}

export function useDeleteHorse() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: DeleteHorseArgs) => deleteHorseRequest(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["horses"] });
    },
  });
}