// src/hooks/useUserQuests.ts
import { useQuery } from "@tanstack/react-query";
import { fetchUserQuests } from "../services/questApi";

export function useUserQuests() {
  const token = localStorage.getItem("token");
  return useQuery({
    queryKey: ["userQuests", token],
    queryFn: () => token ? fetchUserQuests(token) : [],
    enabled: !!token,
  });
}