export async function getValleyState() {
  const token = localStorage.getItem("token");
  const res = await fetch("/api/valley", {
    credentials: "include",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) throw new Error("Failed to fetch valley state");
  return await res.json();
}

export async function updateValleyState(updates: object) {
  const token = localStorage.getItem("token");
  const res = await fetch("/api/valley", {
    method: "PUT",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(updates),
  });
  if (!res.ok) throw new Error("Failed to update valley state");
  return await res.json();
}