import { useState } from "react";
import { useUserProfile } from "../../hooks/useUserProfile";
import { useUpdateUser } from "../../hooks/mutations/useUpdateUser";

export default function UserProfile() {
  const { data: user, isLoading, error } = useUserProfile();
  const [username, setUsername] = useState(user?.username ?? "");
  const [email, setEmail] = useState(user?.email ?? "");
  const updateUser = useUpdateUser();

  if (isLoading) return <p>Loading profile...</p>;
  if (error) return <p className="error">{String(error)}</p>;
  if (!user) return <p>No user profile found.</p>;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateUser.mutate({ userId: user.id, updates: { username, email } });
  };

  return (
    <div className="user-profile">
      <h2>Edit Profile</h2>
      <div>
        <strong>Current Username:</strong> {user.username}
      </div>
      <div>
        <strong>Current Email:</strong> {user.email}
      </div>
      <div>
        <strong>Currency:</strong> {user.currency}
      </div>
      <form onSubmit={handleSubmit}>
        <label>
          New Username:
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <label>
          New Email:
          <input value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <button type="submit" disabled={updateUser.isPending}>
          {updateUser.isPending ? "Saving..." : "Save Changes"}
        </button>
        {updateUser.error && (
          <p className="error">{String(updateUser.error)}</p>
        )}
      </form>
      <p>Stable: {user.stable?.name}</p>
      <p>Valley Level: {user.valley?.infrastructureLevel}</p>
    </div>
  );
}
