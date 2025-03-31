import { atom } from "jotai";
import { BoardActionMode } from "../types";

export const isOpenDialogAtom = atom<boolean>(false);
export const isOpenBoardSelectAtom = atom<boolean>(false);
export const isOpenBoardDropdownMenuAtom = atom<boolean>(false);
export const boardFormModeAtom = atom<BoardActionMode>("CREATE");
export const removedFieldsAtom = atom<string[]>([]);
export const isBoardColumnCreateFormActiveAtom = atom<boolean>(false);
export const triggerCreateFormDialogAtom = atom(null, (_, set) => {
  set(isOpenBoardSelectAtom, false);
  set(isBoardColumnCreateFormActiveAtom, false);
  set(boardFormModeAtom, "CREATE");
  set(isOpenDialogAtom, true);
});

export const triggerEditFormDialogAtom = atom(null, (_, set) => {
  set(isOpenBoardDropdownMenuAtom, false);
  set(isBoardColumnCreateFormActiveAtom, false);
  set(boardFormModeAtom, "EDIT");
  set(removedFieldsAtom, []);
  set(isOpenDialogAtom, true);
});

export const triggerDeleteFormDialogAtom = atom(null, (_, set) => {
  set(isOpenBoardDropdownMenuAtom, false);
  set(isBoardColumnCreateFormActiveAtom, false);
  set(boardFormModeAtom, "DELETE");
  set(isOpenDialogAtom, true);
});

export const triggerCreateTaskFormDialogAtom = atom(null, (_, set) => {
  set(isOpenBoardDropdownMenuAtom, false);
  set(isBoardColumnCreateFormActiveAtom, false);
  set(boardFormModeAtom, "CREATE_TASK");
  set(isOpenDialogAtom, true);
});

export const boardIdAtom = atom<string | null>(null);
