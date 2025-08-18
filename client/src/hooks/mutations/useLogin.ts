import { useMutation, useQueryClient } from "@tanstack/react-query";
import { LoginData, loginRequest } from "../../services/authApi";
import { useGameStore } from "../../store/useGameStore";

export function useLogin() {
  const setUser = useGameStore(state => state.setUser);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: LoginData) => loginRequest(data.email, data.password),
    onSuccess: (data) => {
      localStorage.setItem("token", data.token);
      setUser(data.user);
      localStorage.setItem("user", JSON.stringify(data.user));
      queryClient.invalidateQueries({ queryKey: ["userProfile", data.user.id] });
    },
  });
}