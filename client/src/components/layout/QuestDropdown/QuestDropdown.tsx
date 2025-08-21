import { useUserQuests } from "../../../hooks/useUserQuests";
import { UserQuest } from "../../../models/Quest";
import "./QuestDropdown.css";

export default function QuestDropdown() {
  const { data: quests, isLoading, error } = useUserQuests();

  if (isLoading) return <div className="quest-dropdown">Loading quests...</div>;
  if (error) return <div className="quest-dropdown">Error loading quests.</div>;
  if (!quests || quests.length === 0)
    return (
      <div className="quest-dropdown">
        <h2>Active Quests</h2>
        <p>No active quests.</p>
      </div>
    );

  return (
    <div className="quest-dropdown">
      <h2>Active Quests</h2>
      {quests.map((userQuest: UserQuest) => (
        <div key={userQuest._id}>
          <h3>{userQuest.quest.name}</h3>
          <p>{userQuest.quest.description}</p>
          <div>
            <label>
              Progress:&nbsp;
              <progress
                value={userQuest.progress}
                max={userQuest.quest.objectives[0]?.goal ?? 1}
              />
              &nbsp;{userQuest.progress} /{" "}
              {userQuest.quest.objectives[0]?.goal ?? 1}
            </label>
          </div>
          {userQuest.completed && (
            <div style={{ color: "green", marginTop: "0.5rem" }}>
              <strong>Quest Completed!</strong> ✅
            </div>
          )}
        </div>
      ))}
    </div>
  );
}