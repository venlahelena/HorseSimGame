import { create } from "zustand";
import { Horse } from "../models/Horse";

export type Stable = {
  name: string;
  capacity: number;
  banner: string;
  avatar: string;
};

export type Valley = {
  cleanliness: number;
  infrastructureLevel: number;
  economyHealth: number;
  unlockedAreas: string[];
};

export type Preferences = {
  theme: string;
  notifications: boolean;
};

export type User = {
  id: string;
  username: string;
  email: string;
  createdAt: string;
  starterHorseChosen: boolean;
  horses: Horse[];
  stable: Stable;
  valley: Valley;
  preferences: Preferences;
};

type GameState = {
  user: User | null;
  horses: Horse[];
  stable: Stable | null;
  valley: Valley | null;
  preferences: Preferences | null;
  loading: boolean;
  error: string | null;
  setUser: (user: User | null) => void;
  setHorses: (horses: Horse[]) => void;
  setStable: (stable: Stable | null) => void;
  setValley: (valley: Valley | null) => void;
  setPreferences: (prefs: Preferences | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  addHorse: (horse: Horse) => void;
  removeHorse: (id: string) => void;
  updateHorse: (horse: Horse) => void;
  reset: () => void;
};

export const useGameStore = create<GameState>((set, get) => ({
  user: null,
  horses: [],
  stable: null,
  valley: null,
  preferences: null,
  loading: false,
  error: null,
  setUser: (user) => set({ user }),
  setHorses: (horses) => set({ horses }),
  setStable: (stable) => set({ stable }),
  setValley: (valley) => set({ valley }),
  setPreferences: (prefs) => set({ preferences: prefs }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
  addHorse: (horse) => set({ horses: [...get().horses, horse] }),
  removeHorse: (id) =>
    set({ horses: get().horses.filter((horse) => horse._id !== id) }),
  updateHorse: (horse) =>
    set({
      horses: get().horses.map((horseItem) =>
        horseItem._id === horse._id ? horse : horseItem
      ),
    }),
  reset: () =>
    set({
      user: null,
      horses: [],
      stable: null,
      valley: null,
      preferences: null,
      loading: false,
      error: null,
    }),
}));
