import { useValley } from "../../hooks/useValley";
import { useUpdateValley } from "../../hooks/mutations/useUpdateValley";

export default function ValleyView() {
  const { data: valley, isLoading, error } = useValley();
  const updateValley = useUpdateValley();

  if (isLoading) return <div>Loading valley data...</div>;
  if (error) return <div>Error loading valley data.</div>;
  if (!valley) return <div>No valley data found.</div>;

  const handleCleanValley = () => {
    updateValley.mutate({
      cleanliness: (valley.cleanliness ?? 0) + 1,
      infrastructureLevel: valley.infrastructureLevel,
      economyHealth: valley.economyHealth,
      unlockedAreas: valley.unlockedAreas,
    });
  };
  
  return (
    <div>
      <h1>Valley Restoration</h1>
      <ul>
        <li>Cleanliness: {valley.cleanliness}</li>
        <li>Infrastructure Level: {valley.infrastructureLevel}</li>
        <li>Economy Health: {valley.economyHealth}</li>
        <li>
          Unlocked Areas:{" "}
          {valley.unlockedAreas && valley.unlockedAreas.length > 0
            ? valley.unlockedAreas.join(", ")
            : "None"}
        </li>
      </ul>
      <button onClick={handleCleanValley} disabled={updateValley.isPending}>
        Clean Valley
      </button>
      {updateValley.isError && <div>Error updating valley!</div>}
    </div>
  );
}
