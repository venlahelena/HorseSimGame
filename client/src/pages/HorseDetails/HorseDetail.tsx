import { useParams, useNavigate } from "react-router-dom";
import { useHorse } from "../../hooks/useHorse";
import { useHorseEvents } from "../../hooks/useHorseEvents";
import {
  useFeedHorse,
  useGroomHorse,
  useTrainHorse,
} from "../../hooks/mutations/useCareHorse";
import { useState } from "react";

export default function HorseDetail() {
  const { id } = useParams();
  const { data: horse, isLoading, error, refetch } = useHorse(id);
  const {
    data: events = [],
    isLoading: eventsLoading,
    error: eventsError,
  } = useHorseEvents(id);
  const navigate = useNavigate();

  const [feedType, setFeedType] = useState("hay");
  const [trainStat, setTrainStat] = useState("speed");

  const feedMutation = useFeedHorse();
  const groomMutation = useGroomHorse();
  const trainMutation = useTrainHorse();

  const handleFeed = async () => {
    if (!id) return;
    await feedMutation.mutateAsync({ id, feedType });
    refetch();
  };

  const handleGroom = async () => {
    if (!id) return;
    await groomMutation.mutateAsync(id);
    refetch();
  };

  const handleTrain = async () => {
    if (!id) return;
    await trainMutation.mutateAsync({ id, stat: trainStat });
    refetch();
  };

  if (!id) return <div>No horse selected.</div>;
  if (isLoading) return <div>Loading horse...</div>;
  if (error) return <div>Error: {String(error)}</div>;
  if (!horse) return <div>Horse not found.</div>;

  return (
    <div className="horse-detail">
      <button
        onClick={() => navigate("/stables")}
        style={{ marginBottom: "1rem" }}
      >
        ← Back to Stable
      </button>
      <h2>{horse.name}</h2>
      <p>Breed: {horse.breed}</p>
      <p>Age: {horse.age}</p>
      <p>Gender: {horse.gender}</p>
      <p>
        Stats: Speed {horse.stats?.speed}, Stamina {horse.stats?.stamina},
        Agility {horse.stats?.agility}
      </p>
      <p>
        Traits: Coat {horse.traits?.coatColor}, Markings{" "}
        {horse.traits?.markings}
      </p>
      <p>Health: {horse.health}</p>
      <p>Mood: {horse.mood}</p>
      <p>
        Training: Speed {horse.training?.speed}, Stamina{" "}
        {horse.training?.stamina}, Agility {horse.training?.agility}
      </p>

      <div style={{ marginTop: "2rem" }}>
        <h3>Care Actions</h3>
        <div>
          <label>
            Feed Type:
            <select
              value={feedType}
              onChange={(e) => setFeedType(e.target.value)}
            >
              <option value="hay">Hay</option>
              <option value="grain">Grain</option>
            </select>
          </label>
          <button onClick={handleFeed} disabled={feedMutation.isPending}>
            {feedMutation.isPending ? "Feeding..." : "Feed"}
          </button>
        </div>
        <div>
          <button onClick={handleGroom} disabled={groomMutation.isPending}>
            {groomMutation.isPending ? "Grooming..." : "Groom"}
          </button>
        </div>
      </div>

      <div style={{ marginTop: "2rem" }}>
        <h3>Training</h3>
        <label>
          Stat:
          <select
            value={trainStat}
            onChange={(e) => setTrainStat(e.target.value)}
          >
            <option value="speed">Speed</option>
            <option value="stamina">Stamina</option>
            <option value="agility">Agility</option>
          </select>
        </label>
        <button onClick={handleTrain} disabled={trainMutation.isPending}>
          {trainMutation.isPending ? "Training..." : "Train"}
        </button>
      </div>

      {(feedMutation.error || groomMutation.error || trainMutation.error) && (
        <p style={{ color: "red" }}>
          {feedMutation.error?.message ||
            groomMutation.error?.message ||
            trainMutation.error?.message}
        </p>
      )}
      <div style={{ marginTop: "2rem" }}>
        <h3>Activity Log</h3>
        {eventsLoading && <p>Loading events...</p>}
        {eventsError && <p style={{ color: "red" }}>Error loading events</p>}
        <ul>
          {events.map((event: any) => (
            <li key={event._id}>
              [{new Date(event.timestamp).toLocaleString()}]{" "}
              {event.detail || event.type}
            </li>
          ))}
          {events.length === 0 && !eventsLoading && (
            <li>No recent activities.</li>
          )}
        </ul>
      </div>
    </div>
  );
}
