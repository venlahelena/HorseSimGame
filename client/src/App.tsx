import "./App.css";
import { Routes, Route } from "react-router-dom";
import StableView from "./pages/StableView/StableView";
import HorseDetail from "./pages/HorseDetail";
import TopNavigation from "./components/layout/TopNaviagtion/TopNavigation";
import MarketView from "./pages/MarketView/MarketView";
import StarterHorseSelection from "./pages/StarterHorseSelection/StarterHorseSelection";
import UserProfile from "./pages/UserProfile/UserProfile";
import AuthView from "./pages/Auth/AuthView/AuthView";
import PrivateRoute from "./components/auth/PrivateRoute";

function Placeholder({ name }: { name: string }) {
  return <div style={{ padding: "2rem", textAlign: "center" }}>{name} page coming soon!</div>;
}

function App() {
  return (
    <div>
      <TopNavigation />
      <main className="page-container">
        <Routes>
          <Route path="/login" element={<AuthView />} />
          <Route path="/register" element={<AuthView />} />
          <Route
            path="/stables"
            element={
              <PrivateRoute>
                <StableView />
              </PrivateRoute>
            }
          />
          <Route
            path="/horse/:id"
            element={
              <PrivateRoute>
                <HorseDetail />
              </PrivateRoute>
            }
          />
          <Route
            path="/market"
            element={
              <PrivateRoute>
                <MarketView />
              </PrivateRoute>
            }
          />
          <Route
            path="/starter-horse-selection"
            element={
              <PrivateRoute>
                <StarterHorseSelection />
              </PrivateRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <UserProfile />
              </PrivateRoute>
            }
          />
          {/* Placeholder routes */}
          <Route path="/horsemarket" element={<Placeholder name="Horse Market" />} />
          <Route path="/marketplace" element={<Placeholder name="Marketplace" />} />
          <Route path="/training" element={<Placeholder name="Training" />} />
          <Route path="/races" element={<Placeholder name="Races" />} />
          <Route path="/logout" element={<Placeholder name="Logout" />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;