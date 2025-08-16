import { useMutation, useQueryClient } from "@tanstack/react-query";
import { API_BASE } from "../../services/api";
import { useGameStore } from "../../store/useGameStore";

type RegisterData = {
  username: string;
  email: string;
  password: string;
};

async function registerRequest(username: string, email: string, password: string) {
  const res = await fetch(`${API_BASE}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, email, password }),
  });
  if (!res.ok) throw new Error("Registration failed");
  return await res.json();
}

export function useRegister() {
  const setUser = useGameStore(state => state.setUser);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: RegisterData) =>
      registerRequest(data.username, data.email, data.password),
    onSuccess: (data) => {
      localStorage.setItem("token", data.token);
      setUser(data.user);
      localStorage.setItem("user", JSON.stringify(data.user));
      queryClient.invalidateQueries({ queryKey: ["userProfile", data.user.id] });
    },
  });
}