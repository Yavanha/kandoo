import { FC, PropsWithChildren } from "react";

import { Dialog as DialogRadix } from "radix-ui";
import classNames from "classnames";

type DialogProps = {
  isOpen: boolean;
  isDanger?: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
} & PropsWithChildren;

export const Dialog: FC<DialogProps> = ({
  isOpen,
  isDanger,
  onOpenChange,
  title,
  children,
}) => {
  return (
    <DialogRadix.Root open={isOpen} onOpenChange={onOpenChange}>
      <DialogRadix.Portal container={document.getElementById("root")}>
        <DialogRadix.Overlay className="fixed inset-0 bg-black opacity-40 data-[state=open]:animate-overlayShow" />
        <DialogRadix.Content className="fixed left-1/2 top-1/2   min-w-[21.4375rem] -translate-x-1/2 -translate-y-1/2 rounded-md bg-white p-6 shadow-[var(--shadow-6)] focus:outline-none data-[state=open]:animate-contentShow">
          <DialogRadix.Title
            className={classNames("mb-6 heading-l font-medium", {
              "text-destructive": isDanger,
            })}
          >
            {title}
          </DialogRadix.Title>
          {children}
        </DialogRadix.Content>
      </DialogRadix.Portal>
    </DialogRadix.Root>
  );
};
