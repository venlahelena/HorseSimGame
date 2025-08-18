import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUserRequest, UpdateUserArgs } from "../../services/userApi";
import { useGameStore } from "../../store/useGameStore";

export function useUpdateUser() {
  const setUser = useGameStore(state => state.setUser);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: UpdateUserArgs) => updateUserRequest(data.userId, data.updates),
    onSuccess: (data) => {
      setUser(data.user);
      localStorage.setItem("user", JSON.stringify(data.user));
      queryClient.invalidateQueries({ queryKey: ["userProfile", data.user.id] });
    },
  });
}