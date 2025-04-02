import {
  isOpenBoardDropdownMenuAtom,
  isBoardColumnCreateFormActiveAtom,
  boardFormModeAtom,
  isOpenDialogAtom,
} from "@/features/board/store";
import { atom } from "jotai";

export const triggerCreateTaskFormDialogAtom = atom(null, (_, set) => {
  set(isOpenBoardDropdownMenuAtom, false);
  set(isBoardColumnCreateFormActiveAtom, false);
  set(boardFormModeAtom, "CREATE_TASK");
  set(isOpenDialogAtom, true);
});
