import { useGameStore } from "../store/useGameStore";
import { Horse } from "../models/Horse";

const API_BASE =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

export interface FetchHorsesResponse {
  page: number;
  limit: number;
  total: number;
  data: Horse[];
}

export async function fetchHorses(
  params: Record<string, any> = {}
): Promise<FetchHorsesResponse> {
  const query = new URLSearchParams(
    Object.entries(params).reduce<Record<string, string>>((acc, [key, val]) => {
      if (val !== undefined && val !== null) acc[key] = String(val);
      return acc;
    }, {})
  ).toString();

  const url = `${API_BASE}/horses?${query}`;

  const res = await fetch(url);

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(
      `Fetch error: ${res.status} ${res.statusText} - ${errorText}`
    );
  }

  const response: FetchHorsesResponse = await res.json();

  // Sync Zustand store with fetched horses
  const setHorses = useGameStore.getState().setHorses;
  setHorses(response.data);

  return response;
}

export { API_BASE };