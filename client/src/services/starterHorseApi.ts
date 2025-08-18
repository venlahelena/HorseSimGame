import { API_BASE } from "../services/api";
import { Horse } from "../models/Horse";

export type SelectStarterHorseArgs = {
  userId: string;
  starterHorseId: string;
};

export async function fetchStarterHorses(): Promise<Horse[]> {
  const res = await fetch(`${API_BASE}/starterHorses`);
  if (!res.ok) throw new Error("Failed to fetch starter horses");
  const horses = await res.json();
  // Map _id to id for frontend consistency
  return horses.map((horse: any) => ({
    ...horse,
    id: horse._id,
  }));
}

export async function selectStarterHorseRequest({ userId, starterHorseId }: SelectStarterHorseArgs) {
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
