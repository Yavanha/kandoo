import { Dialog } from "@/core/components";
import { useAtomValue, useSetAtom } from "jotai";
import {
  modalIsOpenAtom,
  modalContentTypeAtom,
  closeModalAtom,
  modalContentPropsAtom,
  modalTitleAtom,
} from "./atoms";
import React from "react";
import { renderModalContent } from "./components";
import { ModalContentMapProps, ModalContentProps } from "./types";

const ModalContentComponent = <T extends keyof ModalContentMapProps>({
  type,
  data,
}: ModalContentProps<T>) => {
  if (!type || !renderModalContent[type]) {
    throw new Error(
      `Modal content type "${type}" is not defined or does not exist.`
    );
  }
  const Component = renderModalContent[type];
  return React.createElement(Component, data);
};

export const AppDialog = () => {
  const isOpen = useAtomValue(modalIsOpenAtom);
  const type = useAtomValue(modalContentTypeAtom);
  const data = useAtomValue(modalContentPropsAtom);
  const title = useAtomValue(modalTitleAtom);
  const close = useSetAtom(closeModalAtom);

  const handleClose = () => close();

  return (
    <Dialog
      isOpen={isOpen}
      onOpenChange={handleClose}
      isDanger={type?.startsWith("DELETE")}
      title={title}
    >
      {type && data && <ModalContentComponent type={type} data={data} />}
    </Dialog>
  );
};
