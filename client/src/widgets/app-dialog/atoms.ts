import { atom } from "jotai";
import { ModalContentMapProps, Payload } from "./types";

export const modalIsOpenAtom = atom(false);
export const modalTitleAtom = atom<string>();
export const modalContentTypeAtom = atom<keyof ModalContentMapProps | null>(
  null
);
export const modalContentPropsAtom = atom<
  ModalContentMapProps[keyof ModalContentMapProps] | null
>(null);

export const openModalAtom = <T extends keyof ModalContentMapProps>() =>
  atom(null, (_, set, { type, data, title }: Payload<T>) => {
    set(modalIsOpenAtom, true);
    set(modalTitleAtom, title);
    set(modalContentTypeAtom, type);
    set(modalContentPropsAtom, data);
  });

export const closeModalAtom = atom(null, (_, set) => {
  set(modalIsOpenAtom, false);
  set(modalTitleAtom, undefined);
  set(modalContentTypeAtom, null);
  set(modalContentPropsAtom, null);
});
