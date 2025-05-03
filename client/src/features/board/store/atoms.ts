import { openModalAtom } from "@/widgets/app-dialog/atoms";
import { atom } from "jotai";
import {
  CREATE_BOARD_DIALOG_TITLE,
  DELETE_BOARD_DIALOG_TITLE,
  EDIT_BOARD_DIALOG_TITLE,
} from "../constants";
import { isBoardColumnCreateFormActiveAtom } from "@/features/board-column/store";

export const isOpenBoardSelectAtom = atom<boolean>(false);
export const isOpenBoardDropdownMenuAtom = atom<boolean>(false);
export const removedFieldsAtom = atom<string[]>([]);
export const triggerCreateFormDialogAtom = atom(null, (_, set) => {
  set(isOpenBoardSelectAtom, false);
  set(isBoardColumnCreateFormActiveAtom, false);
  set(openModalAtom<"CREATE_BOARD">(), {
    title: CREATE_BOARD_DIALOG_TITLE,
    type: "CREATE_BOARD",
    data: {},
  });
});

export const triggerEditFormDialogAtom = atom(null, (_, set) => {
  set(isOpenBoardDropdownMenuAtom, false);
  set(isBoardColumnCreateFormActiveAtom, false);
  set(removedFieldsAtom, []);
  set(openModalAtom<"EDIT_BOARD">(), {
    title: EDIT_BOARD_DIALOG_TITLE,
    type: "EDIT_BOARD",
    data: {},
  });
});

export const triggerDeleteFormDialogAtom = atom(null, (_, set) => {
  set(isOpenBoardDropdownMenuAtom, false);
  set(isBoardColumnCreateFormActiveAtom, false);
  set(openModalAtom<"DELETE_BOARD">(), {
    title: DELETE_BOARD_DIALOG_TITLE,
    type: "DELETE_BOARD",
    data: {},
  });
});

export const boardIdAtom = atom<string | null>(null);
