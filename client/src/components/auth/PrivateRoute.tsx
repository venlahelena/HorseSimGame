import { Navigate } from "react-router-dom";
import { useGameStore } from "../../store/useGameStore";
import { ReactNode } from "react";

export default function PrivateRoute({ children }: { children: ReactNode }) {
  const user = useGameStore(state => state.user);
  const token = localStorage.getItem("token");

  return user && token ? children : <Navigate to="/login" replace />;
}