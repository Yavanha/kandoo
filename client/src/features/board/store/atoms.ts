import { atom } from "jotai";
import { Board, BoardActionMode } from "../types";

export const activeBoardAtom = atom<Board | null>(null);
export const isOpenBoardDialogAtom = atom<boolean>(false);
export const isOpenBoardSelectAtom = atom<boolean>(false);
export const isOpenBoardDropdownMenuAtom = atom<boolean>(false);
export const boardFormModeAtom = atom<BoardActionMode>("CREATE");

export const triggerCreateFormDialogAtom = atom(null, (_, set) => {
  set(isOpenBoardSelectAtom, false);
  set(boardFormModeAtom, "CREATE");
  set(isOpenBoardDialogAtom, true);
});

export const triggerEditFormDialogAtom = atom(null, (_, set) => {
  set(isOpenBoardDropdownMenuAtom, false);
  set(boardFormModeAtom, "EDIT");
  set(isOpenBoardDialogAtom, true);
});

export const triggerDeleteFormDialogAtom = atom(null, (_, set) => {
  set(isOpenBoardDropdownMenuAtom, false);
  set(boardFormModeAtom, "DELETE");
  set(isOpenBoardDialogAtom, true);
});
