import { useMutation, useQueryClient } from "@tanstack/react-query";
import { API_BASE } from "../../services/api";
import { useGameStore } from "../../store/useGameStore";

type UpdateUserArgs = {
  userId: string;
  updates: any; // Later to be replaced 'any' with a more specific type if possible
};

async function updateUserRequest(userId: string, updates: any) {
  const res = await fetch(`${API_BASE}/users/${userId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updates),
  });
  if (!res.ok) throw new Error("Profile update failed");
  return await res.json();
}

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