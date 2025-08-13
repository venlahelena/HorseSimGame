import "./App.css";
import { Routes, Route } from "react-router-dom";
import StableView from "./pages/StableView/StableView";
import HorseDetail from "./pages/HorseDetail";
import TopNavigation from "./components/layout/TopNaviagtion/TopNavigation";
import MarketView from "./pages/MarketView/MarketView";
import StarterHorseSelection from "./pages/StarterHorseSelection/StarterHorseSelection";
import UserProfile from "./pages/UserProfile/UserProfile";

function App() {
  return (
    <div>
      <TopNavigation />
      <main className="page-container">
        <Routes>
          <Route path="/" element={<StableView />} />
          <Route path="/horse/:id" element={<HorseDetail />} />
          <Route path="/market" element={<MarketView />} />
          <Route path="/starter-horse-selection" element={<StarterHorseSelection />} />
          <Route path="/profile" element={<UserProfile />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;