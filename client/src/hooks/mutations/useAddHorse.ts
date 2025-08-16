import { useMutation, useQueryClient } from "@tanstack/react-query";
import { API_BASE } from "../../services/api";

type AddHorseArgs = {
  name: string;
  breed: string;
  age: number;
  // Add other horse properties as needed
};

async function addHorseRequest(data: AddHorseArgs) {
  const res = await fetch(`${API_BASE}/horses`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to add horse");
  return await res.json();
}

export function useAddHorse() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: AddHorseArgs) => addHorseRequest(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["horses"] });
    },
  });
}