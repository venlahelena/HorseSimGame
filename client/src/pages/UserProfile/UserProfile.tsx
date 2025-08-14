import { useGameStore } from "../../store/useGameStore";
import "./UserProfile.css";

export default function UserProfile() {
  const user = useGameStore(state => state.user);
  const loading = useGameStore(state => state.loading);
  const error = useGameStore(state => state.error);

  if (loading) return <p>Loading profile...</p>;
  if (error) return <p className="error">{error}</p>;
  if (!user) return <p>No user profile found.</p>;

  return (
    <div className="user-profile">
      <h2>{user.username}'s Profile</h2>
      <p>Email: {user.email}</p>
      <p>Stable: {user.stable?.name}</p>
      <p>Valley Level: {user.valley?.infrastructureLevel}</p>
    </div>
  );
}