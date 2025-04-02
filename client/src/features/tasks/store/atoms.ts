import {
  isOpenBoardDropdownMenuAtom,
  isBoardColumnCreateFormActiveAtom,
  boardFormModeAtom,
  isOpenDialogAtom,
} from "@/features/board/store";
import { atom } from "jotai";
import { Task } from "../types";

export const triggerCreateTaskFormDialogAtom = atom(null, (_, set) => {
  set(isOpenBoardDropdownMenuAtom, false);
  set(isBoardColumnCreateFormActiveAtom, false);
  set(boardFormModeAtom, "CREATE_TASK");
  set(isOpenDialogAtom, true);
});
export const activeTaskAtom = atom<Task | null>(null);
export const triggerTaskDetailsFormDialogAtom = (activeTask: Task) =>
  atom(null, (_, set) => {
    set(activeTaskAtom, activeTask);
    set(isOpenBoardDropdownMenuAtom, false);
    set(isBoardColumnCreateFormActiveAtom, false);
    set(boardFormModeAtom, "TASK-DETAILS");
    set(isOpenDialogAtom, true);
  });
