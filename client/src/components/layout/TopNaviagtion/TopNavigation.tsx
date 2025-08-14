import { NavLink, useNavigate } from "react-router-dom";
import { useGameStore } from "../../../store/useGameStore";
import "./TopNavigation.css";

const TopNavigation = () => {
  const user = useGameStore(state => state.user);
  const reset = useGameStore(state => state.reset);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    reset();
    navigate("/login");
  };

  return (
    <nav className="top-nav">
      <div className="nav-container">
        <NavLink to="/" className="nav-link" end>
          Stable
        </NavLink>
        <span className="separator" />
        <NavLink to="/training" className="nav-link">
          Training
        </NavLink>
        <span className="separator" />
        <NavLink to="/races" className="nav-link">
          Races
        </NavLink>
        <span className="separator" />
        <NavLink to="/horsemarket" className="nav-link">
          Horse Market
        </NavLink>
        <span className="separator" />
        <NavLink to="/marketplace" className="nav-link">
          Marketplace
        </NavLink>
        <span className="separator" />
        {user ? (
          <>
            <NavLink to="/profile" className="nav-link">
              User Profile
            </NavLink>
            <span className="separator" />
            <button className="nav-link logout-btn" onClick={handleLogout}>
              Log out
            </button>
          </>
        ) : (
          <>
            <NavLink to="/login" className="nav-link">
              Login
            </NavLink>
            <span className="separator" />
            <NavLink to="/register" className="nav-link">
              Register
            </NavLink>
          </>
        )}
      </div>
    </nav>
  );
};

export default TopNavigation;