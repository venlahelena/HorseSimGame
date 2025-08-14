import { useGameStore } from "../store/useGameStore";

export function useHorses(id: string) {
  const horses = useGameStore(state => state.horses);
  const horse = horses.find(horseItem => horseItem.id === id);
  return { horse };
}