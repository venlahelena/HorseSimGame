import { useState } from "react";
import SubNavigation from "../../../components/layout/SubNavigation";
import LoginView from "../Login/LoginView";
import RegisterView from "../Register/RegisterView";

export default function AuthView() {
  const [showLogin, setShowLogin] = useState(true);

  return (
    <div>
      <SubNavigation>
        <button
          className={showLogin ? "active" : ""}
          onClick={() => setShowLogin(true)}
        >
          Login
        </button>
        <button
          className={!showLogin ? "active" : ""}
          onClick={() => setShowLogin(false)}
        >
          Register
        </button>
      </SubNavigation>
      <div className="auth-main">
        {showLogin ? <LoginView /> : <RegisterView />}
      </div>
    </div>
  );
}