import { FC, PropsWithChildren } from "react";

import classNames from "classnames";

import {
  Dialog as DialogRadix,
  Portal,
  Overlay,
  Content,
  Title,
} from "@radix-ui/react-dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
type DialogProps = {
  isOpen: boolean;
  isDanger?: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
} & PropsWithChildren;

export const Dialog: FC<DialogProps> = ({
  isOpen,
  isDanger,
  onOpenChange,
  children,
  title,
}) => {
  const titleElement = (
    <Title
      className={classNames("mb-6 heading-l font-medium", {
        "text-destructive": isDanger,
      })}
    >
      {title}
    </Title>
  );
  return (
    <DialogRadix open={isOpen} onOpenChange={onOpenChange}>
      <Portal container={document.getElementById("root")}>
        <Overlay className="fixed inset-0 bg-black opacity-40 data-[state=open]:animate-overlayShow" />
        <Content className="fixed left-1/2 top-1/2   min-w-[21.4375rem] -translate-x-1/2 -translate-y-1/2 rounded-md bg-white p-6 shadow-[var(--shadow-6)] focus:outline-none data-[state=open]:animate-contentShow">
          {title ? (
            titleElement
          ) : (
            <VisuallyHidden>{titleElement}</VisuallyHidden>
          )}
          {children}
        </Content>
      </Portal>
    </DialogRadix>
  );
};
