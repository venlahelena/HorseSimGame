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

export async function repairBarn() {
  const token = localStorage.getItem("token");
  const res = await fetch("/api/valley/repair-barn", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    credentials: "include",
  });
  if (!res.ok) throw new Error("Failed to repair barn");
  return await res.json();
}

export async function buildTrainingRing() {
  const token = localStorage.getItem("token");
  const res = await fetch("/api/valley/build-training-ring", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    credentials: "include",
  });
  if (!res.ok) throw new Error("Failed to build training ring");
  return await res.json();
}