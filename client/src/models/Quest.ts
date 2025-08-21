export type QuestObjective = {
  key: string;
  goal: number;
  progressType: string;
};

export type QuestReward = {
  currency: number;
  items: string[];
  unlock?: string;
};

export type UserQuest = {
  _id: string; // quest assignment id in user.quests
  quest: {
    _id: string;
    name: string;
    description: string;
    type: string;
    objectives: QuestObjective[];
    reward: QuestReward;
    prerequisites: string[];
  };
  progress: number;
  completed: boolean;
};