import { useMutation, useQueryClient } from "@tanstack/react-query";
import { selectStarterHorseRequest } from "../../services/starterHorseApi";
import { useGameStore } from "../../store/useGameStore";

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