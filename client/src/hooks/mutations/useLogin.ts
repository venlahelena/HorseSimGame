import { useMutation, useQueryClient } from "@tanstack/react-query";
import { API_BASE } from "../../services/api";
import { useGameStore } from "../../store/useGameStore";

type LoginData = {
  email: string;
  password: string;
};

async function loginRequest(email: string, password: string) {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) throw new Error("Login failed");
  return await res.json();
}

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