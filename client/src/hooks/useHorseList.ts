import { useGameStore } from "../store/useGameStore";

export function useHorseList() {
  const horses = useGameStore(state => state.horses);
  return { horses };
}