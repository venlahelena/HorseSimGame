import { useValley } from "../../hooks/useValley";
import { useRepairBarn } from "../../hooks/mutations/useRepairBarn";
import { useBuildTrainingRing } from "../../hooks/mutations/useBuildTrainingRing";
import { useUpdateValley } from "../../hooks/mutations/useUpdateValley";

const areaLabels: Record<string, string> = {
  barn: "Barn",
  training_ring: "Training Ring",
  north_paddock: "North Paddock",
};

export default function ValleyView() {
  const { data: valley, isLoading, error } = useValley();
  const updateValley = useUpdateValley();
  const repairBarnMutation = useRepairBarn();
  const buildTrainingRingMutation = useBuildTrainingRing();

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
            ? valley.unlockedAreas
                .map(
                  (area: string) => areaLabels[area] || area.replace(/_/g, " ")
                )
                .join(", ")
            : "None"}
        </li>
      </ul>
      <button onClick={handleCleanValley} disabled={updateValley.isPending}>
        Clean Valley
      </button>
      {updateValley.isError && <div>Error updating valley!</div>}
      <button
        onClick={() => repairBarnMutation.mutate()}
        disabled={repairBarnMutation.isPending || valley?.barnRepaired}
      >
        Repair Barn (200 coins)
      </button>
      <button
        onClick={() => buildTrainingRingMutation.mutate()}
        disabled={
          buildTrainingRingMutation.isPending || valley?.trainingRingBuilt
        }
      >
        Build Training Ring (300 coins)
      </button>
      {buildTrainingRingMutation.isError && (
        <div>Error building training ring.</div>
      )}
      {valley?.trainingRingBuilt && (
        <div>The training ring has been built!</div>
      )}
    </div>
  );
}
