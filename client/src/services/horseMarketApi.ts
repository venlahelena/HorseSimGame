import { API_BASE } from "../services/api";

export async function fetchMarketHorses() {
  const res = await fetch(`${API_BASE}/market/horses`);
  if (!res.ok) throw new Error("Failed to fetch market horses");
  return await res.json();
}