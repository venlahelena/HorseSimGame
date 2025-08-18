import { API_BASE } from "./api";

export type LoginData = {
  email: string;
  password: string;
};

export type RegisterData = {
  username: string;
  email: string;
  password: string;
};

export async function loginRequest(email: string, password: string) {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) throw new Error("Login failed");
  return await res.json();
}

export async function registerRequest(username: string, email: string, password: string) {
  const res = await fetch(`${API_BASE}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, email, password }),
  });
  if (!res.ok) throw new Error("Registration failed");
  return await res.json();
}
