import { useMutation, useQueryClient } from "@tanstack/react-query";
import { API_BASE } from "../../services/api";
import { useGameStore } from "../../store/useGameStore";

type SelectStarterHorseArgs = {
  userId: string;
  starterHorseId: string;
};

async function selectStarterHorseRequest({ userId, starterHorseId }: SelectStarterHorseArgs) {
  const res = await fetch(`${API_BASE}/starterHorses/choose`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify({ userId, starterHorseId }),
  });
  if (!res.ok) throw new Error("Failed to select starter horse");
  return await res.json();
}

export function useSelectStarterHorse(onSuccess: (data: any) => void) {
  const setUser = useGameStore(state => state.setUser);
  const addHorse = useGameStore(state => state.addHorse);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: selectStarterHorseRequest,
    onSuccess: (data) => {
      if (data.user) {
        setUser(data.user);
        localStorage.setItem("user", JSON.stringify(data.user));
      }
      if (data.horse) {
        addHorse(data.horse);
        queryClient.invalidateQueries({ queryKey: ["horses", data.user._id] });
      }
      onSuccess(data);
    },
  });
}