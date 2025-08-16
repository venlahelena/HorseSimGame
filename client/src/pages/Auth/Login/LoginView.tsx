import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";
import Button from "../../../components/shared/Button/Button";

export default function LoginView() {
  const { login, loginStatus, loginError } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(
      { email, password },
      {
        onSuccess: () => navigate("/profile"),
      }
    );
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
      {loginError && <div className="error">{String(loginError)}</div>}
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <Button type="submit" disabled={loginStatus === "pending"}>
          {loginStatus === "pending" ? "Logging in..." : "Login"}
        </Button>
      </form>
    </div>
  );
}