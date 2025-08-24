import { API_BASE } from "../services/api";

export type UpdateUserArgs = {
  userId: string;
  updates: any; // Later to be replaced 'any' with a more specific type if possible
};

export async function fetchUserProfile() {
  const token = localStorage.getItem("token");
  const res = await fetch(`${API_BASE}/users/profile`, {
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json"
    }
  });
  if (!res.ok) throw new Error("Failed to fetch user profile");
  return await res.json();
}

export async function updateUserRequest(userId: string, updates: any) {
  const res = await fetch(`${API_BASE}/users/${userId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updates),
  });
  if (!res.ok) throw new Error("Profile update failed");
  return await res.json();
}