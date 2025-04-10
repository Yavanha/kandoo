import { atom } from "jotai";

export const boardColumnId = atom<string | null>(null);
export const isBoardColumnCreateFormActiveAtom = atom<boolean>(false);
