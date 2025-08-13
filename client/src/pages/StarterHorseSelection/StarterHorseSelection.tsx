import { useStarterHorses } from "../../hooks/useStarterHorses";
import Card from "../../components/shared/Card/Card";
import Button from "../../components/shared/Button/Button";

export default function StarterHorseSelection() {
  const { horses, loading, error } = useStarterHorses();

  const handleChoose = async (horseId: string) => {
    await fetch("/api/starterHorses/choose", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ horseId }),
    });
    // Redirect or update UI after selection
  };

  if (loading) return <p>Loading starter horses...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="starter-horse-grid">
      {horses.map(horse => (
        <Card key={horse._id} horse={horse}>
          <Button onClick={() => handleChoose(horse._id)}>Choose</Button>
        </Card>
      ))}
    </div>
  );
}