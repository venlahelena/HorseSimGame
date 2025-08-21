export async function fetchUserQuests(token: string) {
  const res = await fetch("/api/quests", {
    headers: { Authorization: `Bearer ${token}` },
    credentials: "include",
  });
  if (!res.ok) throw new Error("Failed to fetch quests");
  return await res.json();
}

export async function assignQuest(token: string, questId: string) {
  const res = await fetch("/api/quests/assign", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    credentials: "include",
    body: JSON.stringify({ questId }),
  });
  if (!res.ok) throw new Error("Failed to assign quest");
  return await res.json();
}

export async function updateQuestProgress(token: string, questId: string, progress: number) {
  const res = await fetch("/api/quests/progress", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    credentials: "include",
    body: JSON.stringify({ questId, progress }),
  });
  if (!res.ok) throw new Error("Failed to update quest progress");
  return await res.json();
}