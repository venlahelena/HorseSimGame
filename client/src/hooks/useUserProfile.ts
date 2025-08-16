import { useQuery } from "@tanstack/react-query";
import { API_BASE } from "../services/api";

async function fetchUserProfile() {
  const token = localStorage.getItem("token");
  const res = await fetch(`${API_BASE}/user/profile`, {
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json"
    }
  });
  if (!res.ok) throw new Error("Failed to fetch user profile");
  return await res.json();
}

export function useUserProfile() {
  return useQuery({
    queryKey: ["userProfile"],
    queryFn: fetchUserProfile,
  });
}