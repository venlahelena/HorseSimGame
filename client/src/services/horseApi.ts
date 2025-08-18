import { useGameStore } from "../store/useGameStore";
import { Horse } from "../models/Horse";
import { API_BASE } from "./api";

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

export async function fetchHorseList(userId: string) {
  const res = await fetch(`${API_BASE}/horses?userId=${userId}`);
  if (!res.ok) throw new Error("Failed to fetch horses");
  const result = await res.json();
  return result.data ?? [];
}

export async function fetchHorseEvents(id: string) {
  const res = await fetch(`${API_BASE}/horses/${id}/event`);
  if (!res.ok) throw new Error("Failed to fetch horse events");
  return await res.json();
}

export async function fetchHorse(id: string) {
  const res = await fetch(`${API_BASE}/horses/${id}`);
  if (!res.ok) throw new Error("Horse not found");
  return await res.json();
}

export async function addHorseRequest(data: Horse) {
  const res = await fetch(`${API_BASE}/horses`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to add horse");
  return await res.json();
}

export async function feedHorseRequest(id: string, feedType: string): Promise<Horse> {
  const res = await fetch(`${API_BASE}/horses/${id}/feed`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ feedType }),
  });
  if (!res.ok) throw new Error("Failed to feed horse");
  return await res.json();
}

export async function groomHorseRequest(id: string): Promise<Horse> {
  const res = await fetch(`${API_BASE}/horses/${id}/groom`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });
  if (!res.ok) throw new Error("Failed to groom horse");
  return await res.json();
}

export async function trainHorseRequest(id: string, stat: string): Promise<Horse> {
  const res = await fetch(`${API_BASE}/horses/${id}/train`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ stat }),
  });
  if (!res.ok) throw new Error("Failed to train horse");
  return await res.json();
}

export async function deleteHorseRequest({ _id }: Horse) {
  const res = await fetch(`${API_BASE}/horses/${_id}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });
  if (!res.ok) throw new Error("Failed to delete horse");
  return await res.json();
}