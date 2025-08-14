import { useGameStore } from "../store/useGameStore";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000/api";

export function useAuth() {
  const user = useGameStore(state => state.user);
  const setUser = useGameStore(state => state.setUser);
  const reset = useGameStore(state => state.reset);

  const token = localStorage.getItem("token");

  const login = async (email: string, password: string) => {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) throw new Error("Login failed");
    const data = await res.json();
    localStorage.setItem("token", data.token);
    setUser(data.user);
    localStorage.setItem("user", JSON.stringify(data.user));
  };

  const register = async (username: string, email: string, password: string) => {
    const res = await fetch(`${API_BASE}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, password }),
    });

    if (!res.ok) throw new Error("Registration failed");
    const data = await res.json();
    localStorage.setItem("token", data.token);
    setUser(data.user);
    localStorage.setItem("user", JSON.stringify(data.user));
  };

  const fetchProfile = async () => {
    if (!token) throw new Error("No token");
    const res = await fetch(`${API_BASE}/user/profile`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) throw new Error("Failed to fetch profile");
    const profile = await res.json();
    setUser(profile);
    localStorage.setItem("user", JSON.stringify(profile));
    return profile;
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    reset();
  };

  return { token, user, login, register, logout, fetchProfile };
}