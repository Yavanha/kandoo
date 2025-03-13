import { create } from "zustand";
import { Board } from "../types/Board";

// Define types for your state slice.
interface BoardState {
  activeBoard: Board | null;
}

// Define types for your actions.
interface BoardActions {
  setActiveBoard: (board: Board) => void;
}

// Create the store using combine, merging state and actions.
export const useBoardStore = create<BoardState & BoardActions>()((set) => ({
  activeBoard: null,
  setActiveBoard: (board: Board) => set({ activeBoard: board }),
}));
