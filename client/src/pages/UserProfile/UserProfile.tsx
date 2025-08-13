import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import Button from "../../components/shared/Button/Button";
import "./UserProfile.css";

export default function UserProfile() {
  const { user, fetchProfile, logout } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProfile().finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading profile...</p>;
  if (!user) return <p>No user data found.</p>;

  return (
    <div className="user-profile-container">
      <h2 className="profile-title">{user.username}</h2>
      <div className="profile-info">
        <div>Email: {user.email}</div>
        <div>Stable: {user.stable?.name ?? "Unnamed Stable"}</div>
        <div>Capacity: {user.stable?.capacity ?? 10}</div>
        <div>Valley Progress: {user.valley?.infrastructureLevel ?? 0}</div>
        {/* Add more profile fields as needed */}
      </div>
      <Button onClick={logout}>Logout</Button>
    </div>
  );
}